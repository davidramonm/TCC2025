// src/features/map/components/ReviewItem.tsx

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Review } from "@/types";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const MAX_LENGTH = 100;
  const isLongComment = review.comment.length > MAX_LENGTH;

  const commentPreview = isLongComment
    ? `${review.comment.substring(0, MAX_LENGTH)}...`
    : review.comment;

  const fallback = review.username.charAt(0).toUpperCase();

  return (
    <Card className="mb-4 cursor-pointer transition-all duration-300" onClick={toggleExpansion}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.username}`} alt={review.username} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{review.username}</p>
              <StarRating rating={review.rating} />
            </div>
            
            <p className="mt-2 text-sm text-gray-600 break-words">
              {isExpanded ? review.comment : commentPreview}
            </p>
            
            {isExpanded && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Acessibilidades informadas:</p>
                <div className="flex flex-wrap gap-1">
                  {review.necessities && review.necessities.length > 0 ? (
                    review.necessities.map((necessity) => (
                      <Badge key={necessity.necessityId} variant="secondary">
                        {necessity.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Nenhuma acessibilidade informada.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}