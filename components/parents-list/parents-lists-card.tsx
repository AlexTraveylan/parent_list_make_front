"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUserMeStore } from "@/lib/authentification/store"
import { linksService } from "@/lib/links-service.ts/service"
import { Message, messageSchema, ParentList } from "@/lib/parents-list/schemas"
import { parentListService } from "@/lib/parents-list/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LogOut, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"
import { Textarea } from "../ui/textarea"
import ParentDetails from "./parent-details"
import { WaitingParentDetails } from "./waiting-parent-details"

export default function ParentsListsCard({
  parentList,
}: {
  parentList: ParentList
}) {
  const queryClient = useQueryClient()
  const { userMe } = useUserMeStore()

  const messageForm = useForm<Message>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const confirmedParents = useQuery({
    queryKey: ["confirmedParents", parentList.id],
    queryFn: () => linksService.getConfrimedParentsInList(parentList.id),
    retry: 0,
  })

  const waitingParents = useQuery({
    queryKey: ["waitingParents", parentList.id],
    queryFn: () => linksService.getWaitingParentsInList(parentList.id),
    retry: 0,
  })

  const leaveParentListMutation = useMutation({
    mutationFn: () => parentListService.leaveParentList(parentList.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["confirmedParents"],
      })
      queryClient.refetchQueries({
        queryKey: ["confirmedParents"],
      })
      toast.success("Tu as quitté la liste")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  const askForJoinParentListMutation = useMutation({
    mutationFn: ({ message }: { message: Message }) => {
      return parentListService.askForJoinParentList(parentList.id, message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["waitingParents"],
      })
      queryClient.refetchQueries({
        queryKey: ["waitingParents"],
      })
      toast.success("Demande envoyée avec succès")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  function handleSubmit(formData: Message) {
    askForJoinParentListMutation.mutate({
      message: formData,
    })
  }

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

  if (confirmedParents.isError || waitingParents.isError || !userMe) {
    throw new Error("Erreur")
  }

  const myLink = confirmedParents.data?.find(
    (parent) => parent.user_id === userMe?.id
  )

  let userMe_is_admin = false
  if (myLink) {
    userMe_is_admin = myLink.is_admin
  }

  const isCurrentUserOnWaitingList = waitingParents.data?.some(
    (parent) => parent.user_id === userMe.id
  )

  const isCurrentUserOnConfirmedList = confirmedParents.data?.some(
    (parent) => parent.user_id === userMe.id
  )

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
          <div className="flex gap-4 items-center">
            <h2 className="text-lg font-semibold">Confirmés</h2>
            {isCurrentUserOnConfirmedList &&
              parentList.creator_id !== userMe.id && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      aria-label="Bouton pour quitter la liste"
                      variant={"ghost"}
                      className="flex gap-2 items-center justify-center"
                    >
                      <LogOut className="text-destructive" />
                      <span className="text-sm">{"Quitter la liste"}</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {"Vous allez quitter la liste, êtes-vous sûr ?"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {"Cette action est irréversible"}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{"Annuler"}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => leaveParentListMutation.mutate()}
                      >
                        {"Quitter la liste"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
          </div>
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
          <div className="flex gap-4 items-center">
            <h2 className="text-lg font-semibold">En attente</h2>
            {!isCurrentUserOnWaitingList && !isCurrentUserOnConfirmedList && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    aria-label="Bouton pour rejoindre la liste"
                    className="flex gap-1 items-center justify-center"
                  >
                    <Plus />
                    <span className="text-sm">{"rejoindre"}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{"Demande à rejoindre la liste"}</DialogTitle>
                    <DialogDescription>
                      {
                        "Pour rejoindre la liste, laisse un message au parent qui à crée la liste, avec tes coordonnées si tu souhaites une réponse."
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...messageForm}>
                    <form
                      onSubmit={messageForm.handleSubmit(handleSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={messageForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{"Message"}</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={4}
                                placeholder="Bonjour..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit">{"Envoyer"}</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
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
