require("dotenv").config();
const fetch = require("node-fetch");

class DataProvider {
  constructor(oauthClient, user) {
    this.oauthClient = oauthClient;
    this.user = user;
    this.token = null;
    this.realmId = null;
    this.currentPrices = null;
    this.BLIZZ_URL_BASE = `https://${this.user.region}.api.blizzard.com`;
    this.CONNECTED_REALM_URL = `https://${this.user.region}.api.blizzard.com/data/wow/connected-realm/index`;
    this.BATTLENET_NAMESPACE = `dynamic-${this.user.region}`;
  }

  async getConnectedRealmId() {
    try {
      let realmsTest = {};
      this.token = await this.oauthClient.getToken();
      const response = await fetch(this.CONNECTED_REALM_URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.token,
          "Battlenet-Namespace": this.BATTLENET_NAMESPACE,
        },
      });
      const data = await response.json();
      const realmList = data.connected_realms;
      for (let i = 0; i < realmList.length; i++) {
        const realmData = await fetch(realmList[i].href, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.token,
            "Battlenet-Namespace": this.BATTLENET_NAMESPACE,
          },
        });
        const connectedRealmsData = await realmData.json();
        const realmId = connectedRealmsData.id;
        realmsTest[realmId] = [];
        for (let j = 0; j < connectedRealmsData.realms.length; j++) {
          let currSlug = connectedRealmsData.realms[j].slug;
          //To make this faster make this constant variable
          realmsTest[realmId].push(currSlug);
          if (currSlug == this.user.realm) {
            return (this.realmId = realmId);
          }
        }
        console.log(realmsTest);
      }
    } catch (error) {
      console.log("error => " + error);
    }
  }

  async getAuctionHouseResponse() {
    try {
      const AH_API_URL =
        this.BLIZZ_URL_BASE +
        `/data/wow/connected-realm/${this.realmId}/auctions`;
      const auctionHouseResponse = await fetch(AH_API_URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.token,
          "Battlenet-Namespace": this.BATTLENET_NAMESPACE,
        },
      });
      const auctionHouseData = await auctionHouseResponse.json();
      const auctionItemList = auctionHouseData.auctions;

      const itemData = [
        { id: 169701, name: "DeathBlossom" },
        { id: 168589, name: "Marrowroot" },
        { id: 168586, name: "Rising Glory" },
        { id: 170554, name: "Vigil's Torch" },
        { id: 168583, name: "Widowbloom" },
        { id: 171315, name: "Nightshade" },
        { id: 173057, name: "Luminous Pigment" },
        { id: 173056, name: "Umbral Pigment" },
        { id: 175788, name: "Tranquil Pigment" },
        { id: 173059, name: "Luminous Ink" },
        { id: 173058, name: "Umbral Ink" },
        { id: 175970, name: "Tranquil Ink" },
      ];
      const itemIds = itemData.map((item) => item.id);

      let itemAuctions = {};
      itemIds.forEach((x) => (itemAuctions[x] = []));

      for (let i = 0; i < auctionItemList.length; i++) {
        let currentAuction = auctionItemList[i];

        //Yanlış id olması durumunda check
        let idx = itemIds.indexOf(currentAuction.item.id);
        if (idx != -1) {
          if (currentAuction.hasOwnProperty("unit_price")) {
            itemAuctions[currentAuction.item.id].push(
              currentAuction.unit_price / 10000
            );
          } else {
            currentAuction.buyout / 10000;
          }
        }
      }

      let currentPrices = {};
      for (let [itemId, auctions] of Object.entries(itemAuctions)) {
        // Sort ascending
        auctions.sort(function (a, b) {
          return a - b;
        });
        currentPrices[itemId] = auctions[0];
      }
      return (this.currentPrices = currentPrices);
    } catch (error) {
      console.log("Error =>>  " + error);
    }
  }
}

module.exports = DataProvider;
