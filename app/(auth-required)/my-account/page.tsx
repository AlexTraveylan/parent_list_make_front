"use client"

import Completion from "@/components/myaccount/information-ok"
import UserInfoForm from "@/components/myaccount/user-info-form"
import { userInformationService } from "@/lib/user-information/service"
import { useQuery } from "@tanstack/react-query"

export default function MyAccountPage() {
  const query = useQuery({
    queryKey: ["userInfo"],
    queryFn: userInformationService.getUserInfo,
  })

  if (query.isLoading) {
    return <div>Chargement...</div>
  }

  if (query.isError) {
    return <div>Erreur</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Mon compte</h1>
      <h2>Mes informations personnelles</h2>
      {query.data ? (
        <Completion phrase="Informations complétés avec succès" />
      ) : (
        <UserInfoForm />
      )}
      <h2>Mon école</h2>
    </div>
  )
}
