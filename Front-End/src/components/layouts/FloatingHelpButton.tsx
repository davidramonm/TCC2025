"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface FloatingHelpButtonProps {
  onClick: () => void;
}

export default function FloatingHelpButton({ onClick }: FloatingHelpButtonProps) {
  return (
    <div className="absolute bottom-6 left-6 z-40">
      <Button
        onClick={onClick}
        size="icon"
        className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-xl hover:scale-105 transition-transform"
        aria-label="Ajuda"
      >
        <HelpCircle className="w-8 h-8" />
      </Button>
    </div>
  );
}