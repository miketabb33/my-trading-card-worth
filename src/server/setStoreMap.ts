import * as blackAndWhiteStore from './expansion-data/blackAndWhiteStore'
import * as callOfLegendsStore from './expansion-data/callOfLegendsStore'
import * as diamondAndPearlStore from './expansion-data/diamondAndPearlStore'
import * as eCardStore from './expansion-data/eCardStore'
import * as exStore from './expansion-data/exStore'
import * as heartGoldAndSoulSilverStore from './expansion-data/heartGoldAndSoulSilverStore'
import * as legendaryCollectionStore from './expansion-data/legadaryCollectionStore'
import * as neoStore from './expansion-data/neoSeriesStore'
import * as originalStore from './expansion-data/originalSeriesStore'
import * as platinumStore from './expansion-data/platinumStore'
import * as xyStore from './expansion-data/xyStore'
import { ExpansionData } from './types/ExpansionData'

export const setStoreMap = new Map<number, ExpansionData>([
  [1472, originalStore.baseSet],
  [1473, originalStore.jungle],
  [1476, originalStore.fossil],
  [1478, originalStore.baseSet2],
  [1479, originalStore.teamRocket],
  [1480, originalStore.gymHeros],
  [1481, originalStore.gymChallenge],

  [1482, neoStore.neoGenesis],
  [1483, neoStore.neoDiscovery],
  [1485, neoStore.neoRevelation],
  [1486, neoStore.neoDestiny],

  [1487, legendaryCollectionStore.legendaryCollection],

  [1488, eCardStore.expeditionBaseSet],
  [1491, eCardStore.aquapolis],
  [1492, eCardStore.skyridge],

  [1493, exStore.exRubyAndSapphire],
  [1494, exStore.exSandstorm],
  [1496, exStore.exDragon],
  [1853, exStore.exTeamMagmaVsTeamAqua],
  [1499, exStore.exHiddenLegends],
  [1500, exStore.exFireRedAndLeafGreen],
  [1502, exStore.exTeamRocketReturns],
  [1503, exStore.exDeoxys],
  [1505, exStore.exEmerald],
  [1507, exStore.exUnseenForces],
  [1508, exStore.exDeltaSpecies],
  [1509, exStore.exLegendMaker],
  [1511, exStore.exHolonPhantoms],
  [1513, exStore.exCrystalGuardians],
  [1514, exStore.exDragonFrontiers],
  [1515, exStore.exPowerKeepers],

  [1518, diamondAndPearlStore.diamondAndPearl],
  [1519, diamondAndPearlStore.diamondAndPearlMysteriousTreasures],
  [1522, diamondAndPearlStore.diamondAndPearlSecretWonders],
  [1523, diamondAndPearlStore.diamondAndPearlGreatEncounters],
  [1525, diamondAndPearlStore.diamondAndPearlMajesticDawn],
  [1527, diamondAndPearlStore.diamondAndPearlLegendsAwakened],
  [1529, diamondAndPearlStore.diamondAndPearlStormfront],

  [1530, platinumStore.platinum],
  [1532, platinumStore.platinumRisingRivals],
  [1533, platinumStore.platinumSupremeVictors],
  [1878, platinumStore.platinumArceus],

  [1537, heartGoldAndSoulSilverStore.heartGoldAndSilverSoul],
  [1539, heartGoldAndSoulSilverStore.hsUnleashed],
  [1540, heartGoldAndSoulSilverStore.hsUndaunted],
  [1541, heartGoldAndSoulSilverStore.hsTriumphant],

  [1542, callOfLegendsStore.callOfLegends],

  [1544, blackAndWhiteStore.blackAndWhite],
  [1546, blackAndWhiteStore.blackAndWhiteEmergingPowers],
  [1548, blackAndWhiteStore.blackAndWhiteNobleVictories],
  [1549, blackAndWhiteStore.blackAndWhiteNextDestinies],
  [1889, blackAndWhiteStore.blackAndWhiteDarkExplorers],
  [1552, blackAndWhiteStore.blackAndWhiteDragonsExalted],
  [1553, blackAndWhiteStore.blackAndWhiteDragonVault],
  [1554, blackAndWhiteStore.blackAndWhiteBoundariesCrossed],
  [1555, blackAndWhiteStore.blackAndWhitePlasmaStorm],
  [1556, blackAndWhiteStore.blackAndWhitePlasmaFreeze],
  [1557, blackAndWhiteStore.blackAndWhitePlasmaBlast],
  [1896, blackAndWhiteStore.blackAndWhiteLegendaryTreasures],

  [1561, xyStore.xyKalosStarterSet],
  [1562, xyStore.xy],
  [1564, xyStore.xyFlashfire],
  [1566, xyStore.xyFuriousFists],
  [1568, xyStore.xyPhantomForces],
  [1569, xyStore.xyPrimalClash],
  [1570, xyStore.xyDoubleCrisis],
  [1572, xyStore.xyRoaringSkies],
  [1573, xyStore.xyAncientOrigins],
  [1575, xyStore.xyBREAKthrough],
  [1576, xyStore.xyBREAKpoint],
  [1577, xyStore.xyGenerations],
  [1580, xyStore.xySteamSiege],
  [1586, xyStore.xyEvolutions],
])
