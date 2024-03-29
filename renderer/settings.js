const electron = require("electron");
const { ipcRenderer } = electron;

const REALM_NAMES = [
  "aegwynn",
  "aerie-peak",
  "agamaggan",
  "aggra-portugues",
  "aggramar",
  "ahnqiraj",
  "alakir",
  "alexstrasza",
  "alleria",
  "alonsus",
  "amanthul",
  "ambossar",
  "anachronos",
  "anetheron",
  "antonidas",
  "anubarak",
  "arak-arahm",
  "arathi",
  "arathor",
  "archimonde",
  "area-52",
  "argent-dawn",
  "arthas",
  "arygos",
  "ashenvale",
  "aszune",
  "auchindoun",
  "azjol-nerub",
  "azshara",
  "azuregos",
  "azuremyst",
  "baelgun",
  "balnazzar",
  "blackhand",
  "blackmoore",
  "blackrock",
  "blackscar",
  "blades-edge",
  "bladefist",
  "bloodfeather",
  "bloodhoof",
  "bloodscalp",
  "blutkessel",
  "booty-bay",
  "borean-tundra",
  "boulderfist",
  "bronze-dragonflight",
  "bronzebeard",
  "burning-blade",
  "burning-legion",
  "burning-steppes",
  "cthun",
  "chamber-of-aspects",
  "chants-eternels",
  "chogall",
  "chromaggus",
  "colinas-pardas",
  "confrerie-du-thorium",
  "conseil-des-ombres",
  "crushridge",
  "culte-de-la-rive-noire",
  "daggerspine",
  "dalaran",
  "dalvengyr",
  "darkmoon-faire",
  "darksorrow",
  "darkspear",
  "das-konsortium",
  "das-syndikat",
  "deathguard",
  "deathweaver",
  "deathwing",
  "deepholm",
  "defias-brotherhood",
  "dentarg",
  "der-mithrilorden",
  "der-rat-von-dalaran",
  "der-abyssische-rat",
  "destromath",
  "dethecus",
  "die-aldor",
  "die-arguswacht",
  "die-nachtwache",
  "die-silberne-hand",
  "die-todeskrallen",
  "die-ewige-wacht",
  "doomhammer",
  "draenor",
  "dragonblight",
  "dragonmaw",
  "drakthul",
  "drekthar",
  "dun-modr",
  "dun-morogh",
  "dunemaul",
  "durotan",
  "earthen-ring",
  "echsenkessel",
  "eitrigg",
  "eldrethalas",
  "elune",
  "emerald-dream",
  "emeriss",
  "eonar",
  "eredar",
  "eversong",
  "executus",
  "exodar",
  "festung-der-sturme",
  "fordragon",
  "forscherliga",
  "frostmane",
  "frostmourne",
  "frostwhisper",
  "frostwolf",
  "galakrond",
  "garona",
  "garrosh",
  "genjuros",
  "ghostlands",
  "gilneas",
  "goldrinn",
  "gordunni",
  "gorgonnash",
  "greymane",
  "grim-batol",
  "grom",
  "guldan",
  "hakkar",
  "haomarush",
  "hellfire",
  "hellscream",
  "howling-fjord",
  "hyjal",
  "illidan",
  "jaedenar",
  "kaelthas",
  "karazhan",
  "kargath",
  "kazzak",
  "kelthuzad",
  "khadgar",
  "khaz-modan",
  "khazgoroth",
  "kiljaeden",
  "kilrogg",
  "kirin-tor",
  "korgall",
  "kragjin",
  "krasus",
  "kul-tiras",
  "kult-der-verdammten",
  "la-croisade-ecarlate",
  "laughing-skull",
  "les-clairvoyants",
  "les-sentinelles",
  "lich-king",
  "lightbringer",
  "lightnings-blade",
  "lordaeron",
  "los-errantes",
  "lothar",
  "madmortem",
  "magtheridon",
  "malganis",
  "malfurion",
  "malorne",
  "malygos",
  "mannoroth",
  "marecage-de-zangar",
  "mazrigos",
  "medivh",
  "minahonda",
  "moonglade",
  "mugthol",
  "nagrand",
  "nathrezim",
  "naxxramas",
  "nazjatar",
  "nefarian",
  "nemesis",
  "neptulon",
  "nerzhul",
  "nerathor",
  "nethersturm",
  "nordrassil",
  "norgannon",
  "nozdormu",
  "onyxia",
  "outland",
  "perenolde",
  "pozzo-delleternita",
  "proudmoore",
  "quelthalas",
  "ragnaros",
  "rajaxx",
  "rashgarroth",
  "ravencrest",
  "ravenholdt",
  "razuvious",
  "rexxar",
  "runetotem",
  "sanguino",
  "sargeras",
  "saurfang",
  "scarshield-legion",
  "senjin",
  "shadowsong",
  "shattered-halls",
  "shattered-hand",
  "shattrath",
  "shendralar",
  "silvermoon",
  "sinstralis",
  "skullcrusher",
  "soulflayer",
  "spinebreaker",
  "sporeggar",
  "steamwheedle-cartel",
  "stormrage",
  "stormreaver",
  "stormscale",
  "sunstrider",
  "suramar",
  "sylvanas",
  "taerar",
  "talnivarr",
  "tarren-mill",
  "teldrassil",
  "temple-noir",
  "terenas",
  "terokkar",
  "terrordar",
  "the-maelstrom",
  "the-shatar",
  "the-venture-co",
  "theradras",
  "thermaplugg",
  "thrall",
  "throkferoth",
  "thunderhorn",
  "tichondrius",
  "tirion",
  "todeswache",
  "trollbane",
  "turalyon",
  "twilights-hammer",
  "twisting-nether",
  "tyrande",
  "uldaman",
  "ulduar",
  "uldum",
  "ungoro",
  "varimathras",
  "vashj",
  "veklor",
  "veknilash",
  "voljin",
  "wildhammer",
  "wrathbringer",
  "xavius",
  "ysera",
  "ysondre",
  "zenedar",
  "zirkel-des-cenarius",
  "zuljin",
  "zuluhed",
];

listRealms();

let USER_DATA = {};

ipcRenderer.send("asks-user-data");
ipcRenderer.on("user-data", (event, userData) => {
  console.log({ userData });
  document.querySelector("#realm").value = userData.realm;
  document.querySelector("#region").value = userData.region;
  document.querySelector("#client-id").value = userData.id;
  document.querySelector("#client-secret").value = userData.secret;
  USER_DATA = userData;
});

function listRealms() {
  const realms = document.querySelector(".realm-list");
  for (let i = 0; i < REALM_NAMES.length; i++) {
    let opt = document.createElement("option");
    let realmName = document.createTextNode(`${REALM_NAMES[i]}`);
    opt.value = REALM_NAMES[i];
    opt.appendChild(realmName);
    realms.appendChild(opt);
  }
}
handleSubmit = (event) => {
  ipcRenderer.send("user-config", USER_DATA);
  alert("Please Restart Your App!")
  event.preventDefault();
};
handleChange = (event) => {
  USER_DATA[`${event.target.name}`] = event.target.value;
};
const form = document.querySelector(".settings-form");
form.addEventListener("submit", handleSubmit);
form.addEventListener("change", handleChange);

async function checkToken() {
  const tokenStatus = await ipcRenderer.sendSync("check-token");
  if(tokenStatus){
    console.log("True");
    
  }
  else{
    console.log("false");
  }
}
