"use client"

import { useState } from "react"
import LoginPage from "@/components/views/LoginPage"
import RegisterPage from "@/components/views/RegisterPage"
import RecoveryPage from "@/components/views/RecoveryPage"
import MapPage from "@/components/views/MapPage"
import UserProfilePage from "@/components/views/UserProfilePage"

export default function MapaAcessivel() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "recovery" | "map" | "profile">("login");
  const [userName, setUserName] = useState("Usuário"); // Armazena o nome do usuário
  const [userNeeds, setUserNeeds] = useState<string[]>([]);

  const handleNavigate = (view: "login" | "register" | "recovery" | "map" | "profile") => {
    setCurrentView(view);
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    handleNavigate("map");
  }

  const handleRegister = (name: string, needs: string[]) => {
    setUserName(name);
    setUserNeeds(needs);
    handleNavigate("map");
  }

  const handleUpdateNeeds = (newNeeds: string[]) => {
    setUserNeeds(newNeeds);
  };

  const handleUpdateUser = (newName: string) => {
    setUserName(newName);
  };


  if (currentView === "login") {
    return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
  }

  if (currentView === "register") {
    return <RegisterPage onNavigate={handleNavigate} onRegister={handleRegister} />
  }

  if (currentView === "recovery") {
    return <RecoveryPage onNavigate={handleNavigate} />
  }

  if (currentView === "map") {
    return <MapPage onNavigate={handleNavigate} userName={userName.split(' ')[0]} /> // Passa apenas o primeiro nome para o mapa
  }

  if (currentView === "profile") {
    return (
      <>
        <MapPage onNavigate={handleNavigate} userName={userName.split(' ')[0]} />
        <UserProfilePage
          onClose={() => setCurrentView("map")}
          userName={userName} // Passa o nome completo para o perfil
          userNeeds={userNeeds}
          onUpdateNeeds={handleUpdateNeeds}
          onUpdateUser={handleUpdateUser}
        />
      </>
    );
  }

  return null
}