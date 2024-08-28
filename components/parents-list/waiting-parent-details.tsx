"use client"

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
import { Message, messageSchema } from "@/lib/parents-list/schemas"
import { parentListService } from "@/lib/parents-list/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Ellipsis } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Badge } from "../ui/badge"
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

export function WaitingParentDetails({
  parent,
  isCurrentUserAdmin,
  list_id,
}: {
  parent: ParentListLink
  isCurrentUserAdmin: boolean
  list_id: number
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

  const acceptParentListMutation = useMutation({
    mutationFn: ({ user_id, list_id }: { user_id: number; list_id: number }) =>
      parentListService.acceptParentList(user_id, list_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["confirmedParents", "waitingParents"],
      })
      queryClient.refetchQueries({
        queryKey: ["confirmedParents", "waitingParents"],
      })
      toast.success("Modification enregistrée avec succès")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  function handleAccept() {
    acceptParentListMutation.mutate({
      user_id: parent.user_id,
      list_id: list_id,
    })
  }

  return (
    <div className="flex items-center justify-between p-4 gap-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg min-w-[250px]">
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="font-semibold text-lg">{parent.last_name}</h3>
          <p className="text-sm text-gray-500">{parent.first_name}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-wrap gap-2 justify-end">
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
                <DropdownMenuItem onClick={handleAccept}>
                  {"Accepter dans la liste"}
                </DropdownMenuItem>
                {parent.is_email && (
                  <DialogTrigger asChild>
                    <DropdownMenuItem>{"Envoyer un message"}</DropdownMenuItem>
                  </DialogTrigger>
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
