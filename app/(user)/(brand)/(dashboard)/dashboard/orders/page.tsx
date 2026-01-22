"use client";

import { PageHeader } from "@/components/PageHeader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { Loader2, ClipboardList, LayoutDashboard } from "lucide-react";
import { orderService } from "@/lib/orders";
import { Order } from "@/types";
import api from "@/lib/api";
import { OrderCard } from "@/app/(user)/(client)/_components/OrderCard";

const BrandOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandOrders = async () => {
      try {
        // We call the new brand-specific endpoint
        const res = await api.get("/orders/brand/all");

        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch brand orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandOrders();
  }, []);

  const newOrders = orders.filter((o) =>
    o.items.some(
      (item: any) => item.status === "PENDING" || item.status === "PROCESSING",
    ),
  );

  // 2. In Transit: The brand has items specifically marked as SHIPPED
  const shippingOrders = orders.filter((o) =>
    o.items.some((item: any) => item.status === "SHIPPED"),
  );

  // 3. Completed: All of the brand's items in this order are DELIVERED
  const completedOrders = orders.filter((o) =>
    o.items.every((item: any) => item.status === "DELIVERED"),
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Sales Manager"
        description="Manage and fulfill your customer orders"
      />

      <Tabs defaultValue="new" className="mt-2">
        <ScrollArea className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new" className="relative">
              New Orders
              {newOrders.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">
                  {newOrders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="shipping">In Transit</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </ScrollArea>

        <div className="mt-2">
          <TabsContent value="new" className="space-y-4">
            {newOrders.length > 0 ? (
              newOrders.map((order) => (
                <OrderCard key={order.id} order={order} isBrandView={true} />
              ))
            ) : (
              <EmptyBrandState message="No new orders to fulfill" />
            )}
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            {shippingOrders.map((order) => (
              <OrderCard key={order.id} order={order} isBrandView={true} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.map((order) => (
              <OrderCard key={order.id} order={order} isBrandView={true} />
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

const EmptyBrandState = ({ message }: { message: string }) => (
  <div className="text-center py-20 bg-muted/10 rounded-2xl border-2 border-dashed">
    <ClipboardList className="mx-auto size-12 text-muted-foreground/30" />
    <p className="mt-4 text-muted-foreground font-medium">{message}</p>
  </div>
);

export default BrandOrdersPage;
