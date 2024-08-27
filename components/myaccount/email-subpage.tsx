import { authService } from "@/lib/authentification/service"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../ui/skeleton"
import { Completion, Incompletion } from "./completion-incompletion"

export function EmailSubPage() {
  const query = useQuery({
    queryKey: ["userMeDetails"],
    queryFn: authService.getUserMeDetails,
  })

  if (query.isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[100px]" />
      </div>
    )
  }

  if (query.isError || !query.data) {
    return null
  }

  if (query.data.is_email_confirmed) {
    return <Completion phrase={"Vous avez confirmé votre email"} />
  }

  return (
    <Incompletion phrase={"Aucun email confirmé enregistré (facultatif)"} />
  )
}
