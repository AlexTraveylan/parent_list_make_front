import { create } from "zustand"
import { UserMe } from "./schemas"
import { authService } from "./service"

type userMeStoreType = {
  userMe: UserMe | null
  fetchUserMe: () => Promise<void>
  cleanUserMe: () => void
}

export const useUserMeStore = create<userMeStoreType>((set) => ({
  userMe: null,
  fetchUserMe: async () => {
    try {
      const userMe = await authService.getUserMe()
      set({ userMe })
    } catch (error) {
      set({ userMe: null })
    }
  },
  cleanUserMe: () => set({ userMe: null }),
}))
