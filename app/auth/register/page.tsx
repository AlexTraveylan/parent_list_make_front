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
import { InputEye } from "@/components/ui/input-password-eye"
import { AuthSchemaIn, authSchemaIn } from "@/lib/authentification/schema"
import { authService } from "@/lib/authentification/service"
import { useUserMeStore } from "@/lib/authentification/store"
import { navItems } from "@/lib/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function RegisterPage() {
  const { fetchUserMe } = useUserMeStore()
  const router = useRouter()

  const form = useForm<AuthSchemaIn>({
    resolver: zodResolver(authSchemaIn),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (formData: AuthSchemaIn) => {
    try {
      const token = await authService.register(formData)
      localStorage.setItem("auth_token", token.access_token)
      fetchUserMe()
      toast.success("Compte créé avec succès")
      router.push(navItems["MyAccount"].href)
    } catch (error) {
      toast.error("Echec de la création du compte")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitleH1 className="text-xl">
          {"Formulaire de création de compte"}
        </CardTitleH1>
        <CardDescription>
          {
            "Créez votre compte pour rejoindre (ou créer) la liste de parents élus de votre école"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Mot de passe"}</FormLabel>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {"Créer un compte"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
