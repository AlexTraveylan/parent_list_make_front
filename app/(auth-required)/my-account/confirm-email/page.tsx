"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitleH1,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Email, emailSchema } from "@/lib/email/schemas"
import { emailService } from "@/lib/email/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function ConfirmEmailPage() {
  const queryClient = useQueryClient()

  const form = useForm<Email>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: emailService.addEmailToUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
      toast.success("Vous allez recevoir un email de confirmation")
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  async function onSubmit(formdata: Email) {
    mutation.mutate(formdata.email)
  }

  return (
    <Card className="mx-auto max-w-sm my-5">
      <CardHeader>
        <CardTitleH1 className="text-2xl">
          {"Recevoir un email de confirmation"}
        </CardTitleH1>
        <CardDescription>
          {
            "Votre email n'apparaîtra pas aux autres parents, il sera stocké de manière sécurisée. Avec un email valide, vous pourrez créer une liste et être contacté par les autres parents par l'intermédiaire de l'application."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Recevoir un email de confirmation</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
