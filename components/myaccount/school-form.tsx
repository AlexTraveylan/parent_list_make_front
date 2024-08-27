"use client"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SchoolShemaIn, schoolShemaIn } from "@/lib/school/schemas"
import { schoolService } from "@/lib/school/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function CreateSchoolForm({
  setIsCreatingFormOpen,
}: {
  setIsCreatingFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SchoolShemaIn>({
    resolver: zodResolver(schoolShemaIn),
    defaultValues: {
      school_name: "",
      city: "",
      zip_code: "",
      country: "",
      adress: "",
      school_relation: "parent",
    },
  })

  const createSchoolMutation = useMutation({
    mutationFn: schoolService.createSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSchools"],
      })
      queryClient.refetchQueries({
        queryKey: ["userSchools"],
      })
      toast.success("École créée avec succès")
      form.reset()
      setIsCreatingFormOpen(false)
    },
    onError: (error) => {
      console.error("Mutation failed", error)
      toast.error(String(error))
    },
  })

  const onSubmit = async (data: SchoolShemaIn) => {
    setIsLoading(true)
    try {
      await createSchoolMutation.mutateAsync(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="school_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'école</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom de l'école" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input placeholder="Entrez la ville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code postal</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le code postal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le pays" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="Entrez l'adresse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="school_relation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relation avec l'école</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre relation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="direction">Direction</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Création en cours..." : "Enregistrer la nouvelle école"}
        </Button>
      </form>
    </Form>
  )
}
