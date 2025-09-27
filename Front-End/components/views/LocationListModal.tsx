// Front-End/components/views/LocationListModal.tsx
"use client";

import { LocationList } from "./LocationList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

interface LocationListModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  locations: any[];
  totalLocations: number;
  onLocationClick: (location: any) => void;
  selectedLocationId?: number | null;
}

export default function LocationListModal({
  isOpen,
  onOpenChange,
  locations,
  totalLocations,
  onLocationClick,
  selectedLocationId,
}: LocationListModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Locais Encontrados</DialogTitle>
          <DialogDescription>
            Exibindo {locations.length} de {totalLocations} locais. Clique em um item para vê-lo no mapa.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-4">
          <LocationList
            locations={locations}
            totalLocations={totalLocations}
            onLocationClick={(location) => {
              onLocationClick(location);
              onOpenChange(false); // Fecha o modal ao clicar em um local
            }}
            selectedLocationId={selectedLocationId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}