"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { authService } from "@/lib/authentification/service"
import { navItems } from "@/lib/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function ApplicationPage() {
  const query = useQuery({
    queryKey: ["userMeDetails"],
    queryFn: authService.getUserMeDetails,
  })

  if (query.isLoading) {
    return (
      <div>
        <Skeleton className="h-[50px]" />
        <Skeleton className="h-[100px]" />
      </div>
    )
  }

  if (query.isError || !query.data || query.data.school_ids.length === 0) {
    return (
      <div className="flex items-center justify-center my-5">
        <Card className="min-w-sm">
          <CardHeader>
            <CardTitle>Complétez d'abord votre profil</CardTitle>
            <CardDescription>
              Complétez les informations manquantes de votre profil pour accéder
              aux listes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={navItems["MyAccount"].href}>Aller à mon compte</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h1>Application</h1>
      <p>Application Page</p>
    </div>
  )
}
