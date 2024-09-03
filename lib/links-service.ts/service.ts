import {
  downParentRoute,
  getConfirmedParentsRoute,
  getWaitingParentsRoute,
  makeAdminRoute,
  transferListProprietyRoute,
  upParentRoute,
} from "../api-routes"
import { extractAuthTokenFromLocalStorage } from "../authentification/token"
import { ParentListLink, parentListLinkSchema } from "./schema"

class LinksService {
  async getConfrimedParentsInList(
    parentListId: number
  ): Promise<ParentListLink[]> {
    try {
      const response = await fetch(
        `${getConfirmedParentsRoute}${parentListId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      const responseJson = await response.json()
      const parentLists = parentListLinkSchema.array().parse(responseJson)

      return parentLists
    } catch (error) {
      throw error
    }
  }

  async getWaitingParentsInList(
    parentListId: number
  ): Promise<ParentListLink[]> {
    try {
      const response = await fetch(`${getWaitingParentsRoute}${parentListId}`, {
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
      const parentLists = parentListLinkSchema.array().parse(responseJson)

      return parentLists
    } catch (error) {
      throw error
    }
  }

  async upParentInListWithListIdAndUserId(
    parentListId: number,
    userId: number
  ): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(
        `${upParentRoute}${parentListId}/${userId}`,
        {
          method: "PATCH",
          headers: headers,
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

  async downParentInListWithListIdAndUserId(
    parentListId: number,
    userId: number
  ): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(
        `${downParentRoute}${parentListId}/${userId}`,
        {
          method: "PATCH",
          headers: headers,
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

  async makeAdminInListWithListIdAndUserId(
    parentListId: number,
    userId: number
  ): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(
        `${makeAdminRoute}${parentListId}/${userId}`,
        {
          method: "PATCH",
          headers: headers,
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

  async transferListPropriety(
    listToTransferId: number,
    targetUserId: number
  ): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(
        `${transferListProprietyRoute}${listToTransferId}/${targetUserId}`,
        {
          method: "PATCH",
          headers: headers,
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

export const linksService = new LinksService()
