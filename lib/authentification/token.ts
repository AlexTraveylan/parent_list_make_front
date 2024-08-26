export const extractAuthTokenFromLocalStorage = (): string => {
  const token = localStorage.getItem("auth_token")

  return `Bearer ${token}`
}
