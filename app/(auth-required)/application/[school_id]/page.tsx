"use client"

import ParentsListsCard from "@/components/parents-list/parents-lists-card"
import { Skeleton } from "@/components/ui/skeleton"
import { authService } from "@/lib/authentification/service"
import { parentListService } from "@/lib/parents-list/service"
import { useQuery } from "@tanstack/react-query"

export default function SchoolListPage({
  params,
}: {
  params: { school_id: string }
}) {
  const query = useQuery({
    queryKey: ["userMeDetails"],
    queryFn: authService.getUserMeDetails,
  })

  const parenstListsQuery = useQuery({
    queryKey: ["userParentLists"],
    queryFn: () =>
      parentListService.parentsListsBySchoolId(parseInt(params.school_id)),
  })

  if (query.isLoading || parenstListsQuery.isLoading) {
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
    parenstListsQuery.isError ||
    !parenstListsQuery.data
  ) {
    return null
  }

  if (!query.data.school_ids.includes(parseInt(params.school_id))) {
    return null
  }

  return (
    <div>
      <h1>School List {params.school_id}</h1>
      {parenstListsQuery.data.map((parentList) => {
        return <ParentsListsCard key={parentList.id} parentList={parentList} />
      })}
    </div>
  )
}
