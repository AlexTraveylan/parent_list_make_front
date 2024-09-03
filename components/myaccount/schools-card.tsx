import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { frontendUrl } from "@/lib/api-routes"
import { authNavItems, navItems } from "@/lib/navigation"
import { School } from "@/lib/school/schemas"
import { Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const SchoolsCard = ({ school }: { school: School }) => {
  const router = useRouter()

  function handleOnClick() {
    router.push(navItems["Application"].href + "/" + school.code)
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
  }

  const invitationLink = `${frontendUrl}${authNavItems["register"].href}?code=${school.code}`

  return (
    <Card key={school.id} className="max-w-sm">
      <CardHeader>
        <CardTitle>{school.school_name}</CardTitle>
        <CardDescription className="flex flex-col items-center">
          <p>
            {school.country} - {school.zip_code} - {school.city}
          </p>
          <p>
            <p>{school.adress}</p>
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Button onClick={handleOnClick}>{"Voir les listes"}</Button>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm">Code : {school.code}</div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copier le code"
            onClick={() => copyToClipboard(school.code)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="text-sm truncate" style={{ maxWidth: "200px" }}>
            Lien d'invitation : {invitationLink}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copier le lien d'invitation"
            onClick={() => copyToClipboard(invitationLink)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
