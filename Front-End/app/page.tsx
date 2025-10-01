// Front-End/app/page.tsx
"use client"

import { useState } from "react";
import MapPage from "@/components/views/MapPage";

export default function MapaAcessivel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Convidado");
  const [userNeeds, setUserNeeds] = useState<string[]>([]);

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleRegister = (name: string, needs: string[]) => {
    setUserName(name);
    setUserNeeds(needs);
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setUserName("Convidado");
    setUserNeeds([]);
    setIsLoggedIn(false);
  };

  return (
    <MapPage
      isLoggedIn={isLoggedIn}
      userName={userName}
      userNeeds={userNeeds}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onLogout={handleLogout}
      onUpdateUser={setUserName}
      onUpdateNeeds={setUserNeeds}
    />
  );
}