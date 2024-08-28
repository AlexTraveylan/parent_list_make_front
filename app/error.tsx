"use client"

import { navItems } from "@/lib/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="text-center flex flex-col gap-3">
      <div>{"Une erreur s'est produite !"}</div>
      <a href={navItems["Home"].href}>{"Retour à l'accueil"}</a>
    </div>
  )
}
