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
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import Completion from "./information-ok"

export function SchoolsSubPage() {
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const [isCreatingFormOpen, setIsCreatingFormOpen] = useState(false)

  const query = useQuery({
    queryKey: ["userSchools"],
    queryFn: schoolService.getUserSchools,
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
      <h2>Mes écoles</h2>
      {query.data && query.data.length > 0 ? (
        <>
          <Completion phrase={"Tu as rejoins au moins une école !"} />
          <h2>Liste des écoles que tu as rejointes</h2>
          <div className="flex flex-wrap gap-4">
            {query.data.map((school) => (
              <Card key={school.id} className="max-w-sm">
                <CardHeader>
                  <CardTitle>{school.school_name}</CardTitle>
                  <CardDescription>
                    {school.country} - {school.zip_code} - {school.city}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{school.adress}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>Rejoint une école pour continuer</>
      )}
      <h2>
        {query.data && query.data.length > 0
          ? "Rejoins une autre école (facultatif)"
          : "Rejoint une école"}
      </h2>
      <div className="flex gap-4 justify-center flex-wrap">
        {!isCreatingFormOpen && (
          <Button onClick={() => setIsJoinFormOpen(!isJoinFormOpen)}>
            {isJoinFormOpen ? "Fermer" : "Rejoins une école déjà existante"}
          </Button>
        )}
        {!isJoinFormOpen && (
          <Button onClick={() => setIsCreatingFormOpen(!isCreatingFormOpen)}>
            {isCreatingFormOpen ? "Fermer" : "Enregistre une nouvelle école"}
          </Button>
        )}
      </div>
      {isJoinFormOpen && <SchoolForm setIsJoinFormOpen={setIsJoinFormOpen} />}
      {isCreatingFormOpen && (
        <CreateSchoolForm setIsCreatingFormOpen={setIsCreatingFormOpen} />
      )}
    </div>
  )
}
