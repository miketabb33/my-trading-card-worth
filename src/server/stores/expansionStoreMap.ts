import * as blackAndWhiteStore from '../expansion-data/blackAndWhiteStore'
import * as blackStarPromotionalStore from '../expansion-data/blackStarPromotionalStore'
import * as callOfLegendsStore from '../expansion-data/callOfLegendsStore'
import * as diamondAndPearlStore from '../expansion-data/diamondAndPearlStore'
import * as eCardStore from '../expansion-data/eCardStore'
import * as exStore from '../expansion-data/exStore'
import * as heartGoldAndSoulSilverStore from '../expansion-data/heartGoldAndSoulSilverStore'
import * as legendaryCollectionStore from '../expansion-data/legendaryCollectionStore'
import * as mcdonaldCollectionStore from '../expansion-data/mcdonaldsCollectionStore'
import * as miscellaneousStore from '../expansion-data/miscellaneousStore'
import * as neoStore from '../expansion-data/neoSeriesStore'
import * as originalStore from '../expansion-data/originalSeriesStore'
import * as platinumStore from '../expansion-data/platinumStore'
import * as popPlayStore from '../expansion-data/popPlayPokemonPrizePackStore'
import * as scarletAndVioletStore from '../expansion-data/scarletAndVioletStore'
import * as sunAndMoonStore from '../expansion-data/sunAndMoonStore'
import * as swordAndShieldStore from '../expansion-data/swordAndShieldStore'
import * as trickOrTradeStore from '../expansion-data/trickOrTradeStore'
import * as xyStore from '../expansion-data/xyStore'
import { ExpansionData } from '../types/ExpansionData'

// Source expansion data from:
// https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_Trading_Card_Game_expansions

export const expansionStoreMap = new Map<number, ExpansionData>([
  [1969, originalStore.baseSetShadowless],
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
  [1579, xyStore.xyFatesCollide],
  [1580, xyStore.xySteamSiege],
  [1586, xyStore.xyEvolutions],

  [1588, sunAndMoonStore.sunAndMoon],
  [1590, sunAndMoonStore.sunAndMoonGuardiansRising],
  [1913, sunAndMoonStore.sunAndMoonBurningShadows],
  [1915, sunAndMoonStore.sunAndMoonShiningLegends],
  [1594, sunAndMoonStore.sunAndMoonCrimsonInvasion],
  [1599, sunAndMoonStore.sunAndMoonUltraPrism],
  [1600, sunAndMoonStore.sunAndMoonForbiddenLight],
  [1603, sunAndMoonStore.sunAndMoonCelestialStorm],
  [1604, sunAndMoonStore.sunAndMoonDragonMajesty],
  [1606, sunAndMoonStore.sunAndMoonLostThunder],
  [1611, sunAndMoonStore.sunAndMoonTeamUp],
  [1612, sunAndMoonStore.sunAndMoonDetectivePikachu],
  [1613, sunAndMoonStore.sunAndMoonUnbrokenBonds],
  [1614, sunAndMoonStore.sunAndMoonUnifiedMinds],
  [1615, sunAndMoonStore.sunAndMoonHiddenFates],
  [1617, sunAndMoonStore.sunAndMoonCosmicEclipse],

  [1623, swordAndShieldStore.swordAndShield],
  [1672, swordAndShieldStore.swordAndShieldRebelClash],
  [2082, swordAndShieldStore.swordAndShieldDarknessAblaze],
  [2084, swordAndShieldStore.swordAndShieldChampionsPath],
  [2107, swordAndShieldStore.swordAndShieldVividVoltage],
  [2126, swordAndShieldStore.swordAndShieldShiningFates],
  [2130, swordAndShieldStore.swordAndShieldBattleStyles],
  [2153, swordAndShieldStore.swordAndShieldChillingReign],
  [2309, swordAndShieldStore.swordAndShieldEvolvingSkies],
  [2310, swordAndShieldStore.swordAndShieldCelebrations],
  [2547, swordAndShieldStore.swordAndShieldFusionStrike],
  [2911, swordAndShieldStore.swordAndShieldBrilliantStars],
  [3007, swordAndShieldStore.swordAndShieldAstralRadiance],
  [3058, swordAndShieldStore.swordAndShieldPokemonGo],
  [3108, swordAndShieldStore.swordAndShieldLostOrigin],
  [3142, swordAndShieldStore.swordAndShieldSilverTempest],
  [3171, swordAndShieldStore.swordAndShieldCrownZenith],

  [3239, scarletAndVioletStore.scarletAndViolet],
  [3316, scarletAndVioletStore.scarletAndVioletPaldeaEvolved],
  [3371, scarletAndVioletStore.scarletAndVioletObsidianFlames],
  [3403, scarletAndVioletStore.scarletAndViolet151],
  [3468, scarletAndVioletStore.scarletAndVioletParadoxRift],
  [3561, scarletAndVioletStore.scarletAndVioletPaldeanFates],
  [3605, scarletAndVioletStore.scarletAndVioletTemporalForces],
  [3674, scarletAndVioletStore.scarletAndVioletTwilightMasquerade],
  [3763, scarletAndVioletStore.scarletAndVioletShroudedFable],
  [3787, scarletAndVioletStore.scarletAndVioletStellarCrown],

  [1474, blackStarPromotionalStore.wizardsBlackStarPromos],
  [1929, blackStarPromotionalStore.nintendoBlackStarPromos],
  [1517, blackStarPromotionalStore.dpBlackStarPromos],
  [1536, blackStarPromotionalStore.hgssBlackStarPromos],
  [1543, blackStarPromotionalStore.bwBlackStarPromos],
  [1558, blackStarPromotionalStore.xyBlackStarPromos],
  [1587, blackStarPromotionalStore.smBlackStarPromos],
  [1618, blackStarPromotionalStore.swshBlackStarPromos],
  [3221, blackStarPromotionalStore.svpBlackStarPromos],

  [1545, mcdonaldCollectionStore.mcdonaldCollection2011],
  [1551, mcdonaldCollectionStore.mcdonaldCollection2012],
  [1565, mcdonaldCollectionStore.mcdonaldCollection2014],
  [1574, mcdonaldCollectionStore.mcdonaldCollection2015],
  [1581, mcdonaldCollectionStore.mcdonaldCollection2016],
  [1591, mcdonaldCollectionStore.mcdonaldCollection2017],
  [1602, mcdonaldCollectionStore.mcdonaldCollection2018],
  [1616, mcdonaldCollectionStore.mcdonaldCollection2019],
  [2139, mcdonaldCollectionStore.mcdonaldCollection2021],
  [3141, mcdonaldCollectionStore.mcdonaldCollection2022],
  [3456, mcdonaldCollectionStore.mcdonaldCollection2023],

  [3138, trickOrTradeStore.trickOrTrade2022],
  [3467, trickOrTradeStore.trickOrTrade2023],

  [1501, popPlayStore.popPlayPokemonPrizePackPopSeries1],
  [1506, popPlayStore.popPlayPokemonPrizePackPopSeries2],
  [1510, popPlayStore.popPlayPokemonPrizePackPopSeries3],
  [1512, popPlayStore.popPlayPokemonPrizePackPopSeries4],
  [1516, popPlayStore.popPlayPokemonPrizePackPopSeries5],
  [1520, popPlayStore.popPlayPokemonPrizePackPopSeries6],
  [1524, popPlayStore.popPlayPokemonPrizePackPopSeries7],
  [1528, popPlayStore.popPlayPokemonPrizePackPopSeries8],
  [1531, popPlayStore.popPlayPokemonPrizePackPopSeries9],
  [3272, popPlayStore.popPlayPokemonPrizePackPlaySeries1],
  [3312, popPlayStore.popPlayPokemonPrizePackPlaySeries2],
  [3471, popPlayStore.popPlayPokemonPrizePackPlaySeries3],
  [3615, popPlayStore.popPlayPokemonPrizePackPlaySeries4],

  [1484, miscellaneousStore.southernIslands],
  [1930, miscellaneousStore.bestOfGame],
  [1928, miscellaneousStore.pokeCardCreatorPack],
  [1535, miscellaneousStore.pokemonRumble],
  [2112, miscellaneousStore.pokemonFutsal],
  [3552, miscellaneousStore.pokemonTradingCardGameClassic],
  [3553, miscellaneousStore.pokemonTradingCardGameClassic],
  [3554, miscellaneousStore.pokemonTradingCardGameClassic],
])
