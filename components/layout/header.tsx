"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useUserMeStore } from "@/lib/authentification/store"
import { navItems } from "@/lib/navigation"
import Link from "next/link"
import { useEffect } from "react"
import { ModeToggle } from "../theme-toogle-button"
import { AuthButton } from "./auth-button"

export const Header = () => {
  const { userMe, fetchUserMe } = useUserMeStore()

  useEffect(() => {
    fetchUserMe()
  }, [fetchUserMe])

  return (
    <header className="flex flex-wrap gap-5 justify-evenly py-2">
      <NavigationMenu>
        <NavigationMenuList>
          {Object.values(navItems)
            .filter((item) => !item.authRequired || userMe !== null)
            .map((item, index) => {
              return (
                <NavigationMenuItem key={`${index}${item.displayName}`}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.displayName}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex max-w-max flex-1 flex-wrap items-center justify-center gap-3">
        {userMe && (
          <span className="text-muted-foreground">
            {"Bienvenue"} {userMe.username}
          </span>
        )}
        <div className="flex gap-3 items-center justify-center">
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
