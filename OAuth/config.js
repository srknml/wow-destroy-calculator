const OAuthConfig = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.OAUTH_TOKEN_HOST || "https://us.battle.net",
  },
};
exports.OAuthConfig = OAuthConfig