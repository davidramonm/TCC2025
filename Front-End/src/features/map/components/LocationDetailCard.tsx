// src/features/map/components/LocationDetailCard.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Location } from "@/types";
import { Star, X } from "lucide-react";
import { getLocationTypeName } from "@/lib/constants";
import ReviewList from "./ReviewList";

interface LocationDetailCardProps {
  location: Location;
  isUserReview: boolean; // Flag para saber se o usuário logado já avaliou
  onClose: () => void;
  onAddReview: (locationId: number) => void;
  onEditReview: (locationId: number) => void;
}

export default function LocationDetailCard({
  location,
  isUserReview,
  onClose,
  onAddReview,
  onEditReview,
}: LocationDetailCardProps) {
  return (
    <div className="absolute top-0 right-0 z-[1000] h-full w-full max-w-md bg-white shadow-lg flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{location.name}</CardTitle>
            <CardDescription>{location.address}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center pt-2">
          <Star className="mr-1 h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold">{location.rating.toFixed(1)}</span>
          <span className="ml-2 text-sm text-gray-500">({location.reviews?.length ?? 0} avaliações)</span>
        </div>
      </CardHeader>

      <Separator />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">Tipos de Acessibilidade</h3>
          <div className="flex flex-wrap gap-2">
            {location.typeValues.map((type) => (
              <Badge key={type} variant="secondary">{getLocationTypeName(type)}</Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="mb-4 font-semibold">Avaliações dos Usuários</h3>
          <ReviewList reviews={location.reviews ?? []} />
        </div>
      </div>

      <Separator />

      <CardFooter className="p-6 bg-gray-50">
        {isUserReview ? (
          <Button className="w-full" onClick={() => onEditReview(location.id)}>
            Editar minha avaliação
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onAddReview(location.id)}>
            Adicionar uma avaliação
          </Button>
        )}
      </CardFooter>
    </div>
  );
}