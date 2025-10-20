// src/features/map/components/ReviewItem.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Review } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ReviewItemProps {
  review: Review;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

export default function ReviewItem({ review }: ReviewItemProps) {
  const fallback = review.username.charAt(0).toUpperCase();

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.username}`} alt={review.username} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">

              <p className="font-semibold">{review.username}</p>

              <StarRating rating={review.rating} />
            </div>
            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}