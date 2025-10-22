// src/features/map/components/LocationDetailCard.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Establishment, Location } from "@/types";
import { Star, X } from "lucide-react";
import { getLocationTypeName } from "@/lib/constants";
import ReviewList from "./ReviewList";
import { create } from "domain";
import { useState } from "react";
import { set } from "zod";

interface LocationDetailCardProps {
  establishment: Establishment;
  isUserReview: boolean; // Flag para saber se o usuário logado já avaliou
  createNew: boolean;
  onClose: () => void;
  onAddReview: (establishment: Establishment, name?: string) => void;
  onEditReview: (establishment: Establishment) => void;
}



export default function LocationDetailCard({
  establishment,
  isUserReview,
  createNew,
  onClose,
  onAddReview,
  onEditReview,
}: LocationDetailCardProps) {

  const totalNecessities = establishment.topNecessities?.length ?? 0;
  const visibleNecessities = (establishment.topNecessities ?? []).slice(0, 4)
  const remainingCount = Math.max(0, totalNecessities - visibleNecessities.length);
  const [name, setName] = useState(establishment.name);

  return (
    <div className="absolute top-0 right-0 z-[1000] h-full w-full max-w-md bg-white shadow-lg flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            {createNew ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  className="mb-2 text-2xl font-bold leading-none outline-none border-b border-gray-300"
                  placeholder="Nome do Estabelecimento"
                />
              </>
            ) : (
              <>
              <CardTitle>{establishment.name}</CardTitle>
              </>
            )
            }
            <CardDescription>{establishment.address}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center pt-2">
          <Star className="mr-1 h-5 w-5 text-yellow-400 fill-yellow-400" />
          {/* <span className="font-bold">{establishment.rating.toFixed(1)}</span> */}
          <span className="font-bold">{establishment.rating}</span>
          <span className="ml-2 text-sm text-gray-500">({establishment.reviewList?.length ?? 0} avaliações)</span>
        </div>
      </CardHeader>

      <Separator />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">Tipos de Acessibilidade</h3>
          <div className="flex flex-wrap gap-2">
            {visibleNecessities.map((type) => (
              <Badge key={type} variant="secondary">{getLocationTypeName(type)}</Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="outline">+{remainingCount}</Badge>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="mb-4 font-semibold">Avaliações dos Usuários</h3>
          <ReviewList reviews={establishment.reviewList ?? []} />
        </div>
      </div>

      <Separator />

      <CardFooter className="p-6 bg-gray-50">
        {isUserReview ? (
          <Button className="w-full" onClick={() => onEditReview(establishment)}>
            Editar minha avaliação
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onAddReview(establishment, name)}>
            Adicionar uma avaliação
          </Button>
        )}
      </CardFooter>
    </div>
  );
}