require("dotenv").config();
const fetch = require("node-fetch");

class DataProvider {
  constructor(oauthClient, user) {
    this.oauthClient = oauthClient;
    this.user = user;
    this.BLIZZ_URL_BASE = `https://${this.user.region}.api.blizzard.com`;
    this.CONNECTED_REALM_URL = `https://${this.user.region}.api.blizzard.com/data/wow/connected-realm/index`;
    this.BATTLENET_NAMESPACE = `dynamic-${this.user.region}`;
  }

  async getConnectedRealmId() {
    const token = await this.oauthClient.getToken();
    console.log("Token :  ", token);

    var response = await fetch(this.CONNECTED_REALM_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Battlenet-Namespace": this.BATTLENET_NAMESPACE,
      },
    });
    const data = await response.json();
    const realmList = data.connected_realms;

    for (let i = 0; i < realmList.length; i++) {
      const realmData = await fetch(realmList[i].href, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Battlenet-Namespace": this.BATTLENET_NAMESPACE,
        },
      });
      //
      const connectedRealmsData = await realmData.json();
      const realmId = connectedRealmsData.id;
      for (let j = 0; j < connectedRealmsData.realms.length; j++) {
        let currSlug = connectedRealmsData.realms[j].slug;
        if (currSlug == this.user.realm) {
          console.log("ilk func", realmId);
          return realmId;
        }
      }
    }
  }

  async getAuctionHouseResponse() {
    const token = await this.oauthClient.getToken();
    const connectedRealmId = await this.getConnectedRealmId();
    const AH_API_URL =
      this.BLIZZ_URL_BASE +
      `/data/wow/connected-realm/${connectedRealmId}/auctions`;
    const auctionHouseResponse = await fetch(AH_API_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Battlenet-Namespace": this.BATTLENET_NAMESPACE,
      },
    });

    const auctionHouseData = await auctionHouseResponse.json();
    const auctionItemList = auctionHouseData.auctions;

    const itemID = 169701;
    for (let i = 0; i < auctionItemList.length; i++) {
      let currentAuction = auctionItemList[i];
      
      if (currentAuction.item.id == itemID){
          console.log("Deathblossom Fiyatları : "+ currentAuction.unit_price/10000 + " gold");
        //   console.log("item Bulundu");
      }
      

      
    }
  }
}

module.exports = DataProvider;
