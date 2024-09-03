import {
  addEmailRoute,
  contactUserRoute,
  resetPasswordRoute,
  sendResetPasswordRequestRoute,
} from "../api-routes"
import { extractAuthTokenFromLocalStorage } from "../authentification/token"
import { EmailConfirmationToken, emailConfirmationTokenSchema } from "./schemas"

class EmailService {
  async addEmailToUser(email: string): Promise<EmailConfirmationToken> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)
    headers.append("Content-Type", "application/json")

    try {
      const response = await fetch(addEmailRoute, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          email: email,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      const responseJson = await response.json()
      const emailConfirmationToken =
        emailConfirmationTokenSchema.parse(responseJson)

      return emailConfirmationToken
    } catch (error) {
      throw error
    }
  }

  async confirmEmailWithToken(token: string): Promise<void> {
    try {
      const response = await fetch(`${addEmailRoute}${token}`, {
        method: "GET",
      })
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }

  async sendResetPasswordRequest(username: string): Promise<void> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    try {
      const response = await fetch(sendResetPasswordRequestRoute, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          username: username,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    try {
      const response = await fetch(`${resetPasswordRoute}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          token: token,
          new_password: password,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }

  async contactUser(messsage: string, userId: number): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)
    headers.append("Content-Type", "application/json")

    try {
      const response = await fetch(`${contactUserRoute}${userId}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          message: messsage,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }
}
export const emailService = new EmailService()
