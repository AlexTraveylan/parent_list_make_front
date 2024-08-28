const url =
  process.env.NODE_ENV === "production"
    ? "https://parentslistsmaker-alextraveylans-projects.vercel.app"
    : "http://localhost:8000"

// Auth routes
export const loginRoute = url + "/token"
export const registerRoute = url + "/register"
export const userMeRoute = url + "/users/me/"
export const userMeDetailsRoute = url + "/users/me/details/"

// Email routes
const emailExt = "/confirmation-email/"
export const addEmailRoute = url + emailExt
export const contactUserRoute = url + emailExt + "contact-user/"
export const sendResetPasswordRequestRoute =
  url + emailExt + "request-password-reset"
export const resetPasswordRoute = url + emailExt + "reset-password"

// User Information routes
const userInfoExt = "/user-informations/"
export const userInfoRoute = url + userInfoExt

// School routes
const schoolExt = "/schools/"
export const schoolRoute = url + schoolExt
export const joinSchoolRoute = url + schoolExt + "join/"
export const userSchoolRoute = url + schoolExt + "me/"

// Parents lists routes
const parentListExt = "/parents-lists/"
export const parentListRoute = url + parentListExt
export const joinParentListRoute = url + parentListExt + "join/"
export const leaveParentListRoute = url + parentListExt + "leave/"
export const acceptParentListRoute = url + parentListExt + "accept/"

// links routes
const linkExt = "/links/"
export const getConfirmedParentsRoute = url + linkExt + "confirmed/"
export const getWaitingParentsRoute = url + linkExt + "waiting/"
export const upParentRoute = url + linkExt + "up/"
export const downParentRoute = url + linkExt + "down/"
export const makeAdminRoute = url + linkExt + "make-admin/"
