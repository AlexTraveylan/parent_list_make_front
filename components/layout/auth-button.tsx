"use client"

import { Button } from "@/components/ui/button"
import { useUserMeStore } from "@/lib/authentification/store"
import { authNavItems, navItems } from "@/lib/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const AuthButton = () => {
  const { userMe, cleanUserMe } = useUserMeStore()
  const router = useRouter()

  const handleLogout = async () => {
    localStorage.removeItem("auth_token")
    cleanUserMe()
    router.push(navItems["Home"].href)
  }

  if (userMe !== null) {
    return <Button onClick={handleLogout}>{"Déconnexion"}</Button>
  }

  return (
    <Link href={authNavItems["login"].href} passHref>
      <Button variant={"default"}>{"Connexion"}</Button>
    </Link>
  )
}
