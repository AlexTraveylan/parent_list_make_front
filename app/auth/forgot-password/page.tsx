"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Username, usernameSchema } from "@/lib/email/schemas"
import { emailService } from "@/lib/email/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const ForgotPasswordForm: FC = () => {
  const [isWaiting, setIsWaiting] = useState(false)

  const form = useForm<Username>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = async (formdata: Username) => {
    if (isWaiting) {
      return
    }

    setIsWaiting(true)
    const timer = setTimeout(() => {
      setIsWaiting(false)
    }, 30000)
    try {
      await emailService.sendResetPasswordRequest(formdata.username)
      toast.success(
        "Un email vous a été envoyé pour réinitialiser votre mot de passe"
      )
    } catch (error) {
      toast.error("Utilisateur introuvable ou sans email confirmé")
    }
    return timer
  }

  return (
    <Card className="mx-auto max-w-sm my-5">
      <CardHeader>
        <CardTitleH1>{"Mot de passe oublié ?"}</CardTitleH1>
        <CardDescription>
          {
            "Saisissez votre nom d'utilisateur pour recevoir un lien de réinitialisation de mot de passe."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nom d'utilisateur"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isWaiting}>
              {isWaiting ? "Veuillez patienter" : "Envoyer"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        {
          "Remarque : Ne fonctionne que si vous avez fourni et validé votre adresse email."
        }
      </CardFooter>
    </Card>
  )
}

export default ForgotPasswordForm
