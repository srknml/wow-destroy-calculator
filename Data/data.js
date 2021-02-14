require("dotenv").config();
const fetch = require("node-fetch");

class DataProvider {
  constructor(oauthClient,userConfig) {
    this.oauthClient = oauthClient;
    this.userConfig = userConfig
  }

  async getConnectedRealmId(realmSlug, region) {
    const token = await this.oauthClient.getToken();
    console.log("DataProvider ", token);
  }
}

module.exports = DataProvider;

// const token = await  OauthClient.getToken();
// const token = accessToken;
// const region = "eu"; //Userdan Alınacak
// const realmSlug = "silvermoon"; //Userdan Alınacak çevirlip alınacak
// console.log(token, "TOKEN");
// async function getConnectedRealmId(realmSlug, region, token) {
//   const BLIZZ_CONNECTED_REALM_INDEX_URL = `https://${region}.api.blizzard.com/data/wow/connected-realm/index`;
//   const BATTLENET_NAMESPACE = `dynamic-${region}`;

//   var response = await fetch(BLIZZ_CONNECTED_REALM_INDEX_URL, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + token,
//       "Battlenet-Namespace": BATTLENET_NAMESPACE,
//     },
//   });
//   const data = await response.json();

//   const realmList = data.connected_realms;
//   console.log(realmList, "  Realm List");
//   const realmData = await fetch(realmList[20].href, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + token,
//       "Battlenet-Namespace": BATTLENET_NAMESPACE,
//     },
//   });
//   const x = await realmData.json();

//   console.log(
//     x.auctions.href + "&access_token=USE6oKD6mxSDJv8kmwjsk3JSjlwKJ2o38z"
//   ); //Datanın Çekileceği Yer
// }

// getConnectedRealmId(realmSlug, region, token);
