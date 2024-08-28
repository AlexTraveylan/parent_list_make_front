"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  parentListSchemaIn,
  ParentListShemaIn,
} from "@/lib/parents-list/schemas"
import { parentListService } from "@/lib/parents-list/service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

export default function ParentListForm({
  school_id,
  setIsCreatingFormOpen,
}: {
  school_id: number
  setIsCreatingFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()

  const form = useForm<ParentListShemaIn>({
    resolver: zodResolver(parentListSchemaIn),
    defaultValues: {
      list_name: "",
      holder_length: 10,
      school_id: school_id,
    },
  })

  const createParentListMutation = useMutation({
    mutationFn: parentListService.createParentList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userParentLists"],
      })
      toast.success("Liste créée avec succès")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  function onSubmit(values: ParentListShemaIn) {
    setIsCreatingFormOpen(false)
    createParentListMutation.mutate(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Créer une nouvelle liste"}</CardTitle>
        <CardDescription>
          {
            "Vous devez avoir renseigné un email valide et l'avoir confirmé pour pouvoir créer une liste"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="list_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nom de la nouvelle liste"}</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le nom de la liste" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="holder_length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nombre de titulaires"}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Créer</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        {
          "Il est rare de remplir une liste, s'il en existe déjà une, il est recommandé de la rejoindre, sauf si vous souhaitez vraiment créer une liste dissidente."
        }
      </CardFooter>
    </Card>
  )
}
