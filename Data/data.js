require("dotenv").config();
const fetch = require("node-fetch");

class DataProvider {
  constructor(oauthClient, user) {
    this.oauthClient = oauthClient;
    this.user = user;
  }

  async getConnectedRealmId() {
    const token = await this.oauthClient.getToken();
    console.log("DataProvider ", token);
    console.log(this.user.region);
    console.log(this.user.realm);
    const BLIZZ_CONNECTED_REALM_INDEX_URL = `https://${this.user.region}.api.blizzard.com/data/wow/connected-realm/index`;
    const BATTLENET_NAMESPACE = `dynamic-${this.user.region}`;

    var response = await fetch(BLIZZ_CONNECTED_REALM_INDEX_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Battlenet-Namespace": BATTLENET_NAMESPACE,
      },
    });
    const data = await response.json();
    const realmList = data.connected_realms;

    for (let i = 0; i < realmList.length; i++) {
      const realmData = await fetch(realmList[i].href, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Battlenet-Namespace": BATTLENET_NAMESPACE,
        },
      });
      //
      const connectedRealmsData = await realmData.json();
      const realmId = connectedRealmsData.id;
      for (let j = 0; j < connectedRealmsData.realms.length; j++) {
        console.log("FOR'a Girdi");
        let currSlug = connectedRealmsData.realms[j].slug;
        if (currSlug == this.user.realm) {
          return realmId;
        }
      }
    }
  }






  
}

module.exports = DataProvider;
