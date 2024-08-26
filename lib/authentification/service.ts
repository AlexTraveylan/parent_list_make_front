import { loginRoute, registerRoute, userMeRoute } from "../api-routes"
import {
  AuthSchemaIn,
  AuthToken,
  authTokenSchema,
  UserMe,
  userMeSchemaOut,
} from "./schemas"
import { extractAuthTokenFromLocalStorage } from "./token"

class AuthentificationService {
  async login(credentials: AuthSchemaIn): Promise<AuthToken> {
    const data = new URLSearchParams({
      grant_type: "password",
      username: credentials.username,
      password: credentials.password,
    })

    try {
      const response = await fetch(loginRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: data,
      })

      if (!response.ok) {
        throw new Error(`Echec de la connexion ${response.status}`)
      }

      const responseJson = await response.json()
      const authToken = authTokenSchema.parse(responseJson)

      return authToken
    } catch (error) {
      throw error
    }
  }

  async register(credentials: AuthSchemaIn): Promise<AuthToken> {
    const data = new URLSearchParams({
      grant_type: "password",
      username: credentials.username,
      password: credentials.password,
    })

    try {
      const response = await fetch(registerRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: data,
      })

      if (!response.ok) {
        throw new Error(`Echec de la connexion ${response.status}`)
      }

      const responseJson = await response.json()
      const authToken = authTokenSchema.parse(responseJson)

      return authToken
    } catch (error) {
      throw error
    }
  }

  async getUserMe(): Promise<UserMe> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(userMeRoute, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        throw new Error(`Echec de la connexion ${response.status}`)
      }

      const responseJson = await response.json()
      const userMe = userMeSchemaOut.parse(responseJson)

      return userMe
    } catch (error) {
      throw error
    }
  }
}

export const authService = new AuthentificationService()
