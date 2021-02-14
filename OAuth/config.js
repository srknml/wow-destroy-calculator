const {
    ClientCredentials,
    ResourceOwnerPassword,
    AuthorizationCode,
  } = require("simple-oauth2");
  


const config = {
    client: {
      id: "4975e15f885f44bb82093b4a8f225ce8",
      secret: "u19m2FuFo7NIABzrs0xq3C7mKTFM2pw1",
    },
    auth: {
      tokenHost: process.env.OAUTH_TOKEN_HOST || "https://us.battle.net",
    },
  };

// CLIENT_ID=4975e15f885f44bb82093b4a8f225ce8
// CLIENT_SECRET=u19m2FuFo7NIABzrs0xq3C7mKTFM2pw1
