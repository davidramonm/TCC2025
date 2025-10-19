// src/features/map/components/ReviewList.tsx

import { Review } from "@/types";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-center text-sm text-gray-500">Ainda não há avaliações para este local.</p>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}