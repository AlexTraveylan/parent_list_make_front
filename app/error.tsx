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
      <a
        className="border-solid border-2 rounded-md p-2"
        href={navItems["Home"].href}
      >
        {"Retour à l'accueil"}
      </a>
    </div>
  )
}
