"use client"

import { EmailSubPage } from "@/components/myaccount/email-subpage"
import { SchoolsSubPage } from "@/components/myaccount/schools-subpage"
import { UserInfoSubPage } from "@/components/myaccount/user-info-subpage"

export default function MyAccountPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-semibold text-center">Mon compte</h1>
      <UserInfoSubPage />
      <EmailSubPage />
      <SchoolsSubPage />
    </div>
  )
}
