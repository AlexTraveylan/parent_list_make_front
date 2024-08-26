class EmailService {
  async sendResetPasswordRequest(email: string): Promise<void> {
    // TODO : write it later
    console.log("sendResetPasswordRequest", email)
  }
}
export const emailService = new EmailService()
