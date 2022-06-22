const jwt = require("jsonwebtoken");
const config = require('../../config/constants');

module.exports = {
  login: async (request, response) => {
    try {
      const { username, password } = request.body;
      const lookup = [
        {
          id: config.ADMIN_ID,
          username: config.ADMIN_USERNAME,
          password: config.ADMIN_PASSWORD,
        },
      ];
      if (!username || !password) {
        return response
          .status(400)
          .json({ err: "username and password required" });
      } else {
        const isPresent =
          lookup.filter((admin) => admin.username === username).length > 0;
        if (!isPresent) {
          return response.status(404).json({ err: "user not found" });
        } else {
          const adminProfile = lookup.filter(
            (admin) => admin.username === username
          )[0];
          const isPassMatch = adminProfile.password === password;
          if (!isPassMatch) {
            return response.status(400).json({ err: "password doesnt match" });
          } else {
            const token = jwt.sign(
              { id: adminProfile.id, username: adminProfile.username },
              config.TOKEN_KEY,
              { expiresIn: '24h' }
            )
            return response
              .status(200)
              .json({ msg: "success", user: {
                id: adminProfile.id,
                username: adminProfile.username,
              }, token });
          }
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
