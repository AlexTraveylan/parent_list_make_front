import {
  acceptParentListRoute,
  joinParentListRoute,
  leaveParentListRoute,
  parentListRoute,
} from "../api-routes"
import { extractAuthTokenFromLocalStorage } from "../authentification/token"
import {
  Message,
  ParentList,
  parentListSchema,
  ParentListShemaIn,
} from "./schemas"

class ParentListService {
  async parentsListsBySchoolId(schoolId: number): Promise<ParentList[]> {
    try {
      const response = await fetch(`${parentListRoute}${schoolId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
      const responseJson = await response.json()
      const parentLists = parentListSchema.array().parse(responseJson)
      return parentLists
    } catch (error) {
      throw error
    }
  }

  async getAllParentLists(): Promise<ParentList[]> {
    try {
      const response = await fetch(parentListRoute, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      const responseJson = await response.json()
      const parentLists = parentListSchema.array().parse(responseJson)

      return parentLists
    } catch (error) {
      throw error
    }
  }

  async createParentList(
    parentList: ParentListShemaIn
  ): Promise<ParentListShemaIn> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)
    headers.append("Content-Type", "application/json")

    try {
      const response = await fetch(parentListRoute, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(parentList),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      const responseJson = await response.json()
      const createdParentList = parentListSchema.parse(responseJson)

      return createdParentList
    } catch (error) {
      throw error
    }
  }

  async askForJoinParentList(
    parentListId: number,
    message: Message
  ): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(`${joinParentListRoute}${parentListId}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(message),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }

  async leaveParentList(parentListId: number): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(`${leaveParentListRoute}${parentListId}`, {
        method: "DELETE",
        headers: headers,
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }

  async acceptParentList(
    userToAcceptId: number,
    parentListId: number
  ): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(
        `${acceptParentListRoute}${userToAcceptId}/${parentListId}`,
        {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify({
            user_to_accept_id: userToAcceptId,
          }),
        }
      )

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }
}

export const parentListService = new ParentListService()
