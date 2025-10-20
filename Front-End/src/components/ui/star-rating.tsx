// src/components/ui/star-rating.tsx
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
  size?: number;
  className?: string;
}

/**
 * @description Componente reutilizável para exibir e, opcionalmente, interagir com uma avaliação de estrelas.
 */
export function StarRating({
  rating,
  interactive = false,
  onRatingChange,
  size = 5,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRatingChange?.(star)}
          disabled={!interactive}
          className={cn({ "cursor-pointer": interactive, "cursor-default": !interactive })}
        >
          <Star
            className={cn(
              `w-${size} h-${size}`,
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}