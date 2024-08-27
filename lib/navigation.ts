type NavigationItem = {
  displayName: string
  href: string
  authRequired: boolean
}

type NavItemPossibilities = "Home" | "Application" | "MyAccount"

export const navItems: Record<NavItemPossibilities, NavigationItem> = {
  Home: { displayName: "Accueil", href: "/", authRequired: false },
  Application: {
    displayName: "Mes listes",
    href: "/application",
    authRequired: true,
  },
  MyAccount: {
    displayName: "Mon Compte",
    href: "/my-account",
    authRequired: true,
  },
}

type AuthNavItemPossibilities = "login" | "register" | "forgotPassword"

export const authNavItems: Record<AuthNavItemPossibilities, NavigationItem> = {
  login: { displayName: "Connexion", href: "/auth/login", authRequired: false },
  register: {
    displayName: "Inscription",
    href: "/auth/register",
    authRequired: false,
  },
  forgotPassword: {
    displayName: "Mot de passe oublié",
    href: "/auth/forgot-password",
    authRequired: false,
  },
}
