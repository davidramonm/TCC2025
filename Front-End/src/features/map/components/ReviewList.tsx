// src/features/map/components/ReviewList.tsx

import { Review } from "@/types";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  /** Lista de avaliações a serem renderizadas */
  reviews: Review[];
}

/**
 * @component ReviewList
 * @description Wrapper para a lista de avaliações.
 * Lida com o estado vazio (nenhuma avaliação) ou itera renderizando o componente ReviewItem.
 */
export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-center text-sm text-gray-500">Ainda não há avaliações para este local.</p>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review.reviewId} review={review} />
      ))}
    </div>
  );
}