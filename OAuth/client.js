const fetch = require("node-fetch");
const oauth2 = require("simple-oauth2");
const { ClientCredentials } = require("simple-oauth2");
const region = "eu";
const realmSlug = "silvermoon";
const token = "USE6oKD6mxSDJv8kmwjsk3JSjlwKJ2o38z";

const config = {
  client: {
    id: "4975e15f885f44bb82093b4a8f225ce8",
    secret: "u19m2FuFo7NIABzrs0xq3C7mKTFM2pw1",
  },
  auth: {
    tokenHost: process.env.OAUTH_TOKEN_HOST || "https://us.battle.net",
  },
};

 async function run() {
  const client = new ClientCredentials(config);

  const tokenParams = {
    scope: null,
  };

  try {
    const accessToken = await client.getToken(tokenParams);
    console.log(accessToken);
  } catch (error) {
    console.log("Access Token error", error.message);
  }
}

run();

