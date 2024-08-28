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
import { InputEye } from "@/components/ui/input-password-eye"
import {
  ResetPassword,
  resetPasswordSchema,
} from "@/lib/authentification/schemas"
import { emailService } from "@/lib/email/service"
import { authNavItems } from "@/lib/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Suspense } from "react"

function ResetPasswordForm() {
  const params = useSearchParams()
  const token = params.get("token")
  const router = useRouter()

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: "",
    },
  })

  const onSubmit = async (formData: ResetPassword) => {
    if (!token) {
      return
    }
    try {
      await emailService.resetPassword(token, formData.new_password)
      toast.success("Mot de passe réinitialisé avec succès")
      router.push(authNavItems["login"].href)
    } catch (error) {
      toast.error("Echec de la réinitialisation du mot de passe")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitleH1 className="text-2xl">
          {"Réinitialisation du mot de passe"}
        </CardTitleH1>
        <CardDescription>
          {
            "Vous arrivez avec un lien de réinitialisation de mot de passe, entrez votre nouveau mot de passe"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Nouveau mot de passe"}</FormLabel>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={!token}>
              {"Réinitialiser le mot de passe"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
