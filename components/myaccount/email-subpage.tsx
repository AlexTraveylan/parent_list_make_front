import { authService } from "@/lib/authentification/service"
import { navItems } from "@/lib/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"
import { Completion, Warningtional } from "./completion-incompletion"

export function EmailSubPage() {
  const query = useQuery({
    queryKey: ["userMeDetails"],
    queryFn: authService.getUserMeDetails,
    retry: 0,
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
    <div>
      <Separator />
      <Warningtional phrase={"Aucun email confirmé enregistré (facultatif)"} />
      <div className="flex justify-end mt-2">
        <Link
          href={navItems["MyAccount"].href + "/confirm-email"}
          className="text-sm text-foreground/80 hover:text-foreground"
        >
          {"Changer d'avis et confirmer son email"}
        </Link>
      </div>
    </div>
  )
}
