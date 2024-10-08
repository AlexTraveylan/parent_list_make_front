import { joinSchoolRoute, schoolRoute, userSchoolRoute } from "../api-routes"
import { extractAuthTokenFromLocalStorage } from "../authentification/token"
import {
  School,
  SchoolOut,
  schoolSchema,
  SchoolSchemaIn,
  schoolSchemaOut,
} from "./schemas"

class SchoolService {
  async getUserSchools(): Promise<School[]> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(userSchoolRoute, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      const responseJson = await response.json()
      const schools = schoolSchema.array().parse(responseJson)

      return schools
    } catch (error) {
      throw error
    }
  }

  async getSchoolBySchoolCode(schoolCode: string): Promise<SchoolOut> {
    try {
      const response = await fetch(`${schoolRoute}${schoolCode}`, {
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
      const school = schoolSchemaOut.parse(responseJson)

      return school
    } catch (error) {
      throw error
    }
  }

  async createSchool(school: SchoolSchemaIn): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)
    headers.append("Content-Type", "application/json")

    try {
      const response = await fetch(schoolRoute, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(school),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }
    } catch (error) {
      throw error
    }
  }

  async joinSchool(schoolCode: string): Promise<void> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(`${joinSchoolRoute}${schoolCode}`, {
        method: "GET",
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
}

export const schoolService = new SchoolService()
