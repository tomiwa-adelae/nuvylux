"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { PageHeader } from "@/components/PageHeader";
import { IconHeartOff, IconLoader2 } from "@tabler/icons-react";
import { Product } from "@/types";
import { ProductCard } from "@/app/(root)/_components/ProductCard";

interface SavedItem {
  id: string;
  product: Product;
}

const SavedPage = () => {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedItems = async () => {
    try {
      const response = await api.get("/saved");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <IconLoader2 className="animate-spin text-primary" size={32} />
        <p className="text-muted-foreground animate-pulse">
          Loading wishlist...
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        back
        title="Saved Items"
        description={`${items.length} products you loved`}
      />

      {items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-muted p-6 rounded-full">
            <IconHeartOff size={48} className="text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground max-w-xs">
              Save items you like to keep track of them and buy them later.
            </p>
          </div>
          <a href="/shop" className="text-primary font-medium hover:underline">
            Go to Shop
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-2">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              product={{ ...item.product, isSaved: true }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
