// components/AddToCartModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useAuth } from "@/store/useAuth";
import { createCartItemId, useCart } from "@/store/useCart";
import api from "@/lib/api";
import { toast } from "sonner";
import { IconShoppingCartPlus } from "@tabler/icons-react";

interface AddToCartModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function AddToCartModal({
  product,
  isOpen,
  onClose,
}: AddToCartModalProps) {
  const { user } = useAuth();
  const addItem = useCart((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleConfirmAdd = async () => {
    // Validation
    if (product.sizes?.length && !selectedSize) {
      return toast.error("Please select a size");
    }
    if (product.availableColors?.length && !selectedColor) {
      return toast.error("Please select a color");
    }

    const compositeId = createCartItemId(
      product.id,
      selectedSize,
      selectedColor,
    );

    addItem({
      id: compositeId,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      image: product.thumbnail,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    });

    if (user) {
      try {
        await api.post("/cart", {
          productId: product.id,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        });
      } catch (e) {
        console.error("DB Sync failed");
      }
    }

    toast.success("Added to cart");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select Options</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.availableColors && product.availableColors.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <div className="flex flex-wrap gap-3">
                {product.availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`size-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.colorCode }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleConfirmAdd} className="w-full gap-2">
            <IconShoppingCartPlus size={18} />
            Confirm Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
