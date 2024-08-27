"use client"

import Completion from "@/components/myaccount/information-ok"
import UserInfoForm from "@/components/myaccount/user-info-form"
import { Skeleton } from "@/components/ui/skeleton"
import { userInformationService } from "@/lib/user-information/service"
import { useQuery } from "@tanstack/react-query"

export function UserInfoSubPage() {
  const query = useQuery({
    queryKey: ["userInfo"],
    queryFn: userInformationService.getUserInfo,
  })

  if (query.isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[50px]" />
        <Skeleton className="h-[100px]" />
      </div>
    )
  }

  if (query.isError) {
    return <div>Erreur</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>Mes informations personnelles</h2>
      {query.data ? (
        <Completion phrase="Informations complétés avec succès" />
      ) : (
        <UserInfoForm />
      )}
    </div>
  )
}
