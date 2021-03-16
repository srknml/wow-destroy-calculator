const oauth2 = require("simple-oauth2");
require("dotenv").config();
const { ClientCredentials } = require("simple-oauth2");
class OAuthClient {
  constructor(OAuthConfig) {
    this.client = new ClientCredentials(OAuthConfig);
    this.token = null;
  }

  async getToken() {
    const tokenParams = {
      scope: null,
    };

    try {
      if (this.token === null || this.token.expired()) {
        this.token = await this.client.getToken(tokenParams);
      }

      return this.reduceToken(this.token);
    } catch (error) {
      console.log("Access Token Error =>>", error.message);
    }
  }
  reduceToken(token) {
    return token.token.access_token;
  }
}
module.exports = OAuthClient;
