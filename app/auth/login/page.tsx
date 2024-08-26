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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputEye } from "@/components/ui/input-password-eye"
import { AuthSchemaIn, authSchemaIn } from "@/lib/authentification/schemas"
import { authService } from "@/lib/authentification/service"
import { useUserMeStore } from "@/lib/authentification/store"
import { authNavItems, navItems } from "@/lib/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function LoginPage() {
  const { fetchUserMe } = useUserMeStore()
  const router = useRouter()
  const form = useForm<AuthSchemaIn>({
    resolver: zodResolver(authSchemaIn),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (formData: AuthSchemaIn) => {
    try {
      const token = await authService.login(formData)
      localStorage.setItem("auth_token", token.access_token)
      fetchUserMe()
      router.push(navItems["MyAccount"].href)
    } catch (error) {
      toast.error("Echec de la connexion")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitleH1 className="text-2xl">
          {"Formulaire de connexion"}
        </CardTitleH1>
        <CardDescription>
          {"Connectez-vous pour accéder à votre compte"}
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>{"Mot de passe"}</FormLabel>
                    <Link
                      className="ml-auto inline-block text-sm underline"
                      href={authNavItems["forgotPassword"].href}
                    >
                      {"Mot de passe oublié"}
                    </Link>
                  </div>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {"Se connecter"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
