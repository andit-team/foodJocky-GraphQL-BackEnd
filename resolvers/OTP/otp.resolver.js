const OtpController = require('../../controllers/OTP/otp.controller')

const resolvers = {

  Query: {
    async verifyOtp(root, args, context) {
        let result = await OtpController.verifyOtp(root, args, context)
        return result
    }
  },
  Mutation: {
    async sendOtp(root, args, context) {
      let result = await OtpController.sendOtp(root, args, context)
      return result
    }
  },
}

module.exports = resolvers