import { Button } from "@/components/ui/button"
import { authNavItems } from "@/lib/navigation"
import Image from "next/image"
import Link from "next/link"

type Feature = {
  title: string
  subtitle: string
  description: string
  content: string
  image: string
}

const features: Feature[] = [
  {
    title: "Collaboration simplifiée",
    subtitle: "Rejoignez facilement",
    description:
      "Créez et partagez facilement vos listes. Un simple lien pour participer.",
    content:
      "Invitez d'autres parents à rejoindre et à contribuer à votre liste en temps réel. Partagez le lien unique de votre liste pour permettre aux autres parents de rejoindre rapidement et sans complication.",
    image: "/img1.png",
  },
  {
    title: "Gestion efficace",
    subtitle: "Organisez vos informations",
    description: "Contrôle total pour l'administrateur",
    content:
      "Triez, filtrez et mettez à jour les informations des parents rapidement et facilement. L'administrateur peut accepter les parents en attente, envoyer des messages, et ajuster l'ordre des participants sur la liste.",
    image: "/img3.png",
  },
  {
    title: "Sécurité garantie",
    subtitle: "Vos données sont protégées",
    description: "Protection des données personnelles",
    content:
      "Nous assurons la confidentialité et la sécurité des informations personnelles des parents. Toutes les informations personnelles sont encodées en base de données. Les adresses e-mail ne sont partagées avec les autres parents qu'avec votre autorisation.",
    image: "/img2.png",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        {"Parents List Maker"}
      </h1>

      <p className="text-xl text-center mb-12">
        {
          "Création collaborative de listes de parents d'élèves pour les élections de représentants"
        }
      </p>

      <div className="flex flex-wrap justify-center mb-16 gap-5">
        <Button size="lg" asChild>
          <Link href={authNavItems["register"].href}>
            {"Commencer, c'est totalement gratuit !"}
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href={"/about"}>{"En savoir plus"}</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col h-full border border-gray-300 rounded-lg overflow-hidden"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.title}
                height={400}
                width={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <h4 className="text-lg font-semibold mb-2">{item.subtitle}</h4>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <p className="text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <iframe
          width="800"
          height="700"
          src="https://www.youtube.com/embed/NLCa8HSx0Co?autoplay=1&mute=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
        >
          {"Your browser does not support the video tag."}
        </iframe>
      </div>
    </div>
  )
}
