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
import {
  createRandomInvitationCode,
  joinSchoolSchemaIn,
  JoinSchoolSchemaIn,
} from "@/lib/school/schemas"
import { schoolService } from "@/lib/school/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"

export default function SchoolForm({
  schoolCode,
  setIsJoinFormOpen,
}: {
  schoolCode?: string
  setIsJoinFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const form = useForm<JoinSchoolSchemaIn>({
    resolver: zodResolver(joinSchoolSchemaIn),
    defaultValues: {
      school_code: schoolCode || "",
    },
  })

  const queryClient = useQueryClient()

  const createSchoolMutation = useMutation({
    mutationFn: schoolService.joinSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSchools"] })
      queryClient.refetchQueries({ queryKey: ["userSchools"] })
      toast.success("École créée avec succès")
      form.reset()
      setIsJoinFormOpen(false)
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  const onSubmit = (data: JoinSchoolSchemaIn) => {
    createSchoolMutation.mutate(data.school_code)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Formulaire pour rejoindre une école"}</CardTitle>
        <CardDescription>
          {"Rejoins l'espace de ton école à l'aide de son code sécurisé"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="school_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Code de l'école"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={createRandomInvitationCode()}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {
                      "C'est le code qui vous a été envoyé par l'école, si vous venez par le lien, il devrait être déjà renseigné."
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Valider</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
