"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserInfoIn, userInfoSchemaIn } from "@/lib/user-information/schemas"
import { userInformationService } from "@/lib/user-information/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const UserInfoForm: React.FC = () => {
  const queryClient = useQueryClient()

  const form = useForm<UserInfoIn>({
    resolver: zodResolver(userInfoSchemaIn),
    defaultValues: {
      name: "",
      first_name: "",
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: userInformationService.createUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
      toast.success("Informations enregistrées avec succès")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  async function onSubmit(formdata: UserInfoIn) {
    if (formdata.email === "") {
      formdata.email = null
    }

    mutation.mutate(formdata)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de famille</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                {
                  "Votre nom de famille, tel qu'il apparaîtra aux autres parents."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                {"Votre prénom, tel qu'il apparaîtra aux autres parents."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="facultatif"
                />
              </FormControl>
              <FormDescription>
                {
                  "Votre email n'apparaîtra pas aux autres parents, il sera stocké de manière sécurisée. Avec un email valide, vous pourrez créer une liste et être contacté par les autres parents par l'intermédiaire de l'application."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{"Ajouter ces informations"}</Button>
      </form>
    </Form>
  )
}

export default UserInfoForm
