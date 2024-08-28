import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { School } from "@/lib/school/schemas"

export const SchoolsCard = ({ school }: { school: School }) => {
  return (
    <Card key={school.id} className="max-w-sm">
      <CardHeader>
        <CardTitle>{school.school_name}</CardTitle>
        <CardDescription>
          {school.country} - {school.zip_code} - {school.city}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{school.adress}</p>
      </CardContent>
    </Card>
  )
}
