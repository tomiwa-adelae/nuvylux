"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  IconClock,
  IconMapPin,
  IconRotate,
  IconTrash,
  IconEdit,
  IconBolt,
  IconCalendarEvent,
  IconShieldCheck,
} from "@tabler/icons-react";

import { PageHeader } from "@/components/PageHeader";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { serviceService } from "@/lib/services";
import { Service } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatMoneyInput } from "@/lib/utils";
import { ProductGallery } from "@/components/ProductGallery"; // Reusable for services

import { CurrencyIcon } from "@/components/CurrencyIcon";

const ServiceDetailsPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<Service | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchService = async () => {
      try {
        const data = await serviceService.getMyServicesDetails(slug as string);
        setService(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load service");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading)
    return <div className="p-10 text-center">Loading Service...</div>;
  if (!service)
    return <div className="p-10 text-center">Service not found.</div>;

  const remainingCount = (service.images?.length || 0) - 3;

  return (
    <div className="space-y-6">
      {/* {openModal && (
        <DeleteServiceModal
          closeModal={() => setOpenModal(false)}
          open={openModal}
          id={service.id}
          name={service.name}
        />
      )} */}

      <PageHeader
        back
        description="Review and manage your professional service offering"
        title="Service Details"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left Column: Visuals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative group overflow-hidden rounded-xl border">
            <Image
              src={service.thumbnail}
              alt={service.name}
              width={800}
              height={800}
              className="aspect-auto size-full object-cover rounded-md"
            />
            <Badge
              className="absolute top-4 left-4"
              variant={service.status === "ACTIVE" ? "default" : "secondary"}
            >
              {service.status}
            </Badge>
          </div>

          {/* Mini Gallery */}
          <div className="grid grid-cols-3 gap-2">
            {service.images?.slice(0, 3).map((img, index) => {
              const isLastVisible = index === 2 && remainingCount > 0;
              return (
                <div
                  key={index}
                  className="relative cursor-pointer aspect-square rounded-lg overflow-hidden border hover:ring-2 ring-primary transition-all"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <Image
                    src={img}
                    alt="Gallery"
                    width={1000}
                    height={1000}
                    className="aspect-auto size-full object-cover rounded-md border p-1"
                  />
                  {isLastVisible && (
                    <div className="absolute inset-0 bg-black/60 rounded-md flex flex-col items-center justify-center text-white font-medium text-sm">
                      <span>+{remainingCount}</span>
                      <span>View more</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Service Logistics & Info */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border-none shadow-sm">
            <CardContent className="space-y-4">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 text-primary border-primary/20"
                >
                  {service.type}
                </Badge>
                <h1 className="font-semibold text-2xl md:text-3xl">
                  {service.name}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {service.shortDescription}
                </p>
              </div>

              <div className="flex items-baseline">
                <span className="text-primary font-semibold text-lg md:text-xl">
                  {service.currency === "NGN" ? (
                    <CurrencyIcon currency="NGN" />
                  ) : (
                    service.currency
                  )}{" "}
                  {formatMoneyInput(service.price)}
                </span>
                {service.pricingType === "HOURLY" && (
                  <span className="text-muted-foreground font-medium text-base">
                    / hour
                  </span>
                )}
              </div>

              {/* Service Stats Grid */}
              <div
                className={cn(
                  "grid grid-cols-2 grid-cols-3 gap-4 py-4 border-y",
                  service.duration && "sm:grid-cols-4",
                )}
              >
                {service.duration && (
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1">
                      <IconClock size={14} /> Duration
                    </p>
                    <p className="text-sm font-semibold">
                      {service.duration || "N/A"} mins
                    </p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1">
                    <IconRotate size={14} /> Revisions
                  </p>
                  <p className="text-sm font-semibold">{service.revisions}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1">
                    <IconMapPin size={14} /> Mode
                  </p>
                  <p className="text-sm font-semibold capitalize">
                    {service.deliveryMode.toLowerCase()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1">
                    <IconBolt size={14} /> Timeline
                  </p>
                  <p className="text-sm font-semibold">
                    {service.deliveryTimeline || "Immediate"}
                  </p>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  About this Service
                </h4>
                <div className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                  <RenderDescription json={service.description} />
                </div>
              </div>

              {/* Cancellation Policy */}
              {service.cancellationPolicy && (
                <div className="flex items-start gap-3 p-3 rounded-lg border bg-orange-50/20 border-orange-100">
                  <IconShieldCheck
                    className="text-orange-500 shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-xs font-bold text-orange-700 uppercase">
                      Cancellation Policy
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {service.cancellationPolicy}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 gap-2" asChild>
                  <Link href={`/dashboard/services/${service.slug}/edit`}>
                    <IconEdit /> Edit Service
                  </Link>
                </Button>
                <Button
                  className="flex-1 gap-2"
                  variant="destructive"
                  onClick={() => setOpenModal(true)}
                >
                  <IconTrash /> Delete Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reusing ProductGallery component for the full-screen view */}
      {isGalleryOpen && (
        <ProductGallery
          open={isGalleryOpen}
          closeModal={() => setIsGalleryOpen(false)}
          images={service.images}
          thumbnail={service.thumbnail}
        />
      )}
    </div>
  );
};

export default ServiceDetailsPage;
