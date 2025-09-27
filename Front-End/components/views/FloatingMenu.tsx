// Front-End/components/views/FloatingMenu.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, List, X, Menu, Navigation } from 'lucide-react';

interface FloatingMenuProps {
  onAddClick: () => void;
  onFilterAndListClick: () => void; // Prop renomeada
  onMyLocationClick: () => void;
}

export default function FloatingMenu({ onAddClick, onFilterAndListClick, onMyLocationClick }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-6 right-6 z-40">
      <div className="flex flex-col items-end gap-4">
        {isOpen && (
          <div className="flex flex-col items-end gap-3 animate-in fade-in-0 slide-in-from-bottom-5 duration-300">
            <div className="flex items-center gap-3">
              <span className="bg-background text-foreground text-sm rounded-md px-3 py-2 shadow-lg">Minha Localização</span>
              <Button onClick={() => { onMyLocationClick(); setIsOpen(false); }} size="icon" className="w-14 h-14 rounded-full shadow-lg">
                <Navigation className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-background text-foreground text-sm rounded-md px-3 py-2 shadow-lg">Filtrar & Listar</span>
              <Button onClick={() => { onFilterAndListClick(); setIsOpen(false); }} size="icon" className="w-14 h-14 rounded-full shadow-lg">
                <List className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-background text-foreground text-sm rounded-md px-3 py-2 shadow-lg">Adicionar Local</span>
              <Button onClick={() => { onAddClick(); setIsOpen(false); }} size="icon" className="w-14 h-14 rounded-full shadow-lg">
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-xl hover:scale-105 transition-transform"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </Button>
      </div>
    </div>
  );
}