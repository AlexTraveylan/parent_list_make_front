"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { schoolService } from "@/lib/school/service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface FormData {
  selectedSchool: string
}

export default function SchoolForm({
  setIsJoinFormOpen,
}: {
  setIsJoinFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const form = useForm<FormData>()
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["schools"],
    queryFn: schoolService.getSchools,
  })

  const createSchoolMutation = useMutation({
    mutationFn: schoolService.joinSchool,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["userSchools"] })
      toast.success("École créée avec succès")
      form.reset()
      setIsJoinFormOpen(false)
    },
    onError: (error) => {
      toast.error(String(error))
    },
  })

  const onSubmit = (data: FormData) => {
    createSchoolMutation.mutate(parseInt(data.selectedSchool))
  }

  if (isLoading) {
    return <Skeleton className="h-[200px]" />
  }

  if (isError) {
    return <div>Erreur</div>
  }

  if (!data) {
    return <div>Aucune école existante</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="selectedSchool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>École</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une école" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.map((school) => (
                    <SelectItem key={school.id} value={school.id.toString()}>
                      {school.school_name} - {school.city} - {school.zip_code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Valider</Button>
      </form>
    </Form>
  )
}
