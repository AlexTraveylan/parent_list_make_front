"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { emailService } from "@/lib/email/service"
import { navItems } from "@/lib/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function ValidEmailPage({
  params,
}: {
  params: { token: string }
}) {
  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["confirmEmail", params.token],
    queryFn: () => emailService.confirmEmailWithToken(params.token),
    retry: 0,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col my-5 p-3 items-center justify-center gap-4">
        <Skeleton className="h-16 w-[250px]" />

        <div className="flex gap-4">
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col my-5 p-3 items-center justify-center gap-4">
      {isError && (
        <p className="text-center">
          La validation de l'email a échoué. Veuillez réessayer.
        </p>
      )}
      {isSuccess && (
        <p className="text-center">Votre email a été validé avec succès !</p>
      )}

      <div className="flex gap-4">
        <Button asChild>
          <Link href={navItems["Home"].href}>
            {navItems["Home"].displayName}
          </Link>
        </Button>
        <Button asChild>
          <Link href={navItems["MyAccount"].href}>
            {navItems["MyAccount"].displayName}
          </Link>
        </Button>
      </div>
    </div>
  )
}
