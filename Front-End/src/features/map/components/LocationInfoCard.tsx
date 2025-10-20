// src/features/map/components/LocationInfoCard.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import { Star } from "lucide-react";
import { getLocationTypeName } from "@/lib/constants";

interface LocationInfoCardProps {
  location: Location;
  onEditReview: (locationId: number) => void;
  onClose: () => void;
}

export default function LocationInfoCard({ location, onEditReview, onClose }: LocationInfoCardProps) {
  return (
    <Card className="absolute bottom-4 left-4 right-4 z-[1000] w-auto max-w-md shadow-lg sm:left-auto sm:right-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{location.name}</CardTitle>
            <CardDescription>{location.address}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>X</Button>
        </div>
      </CardHeader>
      <CardContent>
        {location.description && <p className="mb-4 text-sm text-gray-600">{location.description}</p>}
        <div className="mb-2 flex items-center">
          <Star className="mr-1 h-5 w-5 text-yellow-400" />
          <span className="font-semibold">{location.rating.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {location.typeValues.map((type) => (
            <Badge key={type}>{getLocationTypeName(type)}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onEditReview(location.id)}>
          Editar minha avaliação
        </Button>
      </CardFooter>
    </Card>
  );
}