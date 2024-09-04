import { Button } from "@/components/ui/button"
import { ParentListLink } from "@/lib/links-service.ts/schema"
import { ParentList } from "@/lib/parents-list/schemas"
import { SchoolOut } from "@/lib/school/schemas"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { Download } from "lucide-react"
import React from "react"

interface DownloadParentListPDFProps {
  list: ParentList
  school: SchoolOut
  parents: ParentListLink[]
}

const DownloadParentListPDF: React.FC<DownloadParentListPDFProps> = ({
  list,
  school,
  parents,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF()

    // En-tête avec le nom de la liste
    doc.setFontSize(18)
    doc.text(list.list_name, 105, 15, { align: "center" })

    // Sous-titre
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text("Représentants des parents d'élèves", 105, 22, { align: "center" })
    doc.setTextColor(0)

    // Coordonnées de l'école (dans un cadre à gauche)
    doc.setFontSize(12)
    doc.rect(20, 30, 80, 40)
    doc.text(`${school.school_name}`, 25, 40)
    doc.text(`${school.adress}`, 25, 47)
    doc.text(`${school.zip_code} ${school.city}`, 25, 54)
    doc.text(`${school.country}`, 25, 61)

    // Espace pour la signature du directeur ou tampon (à droite)
    doc.rect(110, 30, 80, 40)
    doc.text("Signature du directeur / Tampon", 115, 40)

    // Tableau des parents
    const tableColumn = ["Nom", "Prénom", "Email", "Téléphone", "Signature"]
    const tableRows = parents.map((parent) => [
      parent.last_name,
      parent.first_name,
      "",
      "",
      "",
    ])

    // Titulaires
    doc.setFontSize(14)
    doc.text("Titulaires", 20, 80)
    ;(doc as any).autoTable({
      head: [tableColumn],
      body: tableRows.slice(0, list.holder_length),
      startY: 85,
      columnStyles: {
        2: { cellWidth: 60 }, // Email column
        3: { cellWidth: 30 }, // Téléphone column
      },
    })

    // Suppléants
    const suppeantsStartY = (doc as any).lastAutoTable.finalY + 10
    doc.text("Suppléants", 20, suppeantsStartY)
    ;(doc as any).autoTable({
      head: [tableColumn],
      body: tableRows.slice(list.holder_length),
      startY: suppeantsStartY + 5,
      columnStyles: {
        2: { cellWidth: 60 }, // Email column
        3: { cellWidth: 30 }, // Téléphone column
      },
    })

    // Téléchargement du PDF
    doc.save(`Liste_Parents_${list.list_name}.pdf`)
  }

  return (
    <Button onClick={generatePDF}>
      <Download className="mr-2 h-4 w-4" />
      {"Télécharger"}
    </Button>
  )
}

export default DownloadParentListPDF
