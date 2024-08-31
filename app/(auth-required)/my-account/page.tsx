"use client"

import { EmailSubPage } from "@/components/myaccount/email-subpage"
import { SchoolsSubPage } from "@/components/myaccount/schools-subpage"
import { UserInfoSubPage } from "@/components/myaccount/user-info-subpage"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { navItems } from "@/lib/navigation"
import { useRouter } from "next/navigation"

export default function MyAccountPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-semibold text-center">Mon compte</h1>
      <UserInfoSubPage />
      <EmailSubPage />
      <SchoolsSubPage />
      <div className="flex flex-col gap-4">
        <h2>{"Étape 3/3 - C'est parti !"}</h2>
        <Separator />
        <p>
          {
            "Clique directement sur une école ou appuie sur le bouton ci-dessous : "
          }
        </p>
        <Button onClick={() => router.push(navItems["Application"].href)}>
          {"Voir mes listes"}
        </Button>
      </div>
    </div>
  )
}
