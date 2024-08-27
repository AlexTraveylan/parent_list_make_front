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
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Complétez d'abord votre profil</CardTitle>
            <CardDescription>
              Pour accéder à l'application, vous devez compléter votre profil
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
