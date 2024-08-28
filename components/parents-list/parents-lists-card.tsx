"use client"

import { linksService } from "@/lib/links-service.ts/service"
import { ParentList } from "@/lib/parents-list/schemas"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../ui/skeleton"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUserMeStore } from "@/lib/authentification/store"
import { Separator } from "../ui/separator"
import ParentDetails from "./parent-details"
import { WaitingParentDetails } from "./waiting-parent-details"

export default function ParentsListsCard({
  parentList,
}: {
  parentList: ParentList
}) {
  const { userMe } = useUserMeStore()

  const confirmedParents = useQuery({
    queryKey: ["confirmedParents", parentList.id],
    queryFn: () => linksService.getConfrimedParentsInList(parentList.id),
  })

  const waitingParents = useQuery({
    queryKey: ["waitingParents", parentList.id],
    queryFn: () => linksService.getWaitingParentsInList(parentList.id),
  })

  if (confirmedParents.isLoading || waitingParents.isLoading) {
    return (
      <div>
        <Skeleton className="h-[50px]" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-[500px] w-[350px]" />
          <Skeleton className="h-[500px] w-[350px]" />
        </div>
      </div>
    )
  }

  if (confirmedParents.isError || waitingParents.isError) {
    throw new Error("Erreur")
  }

  const myLink = confirmedParents.data?.find(
    (parent) => parent.user_id === userMe?.id
  )

  let userMe_is_admin = false
  if (myLink) {
    userMe_is_admin = myLink.is_admin
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{parentList.list_name}</CardTitle>
        <CardDescription>
          {`${parentList.holder_length} titulaires - ${parentList.holder_length} suppléants`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Confirmés</h2>
          <Separator className="bg-muted-foreground" />
          {confirmedParents.data
            ?.sort((a, b) => a.position_in_list - b.position_in_list)
            .map((parent) => (
              <ParentDetails
                key={`${parent.first_name}${parent.last_name}`}
                parent={parent}
                isCurrentUserAdmin={userMe_is_admin}
                list_id={parentList.id}
                confirmedListLength={confirmedParents.data?.length}
              />
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">En attente</h2>
          <Separator className="bg-muted-foreground" />
          {waitingParents.data?.map((parent) => (
            <WaitingParentDetails
              key={`${parent.first_name}${parent.last_name}`}
              parent={parent}
              isCurrentUserAdmin={userMe_is_admin}
              list_id={parentList.id}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
