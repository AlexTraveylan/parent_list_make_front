"use client"

import SchoolForm from "@/components/myaccount/join-school-form"
import { CreateSchoolForm } from "@/components/myaccount/school-form"
import { schoolService } from "@/lib/school/service"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"
import { Completion, Incompletion } from "./completion-incompletion"
import { SchoolsCard } from "./schools-card"

export function SchoolsSubPage() {
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const [isCreatingFormOpen, setIsCreatingFormOpen] = useState(false)

  const query = useQuery({
    queryKey: ["userSchools"],
    queryFn: schoolService.getUserSchools,
    retry: 0,
  })

  if (query.isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[50px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[50px]" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{"Étape 2/3 - Mes écoles"}</h2>
      <Separator />
      {query.data && query.data.length > 0 ? (
        <>
          <Completion phrase={"Tu as rejoins au moins une école !"} />
          <h2>{"Liste des écoles que tu as rejointes"}</h2>
          <div className="flex flex-wrap gap-4">
            {query.data.map((school) => (
              <SchoolsCard key={school.id} school={school} />
            ))}
          </div>
        </>
      ) : (
        <Incompletion phrase={"Aucune école rejointe"} />
      )}
      <Card>
        <CardHeader>
          <CardTitle>
            {query.data && query.data.length > 0
              ? "Rejoint une autre école (facultatif)"
              : "Rejoint une école"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 justify-center flex-wrap">
          {!isCreatingFormOpen && (
            <Button onClick={() => setIsJoinFormOpen(!isJoinFormOpen)}>
              {isJoinFormOpen ? "Fermer" : "Rejoint une école déjà existante"}
            </Button>
          )}
          {!isJoinFormOpen && (
            <Button onClick={() => setIsCreatingFormOpen(!isCreatingFormOpen)}>
              {isCreatingFormOpen ? "Fermer" : "Enregistre une nouvelle école"}
            </Button>
          )}
        </CardContent>
        <CardFooter>
          {isJoinFormOpen && (
            <SchoolForm setIsJoinFormOpen={setIsJoinFormOpen} />
          )}
        </CardFooter>
      </Card>
      {isCreatingFormOpen && (
        <CreateSchoolForm setIsCreatingFormOpen={setIsCreatingFormOpen} />
      )}
    </div>
  )
}
