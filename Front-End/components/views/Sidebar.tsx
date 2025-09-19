// Front-End/components/views/Sidebar.tsx
"use client";

import { AddLocationForm } from "./AddLocationForm";
import { LocationList } from "./LocationList";

interface SidebarProps {
  isOpen: boolean;
  locations: any[]; // Defina o tipo correto para suas localizações
  onSaveLocation: (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => void;
  onLocationClick: (location: any) => void;
  clickedPosition: { lat: number; lng: number } | null;
}

export function Sidebar({
  isOpen,
  locations,
  onSaveLocation,
  onLocationClick,
  clickedPosition,
}: SidebarProps) {
  return (
    <div
      className={`w-96 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } lg:w-96 `}
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <AddLocationForm
          onSaveLocation={onSaveLocation}
          clickedPosition={clickedPosition}
        />
        <LocationList
          locations={locations}
          onLocationClick={onLocationClick}
        />
      </div>
    </div>
  );
}