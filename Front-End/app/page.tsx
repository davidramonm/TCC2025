"use client"

import { useState } from "react"
import LoginPage from "@/components/views/LoginPage"
import RegisterPage from "@/components/views/RegisterPage"
import RecoveryPage from "@/components/views/RecoveryPage"
import MapPage from "@/components/views/MapPage"

export default function MapaAcessivel() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "recovery" | "map">("login")

  if (currentView === "login") {
    return <LoginPage onNavigate={setCurrentView} />
  }

  if (currentView === "register") {
    return <RegisterPage onNavigate={setCurrentView} />
  }

  if (currentView === "recovery") {
    return <RecoveryPage onNavigate={setCurrentView} />
  }

  if (currentView === "map") {
    return <MapPage onNavigate={setCurrentView} />
  }

  return null
}
