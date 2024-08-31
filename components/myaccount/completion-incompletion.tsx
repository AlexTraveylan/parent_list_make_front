import { Card } from "@/components/ui/card"
import { Check, CircleAlert, X } from "lucide-react"
import React from "react"

interface CompletionProps {
  phrase: string
}

export const Completion: React.FC<CompletionProps> = ({
  phrase,
}: CompletionProps) => {
  return (
    <Card className="flex items-center justify-between p-4 shadow-md">
      <p className="font-medium">{phrase}</p>
      <div className="flex-shrink-0 ml-4">
        <Check className="h-6 w-6 text-green-500" />
      </div>
    </Card>
  )
}

export const Incompletion: React.FC<CompletionProps> = ({
  phrase,
}: CompletionProps) => {
  return (
    <Card className="flex items-center justify-between p-4 shadow-md">
      <p className="font-medium">{phrase}</p>
      <div className="flex-shrink-0 ml-4">
        <X className="h-6 w-6 text-red-500" />
      </div>
    </Card>
  )
}

export const Warningtional: React.FC<CompletionProps> = ({
  phrase,
}: CompletionProps) => {
  return (
    <Card className="flex items-center justify-between p-4 shadow-md">
      <p className="font-medium">{phrase}</p>
      <div className="flex-shrink-0 ml-4">
        <CircleAlert className="h-6 w-6 text-yellow-500" />
      </div>
    </Card>
  )
}
