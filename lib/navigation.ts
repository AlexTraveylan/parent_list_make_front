type NavigationItem = {
  displayName: string
  href: string
  authRequired: boolean
}

export const navItems: Record<string, NavigationItem> = {
  Home: { displayName: "Accueil", href: "/", authRequired: false },
  Application: {
    displayName: "Application",
    href: "/application",
    authRequired: true,
  },
  MyAccount: {
    displayName: "Mon Compte",
    href: "/my-account",
    authRequired: true,
  },
}

export const authNavItems: Record<string, NavigationItem> = {
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
