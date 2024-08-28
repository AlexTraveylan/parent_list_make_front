"use client"

import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { emailService } from "@/lib/email/service"
import { ParentListLink } from "@/lib/links-service.ts/schema"
import { linksService } from "@/lib/links-service.ts/service"
import { Message, messageSchema } from "@/lib/parents-list/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChevronDown, ChevronUp, Ellipsis } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Textarea } from "../ui/textarea"

export default function ParentDetails({
  parent,
  isCurrentUserAdmin,
  list_id,
  confirmedListLength,
}: {
  parent: ParentListLink
  isCurrentUserAdmin: boolean
  list_id: number
  confirmedListLength: number
}) {
  const queryClient = useQueryClient()

  const messageForm = useForm<Message>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const onSubmitEmail = async (data: Message) => {
    try {
      await emailService.contactUser(data.message, parent.user_id)

      toast.success("Message envoyé avec succès")
    } catch (error) {
      toast.error(String(error))
    }
  }

  const makeAdminMutation = useMutation({
    mutationFn: ({
      parentListId,
      userId,
    }: {
      parentListId: number
      userId: number
    }) => linksService.makeAdminInListWithListIdAndUserId(parentListId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["confirmedParents"],
      })
      queryClient.refetchQueries({
        queryKey: ["confirmedParents"],
      })
      toast.success("Ce parent est maintenant admin")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  const upParentMutation = useMutation({
    mutationFn: ({
      parentListId,
      userId,
    }: {
      parentListId: number
      userId: number
    }) => linksService.upParentInListWithListIdAndUserId(parentListId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["confirmedParents"],
      })
      queryClient.refetchQueries({
        queryKey: ["confirmedParents"],
      })
      toast.success("Modification enregistrée avec succès")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  const downParentMutation = useMutation({
    mutationFn: ({
      parentListId,
      userId,
    }: {
      parentListId: number
      userId: number
    }) =>
      linksService.downParentInListWithListIdAndUserId(parentListId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["confirmedParents"],
      })
      queryClient.refetchQueries({
        queryKey: ["confirmedParents"],
      })
      toast.success("Modification enregistrée avec succès")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  const handleMakeAdmin = async () => {
    makeAdminMutation.mutate({
      parentListId: list_id,
      userId: parent.user_id,
    })
  }

  const handleMoveUp = async () => {
    upParentMutation.mutate({
      parentListId: list_id,
      userId: parent.user_id,
    })
  }

  const handleMoveDown = async () => {
    downParentMutation.mutate({
      parentListId: list_id,
      userId: parent.user_id,
    })
  }

  return (
    <div className="flex items-center justify-between p-4 gap-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-lg">{parent.position_in_list}.</span>
        <div>
          <h3 className="font-semibold text-lg">{parent.last_name}</h3>
          <p className="text-sm text-gray-500">{parent.first_name}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-wrap gap-2 justify-end">
          {parent.is_creator && (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              {"👑"}
            </Badge>
          )}
          {parent.is_admin && (
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              {"Admin"}
            </Badge>
          )}
          {parent.is_email && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              {"Email"}
            </Badge>
          )}
        </div>
        {isCurrentUserAdmin && (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-center">
                <DropdownMenuLabel>{"Actions admin"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!parent.is_admin && (
                  <DropdownMenuItem onClick={handleMakeAdmin}>
                    {"Donner les droits admin"}
                  </DropdownMenuItem>
                )}
                <DialogTrigger asChild>
                  <DropdownMenuItem>{"Envoyer un message"}</DropdownMenuItem>
                </DialogTrigger>
                {parent.position_in_list !== 1 && (
                  <DropdownMenuItem
                    onClick={handleMoveUp}
                    className="flex gap-3"
                  >
                    <ChevronUp className="text-green-800 dark:text-green-400" />
                    <span>Monter</span>
                  </DropdownMenuItem>
                )}
                {parent.position_in_list !== confirmedListLength && (
                  <DropdownMenuItem
                    onClick={handleMoveDown}
                    className="flex gap-3"
                  >
                    <ChevronDown className="text-red-800 dark:text-red-400" />
                    <span>Descendre</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{"Envoyer un message"}</DialogTitle>
                <DialogDescription>
                  {"Entrez votre message ci-dessous."}
                </DialogDescription>
              </DialogHeader>
              <Form {...messageForm}>
                <form
                  onSubmit={messageForm.handleSubmit(onSubmitEmail)}
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
                        <FormDescription>
                          {
                            "Mon application se charge de faire l'intermédiaire, la personne aura accès à votre email pour vous répondre."
                          }
                        </FormDescription>
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
    </div>
  )
}
