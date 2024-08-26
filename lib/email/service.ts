import { addEmailRoute, contactUserRoute } from "../api-routes"
import { extractAuthTokenFromLocalStorage } from "../authentification/token"
import { EmailConfirmationToken, emailConfirmationTokenSchema } from "./schemas"

class EmailService {
  async sendResetPasswordRequest(email: string): Promise<void> {
    // TODO : write it later
    console.log("sendResetPasswordRequest", email)
  }

  async addEmailToUser(email: string): Promise<EmailConfirmationToken> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(addEmailRoute, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          email: email,
        }),
      })

      if (!response.ok) {
        throw new Error(`Echec de la connexion ${response.status}`)
      }

      const responseJson = await response.json()
      const emailConfirmationToken =
        emailConfirmationTokenSchema.parse(responseJson)

      return emailConfirmationToken
    } catch (error) {
      throw error
    }
  }

  async contactUser(messsage: string, userId: number): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(`${contactUserRoute}${userId}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          message: messsage,
        }),
      })

      if (!response.ok) {
        throw new Error(`Echec de la connexion ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }
}
export const emailService = new EmailService()
