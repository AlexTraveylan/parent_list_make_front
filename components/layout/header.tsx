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
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { AuthButton } from "./auth-button"

export const Header = () => {
  const { userMe, fetchUserMe } = useUserMeStore()

  useEffect(() => {
    fetchUserMe()
  }, [])

  return (
    <header className="flex flex-wrap gap-2 justify-evenly py-2 bg-primary-foreground">
      <Image
        src="/favicon.ico"
        alt="logo"
        width={40}
        height={40}
        className="ml-2"
      />
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
      <div className="flex gap-5 items-center justify-center">
        {userMe && (
          <span className="text-muted-foreground">
            {"Bienvenue"} {userMe.username}
          </span>
        )}
        <AuthButton />
      </div>
    </header>
  )
}
