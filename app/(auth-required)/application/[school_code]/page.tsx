"use client"

import ParentListForm from "@/components/parents-list/create-parents-list-form"
import ParentsListsCard from "@/components/parents-list/parents-lists-card"
import { Skeleton } from "@/components/ui/skeleton"
import { authService } from "@/lib/authentification/service"
import { parentListService } from "@/lib/parents-list/service"
import { schoolService } from "@/lib/school/service"
import { useQuery } from "@tanstack/react-query"
import { CircleMinus, CirclePlus } from "lucide-react"
import { useState } from "react"

export default function SchoolListPage({
  params,
}: {
  params: { school_code: string }
}) {
  const [isCreatingFormOpen, setIsCreatingFormOpen] = useState(false)

  const query = useQuery({
    queryKey: ["userMeDetails"],
    queryFn: authService.getUserMeDetails,
    retry: 0,
  })

  const parentsListsQuery = useQuery({
    queryKey: ["userParentLists"],
    queryFn: () => parentListService.parentsListsBySchoolId(params.school_code),
    retry: 0,
  })

  const schoolQuery = useQuery({
    queryKey: ["school", params.school_code],
    queryFn: () => schoolService.getSchoolBySchoolCode(params.school_code),
    retry: 0,
  })

  if (query.isLoading || parentsListsQuery.isLoading || schoolQuery.isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[50px]" />
        <Skeleton className="h-[100px]" />
      </div>
    )
  }

  if (
    query.isError ||
    !query.data ||
    parentsListsQuery.isError ||
    !parentsListsQuery.data ||
    schoolQuery.isError ||
    !schoolQuery.data
  ) {
    return null
  }

  if (!query.data.school_ids.includes(schoolQuery.data.id)) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-col justify-center gap-1">
        <h1 className="text-4xl font-semibold text-center">
          {"Listes de parents de l'école "}
          {schoolQuery.data.school_name}
        </h1>
        <h2 className="text-sm text-muted-foreground text-center">
          {schoolQuery.data.country} - {schoolQuery.data.city} -{" "}
          {schoolQuery.data.zip_code}
        </h2>
        <h2 className="text-sm text-muted-foreground text-center">
          {schoolQuery.data.adress}
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {parentsListsQuery.data.map((parentList) => {
          return (
            <ParentsListsCard key={parentList.id} parentList={parentList} />
          )
        })}
      </div>
      <button
        className="flex justify-center gap-2 cursor-pointer"
        aria-label="Bouton pour ajouter une liste"
        onClick={() => setIsCreatingFormOpen(!isCreatingFormOpen)}
      >
        {isCreatingFormOpen ? <CircleMinus /> : <CirclePlus />}
        <span className="text-sm text-muted-foreground">
          {isCreatingFormOpen ? "Fermer" : "Ajouter une liste"}
        </span>
      </button>
      {isCreatingFormOpen && (
        <ParentListForm
          school_code={params.school_code}
          setIsCreatingFormOpen={setIsCreatingFormOpen}
        />
      )}
    </div>
  )
}
