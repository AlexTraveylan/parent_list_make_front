import { joinSchoolRoute, schoolRoute, userSchoolRoute } from "../api-routes"
import { extractAuthTokenFromLocalStorage } from "../authentification/token"
import { School, schoolSchema, SchoolShemaIn } from "./schemas"

class SchoolService {
  async getSchools(): Promise<School[]> {
    try {
      const response = await fetch(schoolRoute, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

  async getSchoolById(schoolId: number): Promise<School> {
    try {
      const response = await fetch(`${schoolRoute}${schoolId}`, {
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
      const school = schoolSchema.parse(responseJson)

      return school
    } catch (error) {
      throw error
    }
  }

  async createSchool(school: SchoolShemaIn): Promise<School> {
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

      const responseJson = await response.json()
      const createdSchool = schoolSchema.parse(responseJson)

      return createdSchool
    } catch (error) {
      throw error
    }
  }

  async joinSchool(schoolId: number): Promise<School> {
    const authToken = extractAuthTokenFromLocalStorage()
    const headers = new Headers()
    headers.append("Authorization", authToken)

    try {
      const response = await fetch(`${joinSchoolRoute}${schoolId}`, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      const responseJson = await response.json()
      const createdSchool = schoolSchema.parse(responseJson)

      return createdSchool
    } catch (error) {
      throw error
    }
  }

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
}

export const schoolService = new SchoolService()
