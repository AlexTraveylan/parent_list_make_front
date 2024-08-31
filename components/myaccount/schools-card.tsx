import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { navItems } from "@/lib/navigation"
import { School } from "@/lib/school/schemas"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const SchoolsCard = ({ school }: { school: School }) => {
  const router = useRouter()

  function handleOnClick(schoolId: number) {
    router.push(navItems["Application"].href + "/" + schoolId)
  }
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
        <Button onClick={() => handleOnClick(school.id)}>
          {"Voir les listes"}
        </Button>
      </CardContent>
    </Card>
  )
}
