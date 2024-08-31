"use client"

import {
  Completion,
  Incompletion,
} from "@/components/myaccount/completion-incompletion"
import UserInfoForm from "@/components/myaccount/user-info-form"
import { Skeleton } from "@/components/ui/skeleton"
import { userInformationService } from "@/lib/user-information/service"
import { useQuery } from "@tanstack/react-query"
import { Separator } from "../ui/separator"

export function UserInfoSubPage() {
  const query = useQuery({
    queryKey: ["userInfo"],
    queryFn: userInformationService.getUserInfo,
    retry: 0,
  })

  if (query.isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[50px]" />
        <Skeleton className="h-[100px]" />
      </div>
    )
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex flex-col gap-4">
        <h2>{"Étape 1/3 - Mes informations personnelles"}</h2>
        <Separator />
        <Incompletion phrase="Veuillez compléter le formulaire avec vos informations" />
        <UserInfoForm />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>{"Étape 1/3 - Mes informations personnelles"}</h2>
      <Separator />
      <Completion phrase="Informations complétés avec succès" />
    </div>
  )
}
