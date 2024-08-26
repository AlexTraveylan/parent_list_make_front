import { userInfoRoute } from "../api-routes"
import { extractAuthTokenFromLocalStorage } from "../authentification/token"
import {
  UserInfoIn,
  UserInfoOut,
  userInfoSchemaOut,
  UserInfoShort,
  userInfoShortSchema,
} from "./schemas"

export class UserInformationService {
  async createUserInfo(userInfo: UserInfoIn): Promise<UserInfoOut> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(userInfoRoute, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(userInfo),
      })

      if (!response.ok) {
        throw new Error(
          `Echec de la creation des informations utilisateur ${response.status}`
        )
      }

      const responseJson = await response.json()
      const userInfoResponse = userInfoSchemaOut.parse(responseJson)

      return userInfoResponse
    } catch (error) {
      throw error
    }
  }

  async getUserInfo(): Promise<UserInfoShort> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(userInfoRoute, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        throw new Error(
          `Echec de la récupération des informations utilisateur ${response.status}`
        )
      }

      const responseJson = await response.json()
      const userInfoResponse = userInfoShortSchema.parse(responseJson)

      return userInfoResponse
    } catch (error) {
      throw error
    }
  }
}
