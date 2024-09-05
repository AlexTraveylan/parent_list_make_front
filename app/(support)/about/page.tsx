import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        {"À propos de Parents List Maker"}
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{"Qu'est-ce que Parents List Maker ?"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {
              "Parents List Maker est une application conçue pour faciliter la création de listes de parents d'élèves élus."
            }
            <br />
            {
              "Elle répond à une problématique identifiée dans le milieu scolaire et vise à simplifier ce processus administratif."
            }
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{"Architecture technique"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>{"Backend : Python, fastAPI hébergé sur Railway.app"}</li>
            <li>{"Frontend : Typescript, Next.js, hébergé sur Vercel"}</li>
            <li>{"Base de données : PostgreSQL sur Supabase"}</li>
            <li>{"Envoi d'emails : via Resend"}</li>
          </ul>
          <div className="mt-4">
            <Badge className="mr-2">{"Open Source"}</Badge>
            <Badge>{"Pas de cookies tiers"}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{"Sécurité des données"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>{"La sécurité des données personnelles est une priorité :"}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>{"Seul le nom d'utilisateur est stocké en clair"}</li>
            <li>{"Les mots de passe sont hachés"}</li>
            <li>{"Les autres données sont encodées avec l'algorithme AES"}</li>
            <li>{"Les emails sont également encodés"}</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{"À propos du développeur"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            {
              "Je suis Timothée Demares, également connu sous le pseudonyme AlexTraveylan."
            }
            <br />
            {
              "Parent et développeur reconverti depuis 3 ans, j'ai créé cette application bénévolement pour répondre à un besoin concret."
            }
          </p>
          <Link
            href="https://github.com/AlexTraveylan"
            className="text-blue-500 hover:underline"
          >
            {"Mon profil GitHub"}
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{"Contribuer au projet"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {"Le projet est en constante amélioration."}
            <br />
            {
              "Les développeurs intéressés peuvent contribuer via des pull requests ou me contacter directement."
            }
          </p>
          <div className="mt-4 space-x-4">
            <Link
              href="https://github.com/AlexTraveylan/ParentsListMaker"
              className="text-blue-500 hover:underline"
            >
              {"Repo Backend"}
            </Link>
            <Link
              href="https://github.com/AlexTraveylan/parent_list_maker_front"
              className="text-blue-500 hover:underline"
            >
              {"Repo Frontend"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
