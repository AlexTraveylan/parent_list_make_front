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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputEye } from "@/components/ui/input-password-eye"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthSchemaIn, authSchemaIn } from "@/lib/authentification/schemas"
import { authService } from "@/lib/authentification/service"
import { useUserMeStore } from "@/lib/authentification/store"
import { authNavItems, navItems } from "@/lib/navigation"
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
      toast.error(String(error))
    }
  }

  return (
    <>
      <Tabs className="mx-auto max-w-sm mb-2" defaultValue="register">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            onClick={() => router.push(authNavItems["login"].href)}
            value="login"
          >
            Connexion
          </TabsTrigger>
          <TabsTrigger value="register">Créer un compte</TabsTrigger>
        </TabsList>
      </Tabs>
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
                    <FormDescription>
                      {
                        "Vous n'apparaîtrez pas sous ce nom, il ne sert qu'à vous identifier."
                      }
                    </FormDescription>
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
                    <FormDescription>
                      {
                        "Minimum 8 caractères, doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre."
                      }
                    </FormDescription>
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
    </>
  )
}
