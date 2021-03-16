const oauth2 = require("simple-oauth2");
require("dotenv").config();
const electron = require("electron");
const { ClientCredentials } = require("simple-oauth2");
const { ipcMain } = electron;
class OAuthClient {
  constructor(OAuthConfig) {
    this.client = new ClientCredentials(OAuthConfig);
    this.token = null;
    this.x = OAuthConfig
  }

  async getToken() {
    const tokenParams = {
      scope: null,
    };
    try {
      // if (this.token === null || this.token.expired()) {
        console.log(this.client);
        this.token = await this.client.getToken(tokenParams);
      // }
      return this.reduceToken(this.token);
    } catch (error) {
      console.log("Access Token Error =>>", error.message);
      return false;
    }
  }
  reduceToken(token) {
    return token.token.access_token;
  }
}
module.exports = OAuthClient;
