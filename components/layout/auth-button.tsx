"use client"

import { Button } from "@/components/ui/button"
import { useUserMeStore } from "@/lib/authentification/store"
import { authNavItems, navItems } from "@/lib/navigation"
import Link from "next/link"

export const AuthButton = () => {
  const { userMe, cleanUserMe } = useUserMeStore()

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    cleanUserMe()
  }

  if (userMe !== null) {
    return (
      <Button onClick={handleLogout} asChild>
        <Link href={navItems["Home"].href}>{"Déconnexion"}</Link>
      </Button>
    )
  }

  return (
    <Link href={authNavItems["login"].href} passHref>
      <Button variant={"default"}>{"Connexion"}</Button>
    </Link>
  )
}
