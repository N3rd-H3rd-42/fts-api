module.exports = {
  login: async (request, response) => {
    const { username, password } = request.body;
    const lookup = [
      {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
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
            return response.status(200).json({ msg: 'success', authUsername: adminProfile.username })
        }
      }
    }
  },
};
