var sid='';
var selectedAccount='';
var usdFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
var numFormat = new Intl.NumberFormat();
const MEDITATION_HERO_STATS = {
  0: "STR",
  1: "AGI",
  2: "INT",
  3: "WIS",
  4: "LCK",
  5: "VIT",
  6: "END",
  7: "DEX",
  8: "HP",
  9: "MP",
  10: "STAM"
}
const EQUIPMENT_HERO_STATS = {
  1: 'STR',
  2: 'DEX',
  3: 'AGI',
  4: 'VIT',
  5: 'END',
  6: 'INT',
  7: 'WIS',
  8: 'LCK'
}
const MEDITATION_STATUP_TYPES = {
  0: 'primary',
  1: 'secondary',
  2: 'bonus',
  3: 'rarity',
  4: 'health',
  5: 'mana',
  6: 'stamina',
  7: 'primary attunement',
  8: 'secondary attunement'
}
const EGG_NAMES = {
  0: 'Blue Egg',
  1: 'Grey Egg',
  2: 'Green Egg',
  3: 'Yellow Egg',
  4: 'Gold Egg'
}
const EGG_TIERS = {
  0: 'Gaia\'s Favor',
  1: 'Gaia\'s Grace',
  2: 'Gaia\'s Boon'
}
const PROF_BONUS_MIN_SCALAR = {
  'Foraging': {
    'Common': {
      'Efficient Scavenger': 8,
      'Bountiful Haul': 55,
      'Keen Eye': 30,
      'Fortune Seeker': 40,
      'Clutch Collector': 10,
      'Runic Discoveries': 5,
      'Skilled Scavenger': 10,
      'Astute Scavenger': 25,
      'Bonus Bounty': 20,
      'Gaia\'s Chosen': 20,
      'Innate Scavenger': 1
    },
    'Rare': {
      'Efficient Scavenger': 18,
      'Bountiful Haul': 95,
      'Keen Eye': 50,
      'Fortune Seeker': 80,
      'Clutch Collector': 25,
      'Runic Discoveries': 15,
      'Skilled Scavenger': 20,
      'Astute Scavenger': 50,
      'Bonus Bounty': 40,
      'Gaia\'s Chosen': 40,
      'Innate Scavenger': 1
    },
    'Mythic': {
      'Efficient Scavenger': 35,
      'Bountiful Haul': 155,
      'Keen Eye': 95,
      'Fortune Seeker': 160,
      'Clutch Collector': 45,
      'Runic Discoveries': 40,
      'Skilled Scavenger': 35,
      'Astute Scavenger': 100,
      'Bonus Bounty': 70,
      'Gaia\'s Chosen': 70,
      'Innate Scavenger': 1
    }
  },
  'Fishing': {
    'Common': {
      'Efficient Angler': 8,
      'Bountiful Catch': 55,
      'Keen Eye': 30,
      'Fortune Seeker': 40,
      'Clutch Collector': 10,
      'Runic Discoveries': 5,
      'Skilled Angler': 10,
      'Astute Angler': 25,
      'Bonus Bounty': 20,
      'Gaia\'s Chosen': 20,
      'Innate Angler': 1
    },
    'Rare': {
      'Efficient Angler': 18,
      'Bountiful Catch': 95,
      'Keen Eye': 50,
      'Fortune Seeker': 80,
      'Clutch Collector': 25,
      'Runic Discoveries': 15,
      'Skilled Angler': 20,
      'Astute Angler': 50,
      'Bonus Bounty': 40,
      'Gaia\'s Chosen': 40,
      'Innate Angler': 1
    },
    'Mythic': {
      'Efficient Angler': 35,
      'Bountiful Catch': 155,
      'Keen Eye': 95,
      'Fortune Seeker': 160,
      'Clutch Collector': 45,
      'Runic Discoveries': 40,
      'Skilled Angler': 35,
      'Astute Angler': 100,
      'Bonus Bounty': 70,
      'Gaia\'s Chosen': 70,
      'Innate Angler': 1
    }
  },
  'Gardening': {
    'Common': {
      'Efficient Greenskeeper': 8,
      'Bountiful Harvest': 30,
      'Second Chance': 20,
      'Clutch Collector': 15,
      'Runic Discoveries': 20,
      'Skilled Greenskeeper': 10,
      'Astute Greenskeeper': 25,
      'Bonus Bounty': 30,
      'Gaia\'s Chosen': 20,
      'Power Surge': 1,
      'Innate Greenskeeper': 1
    },
    'Rare': {
      'Efficient Greenskeeper': 18,
      'Bountiful Harvest': 50,
      'Second Chance': 50,
      'Clutch Collector': 35,
      'Runic Discoveries': 40,
      'Skilled Greenskeeper': 20,
      'Astute Greenskeeper': 50,
      'Bonus Bounty': 50,
      'Gaia\'s Chosen': 40,
      'Power Surge': 30,
      'Innate Greenskeeper': 1
    },
    'Mythic': {
      'Efficient Greenskeeper': 35,
      'Bountiful Harvest': 80,
      'Second Chance': 80,
      'Clutch Collector': 60,
      'Runic Discoveries': 70,
      'Skilled Greenskeeper': 35,
      'Astute Greenskeeper': 100,
      'Bonus Bounty': 80,
      'Gaia\'s Chosen': 70,
      'Power Surge': 55,
      'Innate Greenskeeper': 1
    }
  }
}
const PROF_BONUS_MAX_SCALAR = {
  'Foraging': {
    'Common': {
      'Efficient Scavenger': 13,
      'Bountiful Haul': 65,
      'Keen Eye': 35,
      'Fortune Seeker': 50,
      'Clutch Collector': 15,
      'Runic Discoveries': 10,
      'Skilled Scavenger': 15,
      'Astute Scavenger': 35,
      'Bonus Bounty': 25,
      'Gaia\'s Chosen': 25,
      'Innate Scavenger': 1
    },
    'Rare': {
      'Efficient Scavenger': 28,
      'Bountiful Haul': 110,
      'Keen Eye': 60,
      'Fortune Seeker': 95,
      'Clutch Collector': 35,
      'Runic Discoveries': 25,
      'Skilled Scavenger': 30,
      'Astute Scavenger': 70,
      'Bonus Bounty': 50,
      'Gaia\'s Chosen': 50,
      'Innate Scavenger': 1
    },
    'Mythic': {
      'Efficient Scavenger': 50,
      'Bountiful Haul': 185,
      'Keen Eye': 110,
      'Fortune Seeker': 180,
      'Clutch Collector': 70,
      'Runic Discoveries': 60,
      'Skilled Scavenger': 50,
      'Astute Scavenger': 130,
      'Bonus Bounty': 90,
      'Gaia\'s Chosen': 90,
      'Innate Scavenger': 1
    }
  },
  'Fishing': {
    'Common': {
      'Efficient Angler': 13,
      'Bountiful Catch': 65,
      'Keen Eye': 35,
      'Fortune Seeker': 50,
      'Clutch Collector': 15,
      'Runic Discoveries': 10,
      'Skilled Angler': 15,
      'Astute Angler': 35,
      'Bonus Bounty': 25,
      'Gaia\'s Chosen': 25,
      'Innate Angler': 1
    },
    'Rare': {
      'Efficient Angler': 28,
      'Bountiful Catch': 110,
      'Keen Eye': 60,
      'Fortune Seeker': 95,
      'Clutch Collector': 35,
      'Runic Discoveries': 25,
      'Skilled Angler': 30,
      'Astute Angler': 70,
      'Bonus Bounty': 50,
      'Gaia\'s Chosen': 50,
      'Innate Angler': 1
    },
    'Mythic': {
      'Efficient Angler': 50,
      'Bountiful Catch': 185,
      'Keen Eye': 110,
      'Fortune Seeker': 180,
      'Clutch Collector': 70,
      'Runic Discoveries': 60,
      'Skilled Angler': 50,
      'Astute Angler': 130,
      'Bonus Bounty': 90,
      'Gaia\'s Chosen': 90,
      'Innate Angler': 1
    }
  },
  'Gardening': {
    'Common': {
      'Efficient Greenskeeper': 13,
      'Bountiful Harvest': 40,
      'Second Chance': 25,
      'Clutch Collector': 20,
      'Runic Discoveries': 25,
      'Skilled Greenskeeper': 15,
      'Astute Greenskeeper': 35,
      'Bonus Bounty': 35,
      'Gaia\'s Chosen': 25,
      'Power Surge': 1,
      'Innate Greenskeeper': 1
    },
    'Rare': {
      'Efficient Greenskeeper': 28,
      'Bountiful Harvest': 65,
      'Second Chance': 60,
      'Clutch Collector': 45,
      'Runic Discoveries': 50,
      'Skilled Greenskeeper': 30,
      'Astute Greenskeeper': 70,
      'Bonus Bounty': 60,
      'Gaia\'s Chosen': 50,
      'Power Surge': 40,
      'Innate Greenskeeper': 1
    },
    'Mythic': {
      'Efficient Greenskeeper': 50,
      'Bountiful Harvest': 100,
      'Second Chance': 100,
      'Clutch Collector': 80,
      'Runic Discoveries': 90,
      'Skilled Greenskeeper': 50,
      'Astute Greenskeeper': 130,
      'Bonus Bounty': 100,
      'Gaia\'s Chosen': 90,
      'Power Surge': 70,
      'Innate Greenskeeper': 1
    }
  }
}
const PROF_BONUS_DESCRIPTIONS = {
  'Foraging': {
    'Unrevealed': 'This pet has not had its gathering bonus rolled yet',
    'Efficient Scavenger': 'Increase experience gained from Foraging Quests by {0}%',
    'Bountiful Haul': 'Increase chance of foraging multiple plants by {0}%',
    'Keen Eye': 'Increase chance of foraging rare plants by {0}%',
    'Fortune Seeker': 'Increase chance of foraging high value plants by {0}%',
    'Clutch Collector': 'Increase chance of finding a GRey Pet Egg by {0}%',
    'Runic Discoveries': 'Increase chance of finding runes by {0}% while foraging',
    'Skilled Scavenger': 'Increase effective Foraging Skill by {0}',
    'Astute Scavenger': 'Increase chance of a Foraging Skill increase by {0}%',
    'Bonus Bounty': 'Gain {0}% chance to receive an extra item roll while foraging',
    'Gaia\'s Chosen': 'Increase chance of finding Gaia\'s Tears by {0}% while foraging',
    'Innate Scavenger': 'Gain the Foraging profession bonus'
  },
  'Fishing': {
    'Unrevealed': 'This pet has not had its gathering bonus rolled yet',
    'Efficient Angler': 'Increase experience gained from Fishing Quests by {0}%',
    'Bountiful Catch': 'Increase chance of catching multiple fish by {0}%',
    'Keen Eye': 'Increase chance of catching rare fish by {0}%',
    'Fortune Seeker': 'Increase chance of catching high value fish by {0}%',
    'Clutch Collector': 'Increase chance of finding a Blue Pet Egg by {0}%',
    'Runic Discoveries': 'Increase chance of finding runes by {0}% while fishing',
    'Skilled Angler': 'Increase effective Fishing Skill by {0}',
    'Astute Angler': 'Increase chance of a Fishing Skill increase by {0}%',
    'Bonus Bounty': 'Gain {0}% chance to receive an extra item roll while fishing',
    'Gaia\'s Chosen': 'Increase chance of finding Gaia\'s Tears by {0}% while fishing',
    'Innate Angler': 'Gain the Fishing profession bonus'
  },
  'Gardening': {
    'Unrevealed': 'This pet has not had its gathering bonus rolled yet',
    'Efficient Greenskeeper': 'Increase experience gained from Gardening Quests by {0}%',
    'Bountiful Harvest': 'Increase chance of harvesting plants by {0}% while gardening',
    'Second Chance': 'Gain {0}% chance to re-roll an unsuccessful gardening item roll',
    'Clutch Collector': 'Increase chance of finding a Green Pet Egg by {0}%',
    'Runic Discoveries': 'Increase chance of finding runes by {0}% while gardening',
    'Skilled Greenskeeper': 'Increase effective Gardening Skill by {0}',
    'Astute Greenskeeper': 'Increase chance of a Gardening Skill increase by {0}%',
    'Bonus Bounty': 'Gain {0}% chance per 5 stamina for an extra gardening plant roll',
    'Gaia\'s Chosen': 'Increase chance of finding Gaia\'s Tears by {0}% while gardening',
    'Power Surge': 'Increase Power Token rewards from gardening by {0}%',
    'Innate Greenskeeper': 'Gain the Gardening profession bonus'
  }
}
const EQUIPMENT_RARITY = {
  0: "Common",
  2: "Rare",
  4: "Mythic",
  10: "Premium Visage",
  11: "Promotional Visage",
  12: "Creator Visage"
}
const WEAPON_TYPES = {
  0: 'None',
  1: 'One-Handed Axe',
  2: 'Two-Handed Axe',
  3: 'Bow',
  4: 'Dagger',
  5: 'Gloves',
  6: 'One-Handed Mace',
  7: 'Two-Handed Mace',
  8: 'One-Handed Spear',
  9: 'Two-Handed Spear',
  10: 'Staff',
  11: 'One-Handed Sword',
  12: 'Two-Handed Sword',
  13: 'Wand'
}
const WEAPON_BONUS_DESCRIPTIONS = {
  1: "Gain {0}% chance to inflict Banish on hit",
  2: "Gain {0}% chance to inflict Bleed on hit",
  3: "Gain {0}% chance to inflict Blind on hit",
  4: "Gain {0}% chance to inflict Burn on hit",
  5: "Gain {0}% chance to inflict Chill on hit",
  6: "Gain {0}% chance to inflict Confuse on hit",
  7: "Gain {0}% chance to inflict Daze on hit",
  8: "Gain {0}% chance to inflict Disarm on hit",
  9: "Gain {0}% chance to inflict Fear on hit",
  10: "Gain {0}% chance to inflict Intimidate on hit",
  11: "Gain {0}% chance to inflict Poison on hit",
  12: "Gain {0}% chance to inflict Pull on hit",
  13: "Gain {0}% chance to inflict Push on hit",
  14: "Gain {0}% chance to inflict Silence on hit",
  15: "Gain {0}% chance to inflict Sleep on hit",
  16: "Gain {0}% chance to inflict Slow on hit",
  17: "Gain {0}% chance to inflict Stun on hit",
  18: "Gain {0}% chance to inflict Taunt on hit",
  19: "Gain {0}% chance to inflict Daze on basic attack when targeting a channeling enemy",
  20: "Increase Block chance by +{0}%",
  21: "Increase Spell Block chance by +{0}%",
  22: "Increase Critical Hit damage multiplier by +{0}",
  23: "Increase Critical Hit chance by +{0}%",
  24: "Critical Hits gain {0}% Lifesteal",
  25: "Gain {0}% Pierce",
  26: "Increase Block damage reduction by {0}%",
  27: "Increase Spell Block damage reduction by {0}%",
  28: "Increase Magical Damage dealt and reduce Healing Potency by {0}% each",
  29: "Increase Healing Potency and reduce Magical Damage dealt by {0}% each",
  30: "Decrease Physical and Magical Defense by {0}% each",
  31: "Decrease Healing Potency by X%",
  32: "Increase Magical Damage by X%",
  33: "Increase Physical Damage by X%",
  34: "Gain X% chance to Retaliate 1 upon receiving damage.",
  35: "Gain X% chance to Retaliate 1 upon receiving physical damage.",
  36: "Gain X% chance to Retaliate 1 upon receiving magical damage.",
  37: "Critical Hits gain X% chance to inflict Bleed",
  38: "Critical Hits gain X% chance to inflict Poison",
  39: "Critical Hits gain X% chance to inflict Daze",
  40: "Critical Heals gain X% chance to Cleanse",
  41: "Increase Critical Heal chance by +X%"
}
const ACCESSORY_TYPES = {
  0: 'None',
  1: 'Accessory',
  2: 'Shield',
  3: 'Focus'
}
const ACCESSORY_BONUS_DESCRIPTIONS = {
  1: "Increase Physical Accuracy by +{0}%",
  2: "Increase Magical Accuracy by +{0}%",
  3: "Increase Block chance by +{0}%",
  4: "Increase Spell Block chance by +{0}%",
  5: "Increase Speed by {0}%",
  6: "Increase Evasion by {0}%",
  7: "Increase Status Effect Resistance by +{0}%",
  8: "Increase Banish Resistance by +{0}%",
  9: "Increase Bleed Resistance by +{0}%",
  10: "Increase Blind Resistance by +{0}%",
  11: "Increase Burn Resistance by +{0}%",
  12: "Increase Chill Resistance by +{0}%",
  13: "Increase Confuse Resistance by +{0}%",
  14: "Increase Daze Resistance by +{0}%",
  15: "Increase Disarm Resistance by +{0}%",
  16: "Increase Fear Resistance by +{0}%",
  17: "Increase Intimidate Resistance by +{0}%",
  18: "Increase Poison Resistance by +{0}%",
  19: "Increase Pull Resistance by +{0}%",
  20: "Increase Push Resistance by +{0}%",
  21: "Increase Silence Resistance by +{0}%",
  22: "Increase Sleep Resistance by +{0}%",
  23: "Increase Slow Resistance by +{0}%",
  24: "Increase Stun Resistance by +{0}%",
  25: "Increase Taunt Resistance by +{0}%",
  26: "Increase Critical Hit Multiplier by +{0}",
  27: "Increase Physical Defense by +{0}%",
  28: "Increase Magical Defense by +{0}%",
  29: "Decrease Physical Accuracy by -{0}%",
  30: "Decrease Magical Accuracy by -{0}%",
  31: "Increase Physical Damage by +{0}%",
  32: "Increase Magical Damage by +{0}%",
  33: "Gain +{0}% Riposte",
  230: "Add +{0} to Duel Score when Dueling",
  231: "Gain a roll for +{0}-{1} added to Duel Score when Dueling",
  232: "Gain +{0}% chance for matching background to appear when defending Duel champion",
  233: "Add +{0} to Duel Score when defending Duel champion",
  234: "Gain a roll for +{0}-{1} added to Duel Score when defending Duel champion"
}
const OFFHAND_BONUS_DESCRIPTIONS = {
  1: "Increase Block chance by +{0}%",
  2: "Increase Block damage reduction by +{0}%",
  3: "Increase Spell Block chance by +{0}%",
  4: "Increase Spell Block damage reduction by +{0}%",
  5: "Gain +{0}% Riposte",
  6: "Increase P.DEF by X",
  7: "Increase M.DEF by X",
  8: "Increase Pull Resistance by +X%",
  9: "Increase Push Resistance by +X%"
}
const ARMOR_TYPES = {
  0: 'None',
  1: 'Light',
  2: 'Medium',
  3: 'Heavy'
}
const ARMOR_BONUS_DESCRIPTIONS = {
  1: "Increase Block chance by +{0}%",
  2: "Increase Spell Block chance by +{0}%",
  3: "Increase Block damage reduction by {0}%",
  4: "Increase Spell Block damage reduction by {0}%",
  5: "Increase Physical Accuracy by +{0}%",
  6: "Increase Magical Accuracy by +{0}%",
  7: "Increase Speed by {0}%",
  8: "Increase Evasion by {0}%",
  9: "Increase Status Effect Resistance by +{0}%",
  10: "Increase Banish Resistance by +{0}%",
  11: "Increase Bleed Resistance by +{0}%",
  12: "Increase Blind Resistance by +{0}%",
  13: "Increase Burn Resistance by +{0}%",
  14: "Increase Chill Resistance by +{0}%",
  15: "Increase Confuse Resistance by +{0}%",
  16: "Increase Daze Resistance by +{0}%",
  17: "Increase Disarm Resistance by +{0}%",
  18: "Increase Fear Resistance by +{0}%",
  19: "Increase Intimidate Resistance by +{0}%",
  20: "Increase Poison Resistance by +{0}%",
  21: "Increase Pull Resistance by +{0}%",
  22: "Increase Push Resistance by +{0}%",
  23: "Increase Silence Resistance by +{0}%",
  24: "Increase Sleep Resistance by +{0}%",
  25: "Increase Slow Resistance by +{0}%",
  26: "Increase Stun Resistance by +{0}%",
  27: "Increase Taunt Resistance by +{0}%",
  28: "Increase Critical Hit Multiplier by +{0}",
  29: "Increase Physical Defense by +{0}%",
  30: "Increase Magical Defense by +{0}%",
  31: "Decrease Physical Accuracy by -{0}%",
  32: "Decrease Magical Accuracy by -{0}%",
  33: "Increase Physical Damage by +{0}%",
  34: "Increase Magical Damage by +{0}%",
  35: "Gain +{0}% Riposte",
  36: "Double the bonuses above this bonus when equipped with {0} accessory.",
  37: "Double the bonuses above this bonus when equipped with {0} off-hand.",
  38: "Double the bonuses above this bonus when equipped with {0} 1H Sword.",
  39: "Gain {0}% chance to Retaliate 1 upon receiving physical damage.",
  40: "Gain {0} Initiative after each successful Block",
  41: "Increase Recovery chance by +{0}%",
  42: "Double the bonuses above this bonus when equipped with {0} 2H Sword.",
  43: "Double the bonuses above this bonus when equipped with {0} 1H Axe.",
  44: "Double the bonuses above this bonus when equipped with {0} 2H Axe.",
  45: "Double the bonuses above this bonus when equipped with {0} 1H Mace.",
  46: "Double the bonuses above this bonus when equipped with {0} 2H Mace.",
  47: "Double the bonuses above this bonus when equipped with {0} 1H Spear.",
  48: "Double the bonuses above this bonus when equipped with {0} 2H Spear.",
  49: "Double the bonuses above this bonus when equipped with {0} Wand.",
  50: "Double the bonuses above this bonus when equipped with {0} Staff.",
  51: "Double the bonuses above this bonus when equipped with {0} Gloves.",
  52: "Double the bonuses above this bonus when equipped with {0} Bow.",
  53: "Double the bonuses above this bonus when equipped with {0} Dagger.",
  54: "Decrease Speed by {0}%",
  55:	"Decrease Healing Potency by X%",
  56:	"Critical Hits gain X% Lifesteal",
  57:	"Increase Critical Hit chance by +X%",
  58: "Reduce Channeling times by X%"
};
const EQUIP_INDEX_ICONS = {
  6: 'pet-active.png',
  7: 'weapon_1hsword.png',
  8: 'weapon_1hsword.png',
  9: 'weapon_1hswordy.png',
  10: 'weapon_1hswordy.png',
  11: 'offhand_shield.png',
  12: 'offhand_shield.png',
  13: 'offhand_shieldy.png',
  14: 'offhand_shieldy.png',
  15: 'armor_light.png',
  16: 'armor_lighty.png',
  17: 'accessory.png',
  18: 'accessoryy.png'
}
const EQUIP_INDEX_BASE_TYPES = {
  6: 'pet',
  7: 'weapon',
  8: 'weapon',
  9: 'weapon',
  10: 'weapon',
  11: 'accessory',
  12: 'accessory',
  13: 'accessory',
  14: 'accessory',
  15: 'armor',
  16: 'armor',
  17: 'accessory',
  18: 'accessory'
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  return a.toUTCString();
}
function dateConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + ' ' + date + ' ' + year ;
  return time;
}
function copyTitle(event) {
  var title = event.target.getAttribute('title');
  navigator.clipboard.writeText(title);
}
function whoDis(address, event) {
  // look for DFK profile name of address
  query = `query {
    profiles(
        where: { id: "${address}" } 
    ) 
    {
        name
    }
  }`
  graph_uri = "https://api.defikingdoms.com/graphql"
  // lookup summon history
  var request = new XMLHttpRequest();
  request.open('POST', graph_uri, true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.onload = function() {
    if (!request.status || (request.status >= 400)) {
      alert('Failed to load profile.');
    } else {
      var resp = JSON.parse(request.responseText);
      if ('error' in resp) {
        alert(resp['error']);
      } else {
        if (resp['data']['profiles'][0] != undefined) {
          // replace contents of what was clicked with player name
          var srcElm = event.target;
          if (srcElm != null) {
            srcElm.innerHTML = resp['data']['profiles'][0]['name'];
          } else {
            pn = document.getElementById('playerName');
            pn.innerHTML = resp['data']['profiles'][0]['name'];
          }
        } else {
          console.log(`no profile found for address: ${address}`);
        }
      }
    }
  };
  request.send(JSON.stringify({ 'query': query }));
}
function petDescription(data) {
  return `<div>${data['data']['name']} in ${data['data']['background']} pool: ${data['data']['pool']}</div><div>${data['data']['rarity']} with ${data['data']['bonuscount']} bonuses</div><div>Gathering Bonus: ${data['data']['gatheringbonusrarity']} ${data['data']['gatheringbonus']} amount: ${data['data']['gatheringbonusscalar']}</div>`
}
function loadPet(petId) {
  // load basic Pet Metadata
  var request = new XMLHttpRequest();
  request.open('GET', `https://pets.defikingdoms.com/token/${petId}`, true);
  request.onload = function() {
    if (!request.status || (request.status >= 400)) {
      console.log('Failed to load pet meta data.');
    } else {
      var resp = JSON.parse(request.responseText);
      if ('error' in resp) {
        console.log(resp['error']);
      } else {
        var pid = resp['rawData']['id']
        petElm = document.getElementById(`petData_${pid}`);
        petData = petDescription(resp);
        petElm.innerHTML = petData;
      }
    }
  };
  request.send();
}
function displayPet(data) {
  var petdata = data['data']
  var bgElm = document.getElementById('petBgAnimation');
  var fgElm = document.getElementById('petFgAnimation');
  switch (petdata['background']) {
    case 'Adelyn Side Street':
      bgFrames = 0;
      fgFrames = 0;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/townbg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/townfg.png)';
      break;
    case 'Reyalin Mountain Pass':
      bgFrames = 0;
      fgFrames = 7;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/cliffbg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/clifffg.png)';
      break;
    case 'Haywood Farmstead':
      bgFrames = 0;
      fgFrames = 12;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/farmbg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/farmfg.png)';
      break;
    case 'Forest Trail':
      bgFrames = 5;
      fgFrames = 7;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/forestbg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/forestfg.png)';
      break;
    case 'Inner Grove':
      bgFrames = 0;
      fgFrames = 13;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/grovebg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/grovefg.png)';
      break;
    case 'Vithraven Outskirts':
      bgFrames = 0;
      fgFrames = 0;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/icebg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/icefg.png)';
      break;
    case 'Path of Fire':
      bgFrames = 4;
      fgFrames = 4;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/lavabg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/lavafg.png)';
      break;
    case 'Vuhlmira Ruins':
      bgFrames = 10;
      fgFrames = 8;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/skycastlebg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/skycastlefg.png)';
      break;
    case 'Swamp of Eoxis':
      bgFrames = 0;
      fgFrames = 0;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/swampbg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/swampfg.png)';
      break;
    case 'Bloater Falls':
      bgFrames = 4;
      fgFrames = 0;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/waterfallbg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/waterfallfg.png)';
      break;
    default:
      bgFrames = 0;
      fgFrames = 0;
      bgElm.style.backgroundImage = `url(/static/images/pet-backgrounds/plainsbg.png)`;
      fgElm.style.backgroundImage = 'url(/static/images/pet-backgrounds/plainsfg.png)';
  }
  if (bgFrames > 0) {
    bgElm.style.animation = `playpetbg${bgFrames} 3.5s steps(${bgFrames}) infinite`;
  }
  if (fgFrames > 0) {
    fgElm.style.animation = `playpetbg${fgFrames} 3.5s steps(${fgFrames}) infinite`;
  }
  var petElm = document.getElementById('petAnimation');
  petElm.style.backgroundImage = `url(${petdata['animation']})`;
  var nameElm = document.getElementById('petName');
  nameElm.innerHTML = data['name'];
  var genElm = document.getElementById('petGen');
  genElm.innerHTML = `Pool: ${petdata['pool']}`;
  var elementElm = document.getElementById('petElement');
  elementElm.src = `/static/images/pet-${petdata['element'].toLowerCase()}.png`;
  var rarityElm = document.getElementById('petRarity');
  rarityElm.src = `/static/images/rarity-pet-${petdata['rarity'].toLowerCase()}.png`;
  if (petdata['rarity'] == 'Mythic') {
    var contElm = document.getElementById('petContainer');
    var mythicScreen = document.createElement('div');
    mythicScreen.style.position = 'absolute';
    mythicScreen.style.width = '360px';
    mythicScreen.style.height = '360px';
    mythicScreen.classList = 'mythic';
    contElm.appendChild(mythicScreen);
  }
  addBonus(`gathering-${petdata['gatheringbonustype'].toLowerCase()}.png`, petdata['gatheringbonusrarity']);
  if (petdata['craftingbonus'] != 'None') {
    addBonus(`crafting-${petdata['craftingbonustype'].toLowerCase()}.png`, petdata['craftingbonusrarity']);
  }
  if (petdata['combatbonus'] != 'None') {
    addBonus('combat.png', petdata['combatbonusrarity']);
  }
  var jobsElm = document.getElementById('petJobs');
  scalarRange = PROF_BONUS_MAX_SCALAR[petdata['gatheringbonustype']][petdata['gatheringbonusrarity']][petdata['gatheringbonus']] - PROF_BONUS_MIN_SCALAR[petdata['gatheringbonustype']][petdata['gatheringbonusrarity']][petdata['gatheringbonus']];
  scalarPercentOfRange = (petdata['gatheringbonusscalar'] - PROF_BONUS_MIN_SCALAR[petdata['gatheringbonustype']][petdata['gatheringbonusrarity']][petdata['gatheringbonus']]) / scalarRange * 100;
  jobsElm.innerHTML = petdata['gatheringbonus'];
  jobsElm.setAttribute('data-title', (PROF_BONUS_DESCRIPTIONS[petdata['gatheringbonustype']][petdata['gatheringbonus']]).replace('{0}', petdata['gatheringbonusscalar']));
  var valueElm = document.getElementById('scalarValueBar');
  valueElm.style.width = `${scalarPercentOfRange}%`;
  valueElm.innerHTML = petdata['gatheringbonusscalar'];
  scElm = document.getElementById('scalarContainer');
  scElm.setAttribute('data-title', `Bonus value ${petdata['gatheringbonusscalar']} in range ${PROF_BONUS_MIN_SCALAR[petdata['gatheringbonustype']][petdata['gatheringbonusrarity']][petdata['gatheringbonus']]} to ${PROF_BONUS_MAX_SCALAR[petdata['gatheringbonustype']][petdata['gatheringbonusrarity']][petdata['gatheringbonus']]}`);
}

function loadEquipment(equipmentCategory, itemId, typeProperty, equipmentPath) {
  // look for equipment details
  query = `query {
    ${equipmentCategory}(
        where: { id: "${itemId}" } 
    ) 
    {
        ${typeProperty}
        craftedBy
        displayId
        rarity
        dye1
        dye2
    }
  }`
  graph_uri = "https://api.defikingdoms.com/graphql"
  var request = new XMLHttpRequest();
  request.open('POST', graph_uri, true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.onload = function() {
    if (!request.status || (request.status >= 400)) {
      alert('Failed to load equipment details.');
    } else {
      var resp = JSON.parse(request.responseText);
      if ('error' in resp) {
        alert(resp['error']);
      } else {
        if (resp['data'][equipmentCategory][0] != undefined) {
          equipmentType = resp['data'][equipmentCategory][0][typeProperty];
          displayId = resp['data'][equipmentCategory][0]['displayId'];
          pn = document.getElementById(`equipmentImage_${itemId}`);
          pn.setAttribute('src', `https://defi-kingdoms.b-cdn.net/art-assets/equipment/${equipmentPath}/${equipmentType}-${displayId}.png`);
          pd = document.getElementById(`equipmentData_${itemId}`);
          pd.innerHTML = EQUIPMENT_RARITY[resp['data'][equipmentCategory][0]['rarity']];
        } else {
          console.log(`Equipment not found: ${itemId}`);
        }
      }
    }
  };
  request.send(JSON.stringify({ 'query': query }));
}
function docHeight() {
  var body = document.body,
  html = document.documentElement;

  return Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );
}
function docWidth() {
  var body = document.body,
  html = document.documentElement;

  return Math.max( body.scrollWidth, body.offsetWidth, 
    html.clientWidth, html.scrollWidth, html.offsetWidth );
}
function showWindow(winId) {
  var maskHeight = docHeight();
  var maskWidth = docWidth();
  var maskElm = document.getElementById('mask');
  maskElm.style.width = maskWidth;
  maskElm.style.height = maskHeight;
  maskElm.style.display = 'block';
  winElm = document.getElementById(winId);
  let winH = window.innerHeight;
  let winW = window.innerWidth;
  winElm.style.display = 'block';
  winElm.style.top = (winH/2-winElm.offsetHeight/2) + window.scrollY;
  winElm.style.left = (winW/2)-(winElm.offsetWidth/2);
}
function hideWindow(winId) {
  maskElm = document.getElementById('mask');
  maskElm.style.display = 'none';
  winElm = document.getElementById(winId);
  winElm.style.display = 'none';
}
function getQueryVar(qsvar) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == qsvar) {
      return pair[1];
    }
  }
  return -1;
}
function getCookie(cName, defaultValue) {
  if (document.cookie.length>0) {
    let dc = decodeURIComponent(document.cookie);
    cStart = dc.indexOf(cName + "=");
    if (cStart != -1) {
        cStart = cStart + cName.length+1;
        cEnd = dc.indexOf(";",cStart);
        if (cEnd == -1) cEnd = dc.length;
        return dc.substring(cStart,cEnd);
    } else {
      return defaultValue;
    }
  }
  return defaultValue;
}
function setCookie(cName, value, expireDays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expireDays);
    document.cookie=cName + "=" + value+((expireDays==null) ? "" : ";expires="+exdate.toUTCString()) + ";path=/";
}

async function isConnected() {
  const accounts = await ethereum.request({method: 'eth_accounts'});
  if (accounts.length) {
    console.log(`You're connected to: ${accounts[0]}`);
    handleAccountsChanged(accounts);
    return true;
  } else {
    console.log("Wallet is not connected");
    return false;
  }
}
/* To connect using MetaMask */
async function connect() {
  if (window.ethereum) {
    console.log("requesting wallet connection");
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          console.log('connection rejected');
        } else {
          console.error(err);
        }
      });
  }
}

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log('unlock and/or connect wallet');
  } else if (accounts[0] !== selectedAccount) {
    selectedAccount = accounts[0];
    sid = getCookie(`sid-${selectedAccount}`, '');
    setCookie('selectedAccount', selectedAccount, 180);
    console.log(`Wallet: ${selectedAccount}`);
    var addr = selectedAccount.substring(0, 6) + '...' + selectedAccount.substring(38, 42);
    document.getElementById("member").innerHTML = addr;
    document.getElementById('connectWallet').style.display = 'none';
    document.getElementById('loginButton').style.display = 'block';
    if (sid != '') {
      login();
    }
    refreshLists();
  }
}
function handleAuth(wAddress, signature) {
  var request = new XMLHttpRequest();
  request.open('GET', `/auth?account=${wAddress}&signature=${signature}`, true);
  console.log(`loading /auth?account=${wAddress}&signature=${signature}`);
  request.onload = function() {
    console.log('load completed');
    if (!request.status || (request.status >= 400)) {
      alert('authentication failed.');
    } else {
      var resp = JSON.parse(request.responseText);
      console.log('loaded session '+resp['sid']);
      sid = resp['sid'];
      setCookie(`sid-${selectedAccount}`, sid, 180);
      setCookie('selectedAccount', selectedAccount, 180);
      document.getElementById('loginButton').style.display = 'none';
      document.getElementById('logoutButton').style.display = 'block';
      location.reload();
    }
  };
  request.send();
}
function handleLoginSignature(nonce) {
  window.web3 = new Web3(window.ethereum);
  const wAddress = selectedAccount;
  web3.eth.personal.sign(
    web3.utils.utf8ToHex(`DFK History login uses no transaction or gas fees.\n\nClick Sign to verify you own this wallet and login.\n\nIf you have cookies enabled, your session can persist for up to 6 months or until you logout.\n\nnonce: ${nonce}`),
    wAddress,
    (err, signature) => {
      if (err) {
        console.log(`error: ${err.message}`);
        return;
      }
      return handleAuth(wAddress, signature);
    }
  );
}
async function login(sign=false) {
  if (!isConnected()) {
    alert('you need to connect a wallet first!');
    return;
  }
  const wAddress = selectedAccount;
  var request = new XMLHttpRequest();
  request.open('GET', `/login?account=${wAddress}&sid=${sid}`, true);
  console.log(`loading: /login?account=${wAddress}&sid=${sid}`);
  request.onload = function() {
    console.log('load completed');
    if (!request.status || (request.status >= 400)) {
      alert('Failed to login.');
    } else {
      var resp = JSON.parse(request.responseText);
      if ('sid' in resp) {
        sid = resp['sid']
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
        refreshLists();
        return;
      }
      if ('nonce' in resp && sign) {
        console.log(`loaded nonce ${resp['nonce']}`);
        handleLoginSignature(resp['nonce']);
      }
      if ('error' in resp) {
        alert(resp['error']);
      }
    }
  };
  request.send();
}
async function logout() {
  if (!isConnected()) {
    alert('you need to connect a wallet first!');
    return;
  }
  const wAddress = selectedAccount;
  var request = new XMLHttpRequest();
  request.open('GET', `/logout?account=${wAddress}&sid=${sid}`, true);
  console.log(`loading: /logout?account=${wAddress}&sid=${sid}`);
  request.onload = function() {
    console.log('load completed');
    if (!request.status || (request.status >= 400)) {
      alert('Failed to logout, server error.');
    } else {
      var resp = JSON.parse(request.responseText);
      if (resp['result'].indexOf("Error:") > -1) {
        alert(resp['result']);
      } else {
        sid = '';
        setCookie(`sid-${selectedAccount}`,'',-1);
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
        location.reload();
      }
    }
  };
  request.send();
}
function resetConnection() {
  document.getElementById("member").innerHTML = '';
  document.getElementById('connectWallet').style.display = 'block';
  document.getElementById('loginButton').style.display = 'none';
  document.getElementById('logoutButton').style.display = 'none';
}

const HARMONY_TOKENS = {
  '0x0000000000000000000000000000000000000000': 'none',
  '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F': 'Jewel',
  '0xA9cE83507D872C5e1273E745aBcfDa849DAA654F': 'xJewels',
  '0x985458E523dB3d53125813eD68c274899e9DfAb4': '1USDC',
  '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a': 'ONE',
  '0xb12c13e66AdE1F72f71834f2FC5082Db8C091358': 'wAVAX',
  '0x53BA62dDD5a9A6B6d97C7a496D7832D13A9218c4': 'rAVAX',
  '0xDA7fE71960cd1C19E1b86D6929efD36058F60a03': 'wLumen',
  '0x95CE547D730519A90dEF30d647F37D9E5359B6Ae': 'wLUNA',
  '0xFbdd194376de19a88118e84E279b977f165d01b8': 'wMATIC',
  '0x9b68BF4bF89c115c721105eaf6BD5164aFcc51E4': 'Freyala',
  '0x7BF379FcB16b4a6F648371cD72D9D443EF24168F': 'Amethyst',
  '0xD74433B187Cf0ba998Ad9Be3486B929c76815215': 'Artemis',
  '0x3cebA57a1AA15A35a4A29a9E067D4AE441dE779F': 'Babymis',
  '0xCf1709Ad76A79d5a60210F23e81cE2460542A836': 'Tranquil',
  '0xB4aA8c8e555b3A2F1BFd04234FF803C011760E59': 'xTranq',
  '0xB55106308974CEbe299A0f0505435C47b404b9a6': 'Eden',
  '0x0159ED2E06DDCD46a25E74eb8e159Ce666B28687': 'FOX',
  '0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE': 'RVRS',
  '0x17fDEdda058d43fF1615cdb72a40Ce8704C2479A': '1SUPERBID',
  '0x44aFdBe2Cb42cc18759159f7E383afb0Ca8E57aD': 'SmugDoge',
  '0xBCF532871415Bc6e3D147d777C6ad3e68E50cd92': 'PartyHat',
  '0x7ca9C1D0bb11F1b7C31ee5538D7a75aAF2d8E2FC': 'CryptoPigs',
  '0x8Eb03202275bD598AdC23678008eF88655544910': 'Radiant',
  '0x5903720f0132E8bd48530010d9b3192B25F51D8e': 'PASTA',
  '0x3E018675c0Ef63eB361b9EF4bfEa3A3294C74C7b': 'KuroShiba',
  '0xd009b07B4a65CC769379875Edc279961D710362d': 'RAIN',
  '0x1e05C8B69e4128949FcEf16811a819eF2f55D33E': 'SONIC',
  '0x224e64ec1BDce3870a6a6c777eDd450454068FEC': 'wUST',
  '0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f': '1USDT',
  '0xE176EBE47d621b984a73036B9DA5d834411ef734': 'Binance USD',
  '0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0': 'bscBNB',
  '0x0aB43550A6915F9f67d0c454C2E90385E6497EaA': 'bscBUSD',
  '0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa': 'bscUSDC',
  '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d': 'MAI',
  '0x6983D1E6DEf3690C4d616b13597A09e6193EA013': '1ETH',
  '0x3095c7557bCb296ccc6e363DE01b760bA031F2d9': 'wBTC',
  '0xdc54046c0451f9269FEe1840aeC808D36015697d': '1BTC',
  '0x735aBE48e8782948a37C7765ECb76b98CdE97B0F': 'Fantom',
  '0x39aB439897380eD10558666C4377fACB0322Ad48': '1FTM',
  '0x14A7B318fED66FfDcc80C1517C172c13852865De': '1AXS',
  '0x3a4EDcf3312f44EF027acfd8c21382a5259936e7': 'DFK Gold',
  '0x24eA0D436d3c2602fbfEfBe6a16bBc304C963D04': 'Gaia\'s Tears',
  '0x66F5BfD910cd83d3766c4B39d13730C911b2D286': 'Shvas Rune',
  '0x8F655142104478724bbC72664042EA09EBbF7B38': 'Moksha Rune',
  '0x95d02C1Dc58F05A015275eB49E107137D9Ee81Dc': 'Grey Pet Egg',
  '0x6d605303e9Ac53C59A3Da1ecE36C9660c7A71da5': 'Green Pet Egg',
  '0x9678518e04Fe02FB30b55e2D0e554E26306d0892': 'Blue Pet Egg',
  '0x3dB1fd0Ad479A46216919758144FD15A21C3e93c': 'Yellow Pet Egg',
  '0x9edb3Da18be4B03857f3d39F83e5C6AAD67bc148': 'Golden Egg',
  '0x6e1bC01Cc52D165B357c42042cF608159A2B81c1': 'Ambertaffy',
  '0x68EA4640C5ce6cC0c9A1F17B7b882cB1cBEACcd7': 'Darkweed',
  '0x600541aD6Ce0a8b5dae68f086D46361534D20E80': 'Goldvein',
  '0x043F9bd9Bb17dFc90dE3D416422695Dd8fa44486': 'Ragweed',
  '0x094243DfABfBB3E6F71814618ace53f07362a84c': 'Redleaf',
  '0x6B10Ad6E3b99090De20bF9f95F960addC35eF3E2': 'Rockroot',
  '0xCdfFe898E687E941b124dfB7d24983266492eF1d': 'SwiftThistle',
  '0x78aED65A2Cc40C7D8B0dF1554Da60b38AD351432': 'Bloater',
  '0xe4Cfee5bF05CeF3418DA74CFB89727D8E4fEE9FA': 'Ironscale',
  '0x8Bf4A0888451C6b5412bCaD3D9dA3DCf5c6CA7BE': 'Lanterneye',
  '0xc5891912718ccFFcC9732D1942cCD98d5934C2e1': 'Redgill',
  '0xb80A07e13240C31ec6dc0B5D72Af79d461dA3A70': 'Sailfish',
  '0x372CaF681353758f985597A35266f7b330a2A44D': 'Shimmerskin',
  '0x2493cfDAcc0f9c07240B5B1C4BE08c62b8eEff69': 'Silverfin',
  '0xAC5c49Ff7E813dE1947DC74bbb1720c353079ac9': 'Blue Stem',
  '0xc0214b37FCD01511E6283Af5423CF24C96BB9808': 'Milkweed',
  '0x19B9F05cdE7A61ab7aae5b0ed91aA62FF51CF881': 'Spiderfruit',
  '0x17f3B5240C4A71a3BBF379710f6fA66B9b51f224': 'Bounty Hero Achievement',
  '0x0405f1b828C7C9462877cC70A9f266887FF55adA': 'DFK Raffle Tix',
  '0x909EF175d58d0e17d3Ceb005EeCF24C1E5C6F390': 'Eternal Story Page',
  '0x2789F04d22a845dC854145d3c289240517f2BcF0': 'Health Vial',
  '0x87361363A75c9A6303ce813D0B2656c34B68FF52': 'Full Health Potion',
  '0x19b020001AB0C12Ffa93e1FDeF90c7C37C8C71ef': 'Mana Vial',
  '0xDc2C698aF26Ff935cD1c50Eef3a4A933C62AF18D': 'Full Mana Potion',
  '0x959ba19508827d1ed2333B1b503Bd5ab006C710e': 'Stamina Vial',
  '0xA1f8b0E88c51a45E152934686270DDF4E3356278': 'Anti-poison Potion',
  '0x1771dEc8D9A29F30d82443dE0a69e7b6824e2F53': 'Anti-blinding Potion',
  '0x7e120334D9AFFc0982719A4eacC045F78BF41C68': 'Magic Resistance Potion',
  '0xFb03c364969a0bB572Ce62b8Cd616A7DDEb4c09A': 'Toughness Potion',
  '0x872dD1595544CE22ad1e0174449C7ECE6F0bb01b': 'Switftness Potion',
  '0x27dC6AaaD95580EdF25F8B9676f1B984e09e413d': 'atonement-crystal',
  '0x1f3F655079b70190cb79cE5bc5AE5F19dAf2A6Cf': 'atonement-crystal-lesser',
  '0x17f3B5240C4A71a3BBF379710f6fA66B9b51f224': 'atonement-crystal-greater',
  '0xaB464901AFBc61bAC440a97Fa568aC42885Da58B': 'might-crystal-lesser',
  '0xb368f69bE6eDa74700763672AEB2Ae63f3d20AE6': 'might-crystal',
  '0xdFA5aE156AD4590A0061E9c4E8cc5bd60bc775c7': 'might-crystal-greater',
  '0x39927A2CEE5580d63A163bc402946C7600300373': 'finesse-crystal-lesser',
  '0xc6A58eFc320A7aFDB1cD662eaf6de10Ee17103F2': 'finesse-crystal',
  '0xd1f789f6f8a3ee3fb94adBE3e82f43AAb51759Ee': 'finesse-crystal-greater',
  '0xf5c26F2F34E9245C3A9ea0B0e7Ea7B33E6404Da0': 'swiftness-crystal-lesser',
  '0x5d7f20e3B0f1406Bf038175218eA7e9B4838908c': 'swiftness-crystal',
  '0x1e38e63227D52CBaDA2f0c11bE04feD64154ea37': 'swiftness-crystal-greater',
  '0x0d8403E47445DB9E316E36F476dacD5827220Bdd': 'vigor-crystal-lesser',
  '0xBbA50bD111DC586Fd1f2B1476B6eC505800A3FD0': 'vigor-crystal',
  '0x5292dbce7eC2e10dd500984A163A5aE8abA585Ce': 'vigorcrystal-greater',
  '0x3017609B9A59B77B708D783835B6fF94a3D9E337': 'fortitude-crystal-lesser',
  '0x603919AEB55EB13F9CDE94274fC54ab2Bd2DecE7': 'fortitude-crystal',
  '0xFE41BFf925eD88f688332b12746ef1Da68FD4CF2': 'fortitude-crystal-greater',
  '0x17ff2016c9ecCFBF4Fc4DA6EF95Fe646D2c9104F': 'wit-crystal-lesser',
  '0x3619fc2386FbBC19DDC39d29A72457e758CFAD69': 'wit-crystal',
  '0xbaAb8dB69a2FdC0b88B2B3F6F75Fa8899680c43B': 'wit-crystal-greater',
  '0xc63b76f710e9973b8989678eb16234CfADc8D9DB': 'insight-crystal-lesser',
  '0x117E60775584CdfA4f414E22b075F31cC9c3207C': 'insight-crystal',
  '0x90454DbF13846CF960abc0F583c319B06aB3F280': 'insight-crystal-greater',
  '0x13AF184aEA970Fe79E3BB7A1B0B156B195fB1f40': 'fortune-crystal-lesser',
  '0x6D777C64f0320d8A5b31BE0FdeB694007Fc3ed45': 'fortune-crystal',
  '0x2bC1112337B90bF8c5b9422bC1e98193a9C3d1f4': 'fortune-crystal-greater',
  '0xa509c34306AdF6168268A213Cc47D336630bf101': 'chaos-crystal-lesser',
  '0x45B53E55b5c0A10fdd4fE2079a562d5702F3A033': 'chaos-crystal',
  '0x423bbec25e4888967baeDB7B4EC5b0465Fa3B87D': 'chaos-crystal-greater',
  '0xe4E7C0c693d8A7FC159776a993495378705464A7': 'might-stone-lesser',
  '0x6382781FE94CAadC71027c0457c9CbEff06e204c': 'might-stone',
  '0xE7F6ea1cE7BbEbC9F2Cf080010dd938d2D8D8B1b': 'might-stone',
  '0x2bc05bf05E273a2276F19a8Bd6738e742A5685b3': 'might-stone-greater',
  '0xbb5614D466b77d50DdEd994892DFe6F0ACA4eEbb': 'finesse-stone-lesser',
  '0xD0B689Cb5DE0c15792Aa456C89D64038C1F2EedC': 'finesse-stone',
  '0x20f10ef23Cdc11Fa55E6B3703d88f19A7B345D15': 'finesse-stone-greater',
  '0xd9A8abC0Ce1ADC23F1c1813986c9a9C21C9e7510': 'swiftness-stone-lesser',
  '0x08f362517aD4119d93bBCd20825c2E4119abB495': 'swiftness-stone',
  '0xA1a56D20e4ba3fd2FB91c80f611ECa43c1311Afe': 'swiftness-stone-greater',
  '0xB00CbF5Cd5e7b321436C2D3d8078773522D2F073': 'vigor-stone-lesser',
  '0x9df75917aC9747B4A70fa033E4b0182d85B62857': 'vigor-stone',
  '0x00a2E2F8Feb81FDB7205992B5Abd2a801b419394': 'vigor-stone-greater',
  '0x1f57eb682377f5Ad6276b9315412920BdF9530f6': 'fortitude-stone-lesser',
  '0x17Fa96ba9d9C29e4B96d29A7e89a4E7B240E3343': 'fortitude-stone',
  '0x27AF2A00B42Dcc0084A6Dc99169efbFE98eb140C': 'fortitude-stone-greater',
  '0x4Ff7A020ec1100D36d5C81F3D4815F2e9C704b59': 'wit-stone-lesser',
  '0x939Ea05C81aAC48F7C10BdB08615082B82C80c63': 'wit-stone',
  '0xa6e86F2b43Ae73cfB09A3bA779AeB8Fd48417ba0': 'wit-stone-greater',
  '0x762b98B3758d0A5Eb95B3E4A1E2914Ce0A80D99c': 'insight-stone-lesser',
  '0x9D71Bb9C781FC2eBdD3d6cb709438e3c71200149': 'insight-stone',
  '0x40654Da5a038963fA9750AF352ae9d3b1da2baD0': 'insight-stone-greater',
  '0x6D6eA1D2Dc1Df6Eaa2153f212d25Cf92d13Be628': 'fortune-stone-lesser',
  '0x5da2EffE9857DcEcB786E13566Ff37B92e1E6862': 'fortune-stone',
  '0x7f26CB2BBBcFCE8e5866cc02a887A591E1Adc02A': 'fortune-stone-greater',
  '0x6D4f4bC32df561a35C05866051CbE9C92759Da29': 'chaos-stone-lesser',
  '0x3633F956410163A98D58D2D928B38C64A488654e': 'chaos-stone',
  '0x2fB31FF9E9945c5c1911386865cD666b2C5dfeB6': 'chaos-stone-greater'
};
const DFKCHAIN_TOKENS = {
  '0x0000000000000000000000000000000000000000': 'none',
  '0x04b9dA42306B023f3572e106B11D82aAd9D32EBb': 'Crystal',
  '0xCCb93dABD71c8Dad03Fc4CE5559dC3D89F67a260': 'wJewel',
  '0x77f2656d04E158f915bC22f07B779D94c1DC47Ff': 'wxJewel',
  '0xB57B60DeBDB0b8172bb6316a9164bd3C695F133a': 'dfkAVAX',
  '0x3AD9DFE640E1A9Cc1D9B0948620820D975c3803a': 'USDC',
  '0xfBDF0E31808d0aa7b9509AA6aBC9754E48C58852': 'Ethereum',
  '0x7516EB8B8Edfa420f540a162335eACF3ea05a247': 'BTC.b',
  '0x97855Ba65aa7ed2F65Ed832a776537268158B78a': 'Klay',
  '0xD17a41Cd199edF1093A9Be4404EaDe52Ec19698e': 'Matic',
  '0x2Df041186C844F8a2e2b63F16145Bc6Ff7d23E25': 'Fantom',
  '0x576C260513204392F0eC0bc865450872025CB1cA': 'DFK Gold',
  '0x58E63A9bbb2047cd9Ba7E6bB4490C238d271c278': 'Gaia\'s Tears',
  '0x79fE1fCF16Cc0F7E28b4d7B97387452E3084b6dA': 'Gaia\'s Tears',
  '0x75E8D8676d774C9429FbB148b30E304b5542aC3d': 'Shvas Rune',
  '0xCd2192521BD8e33559b0CA24f3260fE6A26C28e4': 'Moksha Rune',
  '0x7E121418cC5080C96d967cf6A033B0E541935097': 'Grey Pet Egg',
  '0x8D2bC53106063A37bb3DDFCa8CfC1D262a9BDCeB': 'Green Pet Egg',
  '0xa61Bac689AD6867a605633520D70C49e1dCce853': 'Blue Pet Egg',
  '0x72F860bF73ffa3FC42B97BbcF43Ae80280CFcdc3': 'Yellow Pet Egg',
  '0xf2D479DaEdE7F9e270a90615F8b1C52F3C487bC7': 'Golden Egg',
  '0xB78d5580d6D897DE60E1A942A5C1dc07Bc716943': 'Ambertaffy',
  '0x848Ac8ddC199221Be3dD4e4124c462B806B6C4Fd': 'Darkweed',
  '0x0096ffda7A8f8E00e9F8Bbd1cF082c14FA9d642e': 'Goldvein',
  '0x137995beEEec688296B0118131C1052546475fF3': 'Ragweed',
  '0x473A41e71618dD0709Ba56518256793371427d79': 'Redleaf',
  '0x60170664b52c035Fcb32CF5c9694b22b47882e5F': 'Rockroot',
  '0x97b25DE9F61BBBA2aD51F1b706D4D7C04257f33A': 'Swift-Thistle',
  '0xe7a1B580942148451E47b92e95aEB8d31B0acA37': 'Frost Drum',
  '0xBcdD90034eB73e7Aec2598ea9082d381a285f63b': 'Knaproot',
  '0x80A42Dc2909C0873294c5E359e8DF49cf21c74E4': 'Shaggy Caps',
  '0xc6030Afa09EDec1fd8e63a1dE10fC00E0146DaF3': 'Skunk Shade',
  '0x268CC8248FFB72Cd5F3e73A9a20Fa2FF40EfbA61': 'Bloater',
  '0x04B43D632F34ba4D4D72B0Dc2DC4B30402e5Cf88': 'Ironscale',
  '0xc2Ff93228441Ff4DD904c60Ecbc1CfA2886C76eB': 'Lanterneye',
  '0x68eE50dD7F1573423EE0Ed9c66Fc1A696f937e81': 'Redgill',
  '0x7f46E45f6e0361e7B9304f338404DA85CB94E33D': 'Sailfish',
  '0xd44ee492889C078934662cfeEc790883DCe245f3': 'Shimmerskin',
  '0xA7CFd21223151700FB82684Cd9c693596267375D': 'Silverfin',
  '0x3bcb9A3DaB194C6D8D44B424AF383E7Db51C82BD': 'Frost Bloater',
  '0xE7CB27ad646C49dC1671Cb9207176D864922C431': 'Speckle Tail',
  '0x60A3810a3963f23Fa70591435bbe93BF8786E202': 'King Pincer',
  '0x6513757978E89e822772c16B60AE033781A29A4F': 'Three Eyed Eel',
  '0x0776b936344DE7bd58A4738306a6c76835ce5D3F': 'Blue Stem',
  '0xA2cef1763e59198025259d76Ce8F9E60d27B17B5': 'Milkweed',
  '0x3E022D84D397F18743a90155934aBAC421D5FA4C': 'Spiderfruit',
  '0xBbd7c4Be2e54fF5e013471162e1ABAD7AB74c3C3': 'DFK Raffle Tix CV',
  '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a': 'Eternal Story Page',
  '0xeC744dae4d68735d5AEA5FDB766FcE51D9A256a5': 'Duels Trophy S1 Solo',
  '0x4Aa517d7DAadD2e22d2b6d90F19a7BB01498116b': 'Duels Trophy S1 Wquad',
  '0x6EAD9B5d7Ae26c12CC40E393749999CB1707af5f': 'Duels Trophy S1 Warr',
  '0x694D5bfe9EC280708891B34ef17eA8A0d3a6B1aF': 'Duels Trophy S2 Solo',
  '0x7532Bbf5ea43cc2B561893dd0f72a6Ac1E03f193': 'Duels Trophy S2 Squad',
  '0x9d12adfbF8884D320Bc36393AF661DfFA3E78aB8': 'Duels Trophy S2 Warr',
  '0x591853e01EcFDcF1Bdc9f093423C197BfBBd1A4f': 'Health Vial',
  '0x5948dd8Df6afEFE05B033AD8f3ae513a9Cd4F1Dc': 'Full Health Potion',
  '0x240da5314B05E84392e868aC8f2b80ad6becadd4': 'Mana Vial',
  '0xf17FD21bDF6713a1Dfed668b97835b21e32651e8': 'Full Mana Potion',
  '0x242078edFDca25ef2A497C8D9f256Fd641472E5F': 'Stamina Vial',
  '0x449eB718e351a86718A090A1a8Db3FD561306d9b': 'Anti-Poison Potion',
  '0x5986045e7c221c8AD40A736B6434D82E29687aeB': 'Anti-Blind Potion',
  '0xFADCb72aAE2713975a890b59FF47231D1A552De3': 'Magic Resistance Potion',
  '0x2dfFf745d2c7ddCAD4E97b80DF33705B1a95A172': 'Toughness Potion',
  '0x84246Ce3988742D46fC00d9b8b2AFb5CDBDaE660': 'Swiftness Potion',
  '0xab2B495902f9A6652c382e5f289423929FFF2E65': 'atonement-crystal',
  '0xbFa812214a16EcA7814e5F5c270d7f8F37A110B5': 'atonement-crystal-lesser',
  '0x3A28E0D4eCF7558e1ba7357070032C5A6105B0C2': 'atonement-crystal-greater',
  '0x5bAC3cAd961B01Ef9510C8e6c5402A2bB1542831': 'might-crystal-lesser',
  '0x234dCf10Db6817185F5A3b430a8CAF2B4a35e9E9': 'might-crystal',
  '0x438A4e0673b7084D6b2379a362627789D845399c': 'might-crystal-greater',
  '0x9d9ef1Bf6A46b8413bf6b1b54F6A7aAb53c6b1b6': 'finesse-crystal-lesser',
  '0xA9A8cc1AC7e7505a69cAca2E068716395CebE562': 'finesse-crystal',
  '0xdA16b191D1431746b6661D428A223b72c178765A': 'finesse-crystal-greater',
  '0x6BCA53314dADdA7f4De30A95413f75a93bfAfecF': 'swiftness-crystal-lesser',
  '0x3e664eB15b35783B9D3EF06702044820F08bB45B': 'swiftness-crystal',
  '0x1459c662F516D63216491DC34F7d9d35b00dF25A': 'swiftness-crystal-greater',
  '0x5e4Cf6907CB5fBe2F642E399F6d07E567155d1F8': 'vigor-crystal-lesser',
  '0xcD9201F50e5Be84ECE3D8F603dcd3e9DD5e88ea2': 'vigor-crystal',
  '0x8780c4aa8bd0D15493D63C884bd9D427199Cf2cf': 'vigor-crystal-greater',
  '0xbd2677c06C9448534A851bdD25dF045872b87cb1': 'fortitude-crystal-lesser',
  '0xdbEE8C336B06f2d30a6d2bB3817a3Ae0E34f4900': 'fortitude-crystal',
  '0x3e1c80c3B916C93748Ae642c885d4BFb5D6a6BFe': 'fortitude-crystal-greater',
  '0xC989c916F189D2A2BE0322c020942d7c43aEa830': 'wit-crystal-lesser',
  '0xAeb5b59c8B90D4F078046550Cc8F9f08dC127253': 'wit-crystal',
  '0x9d1f44b0EC7BB80656FC8Fcd65152513f29a606D': 'wit-crystal-greater',
  '0xbb5F97358F60cCBa262883A3Ff0C637393FE3aB8': 'insight-crystal-lesser',
  '0x03e56Ded72C3a974295773355EadB38c0A85cF9D': 'insight-crystal',
  '0xB3F5867E277798b50ba7A71C0b24FDcA03045eDF': 'insight-crystal-greater',
  '0xE410b2BE2Ce1508E15009118567d02C6d7A7038e': 'fortune-crystal-lesser',
  '0xe9BfCc80800EB77a1eAF6881825936770aF83Eb6': 'fortune-crystal',
  '0x64C7D12D85050F5F0DcD075f038E5D616f30a404': 'fortune-crystal-greater',
  '0xeEe5b16Cc49e7cef65391Fe7325cea17f787e245': 'chaos-crystal-lesser',
  '0xC6b00B4005883C1Ff09fa1351B0f49027bCAB71a': 'chaos-crystal',
  '0xb0155Fdb7B6972717C4774Fa2AEAEe9D6c0040b9': 'chaos-crystal-greater',
  '0xf345b884eA45aEcb3E46CeEaEDB9CE993Ba3615a': 'might-stone-lesser',
  '0x37bAa710391c1D6e22396E4B7F78477F0fF2fFA7': 'might-stone',
  '0xA0851F6368AfA693a6654e9fdaf76CB6F160B837': 'might-stone-greater',
  '0xF1D53fa23C562246B9d8EC591eEa12Ec0288a888': 'finesse-stone-lesser',
  '0xe2C357ECB698C5ee97c49CCCfA8117c4b943C7B9': 'finesse-stone',
  '0xF35D4f749C6ADCd4AEfE1720C5890cD38129d128': 'finesse-stone-greater',
  '0xd37aCbAC3C25a543B30aa16208637cfa6EB97eDd': 'swiftness-stone-lesser',
  '0x4F95D51fB8eF93704aF8C39A080c794cdA08f853': 'swiftness-stone',
  '0x40D2c135a3E5a6f6546626795DEc67f818f0352a': 'swiftness-stone-greater',
  '0x63891e0fcfEe0cEB12dE5fb96F43ADf9DbEC20a3': 'vigor-stone-lesser',
  '0xA71a120931526fC98f1AcC9f769b6b0d690fB8f0': 'vigor-stone',
  '0x0A5985574369EDE9Bd871fbdad61613D4C11Dac4': 'vigor-stone-greater',
  '0xf599Ae2c925D3287a7fF64DC1b55C7Ea6EE3AA8f': 'fortitude-stone-lesser',
  '0x05305c97e9A2FDC0F5Ea23824c1348DEeD9Aff04': 'fortitude-stone',
  '0xc2eF7E4f659272ca2DaE9d3df05680783b299Cd0': 'fortitude-stone-greater',
  '0xFC943eBd19112D6c6098412238E4E8319641B3d8': 'wit-stone-lesser',
  '0x3971212Ec22147EE8808cB84F743DD852Be92f9C': 'wit-stone',
  '0xa1BD7683fA348e256a2de8a9dDB55E5ea01eB048': 'wit-stone-greater',
  '0x3D112747ff2463802Afa240B62ade8F1cc4a5c7d': 'insight-stone-lesser',
  '0x74CFf096C9B027104fb1a0C2E0e265D123eA47De': 'insight-stone',
  '0x3198f51A1c8cFC5f1FeaD58feaa19E6dFc8e9737': 'insight-stone-greater',
  '0x934e3e2a433F37cC2D02855A43fD7Ed475EA7451': 'fortune-stone-lesser',
  '0xd647D8b52981eDE13ac6a5B7Ad04e212Ac38fdFb': 'fortune-stone',
  '0x8FfF0f5A660b4D38441DDF6127bca42D7a2755a9': 'fortune-stone-greater',
  '0x7643ADB5AaF129A424390CB055d6e23231fFd690': 'chaos-stone-lesser',
  '0x1ED1a6Ed588945C59227f7a0c622Ad564229d3d6': 'chaos-stone',
  '0xEd4Bf3008afE47FE01CcC7a6648a24E326667eee': 'chaos-stone-greater'
};
const KLAYTN_TOKENS = {
  '0x0000000000000000000000000000000000000000': 'none',
  '0x5819b6af194a78511c79c85ea68d2377a7e9335f': 'wKlay',
  '0xe4f05A66Ec68B54A58B17c22107b02e0232cC817': 'KLAY',
  '0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432': 'wKlay',
  '0xB3F5867E277798b50ba7A71C0b24FDcA03045eDF': 'Jade',
  '0x30C103f8f5A3A732DFe2dCE1Cc9446f545527b43': 'Jewel',
  '0xcd8fe44a29db9159db36f96570d7a4d91986f528': 'Avax',
  '0x6270B58BE569a7c0b8f47594F191631Ae5b2C86C': 'synUSDC',
  '0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167': 'oUSDT',
  '0x34d21b1e550D73cee41151c77F3c73359527a396': 'oETH',
  '0x16D0e1fBD024c600Ca0380A4C5D57Ee7a2eCBf9c': 'oWBTC',
  '0xaA8548665bCC12C202d5d0C700093123F2463EA6': 'sJewel',
  '0xe7a1B580942148451E47b92e95aEB8d31B0acA37': 'DFKGold',
  '0x8Be0cbA3c8c8F392408364ef21dfCF714A918234': 'Gaia\'s Tears',
  '0x907a98319AEB249e387246637149f4B2e7D21dB7': 'Shvas Rune',
  '0xd0223143057Eb44065e789b202E03A5869a6006C': 'Moksha Rune',
  '0xfd29ebdE0dd1331C19BBF54518df94b442ACb38C': 'Grey Pet Egg',
  '0xb1Ec534fBBfEBd4563A4B0055E744286CE490f26': 'Green Pet Egg',
  '0x29ADd7D022c591D56eb4aFd262075dA900C67ab1': 'Blue Pet Egg',
  '0x0A73aF98781bad9BCb80A71241F129EA877eF1b7': 'Yellow Pet Egg',
  '0xc9731BE04F217543E3010cCbf903E858EFde840f': 'Golden Egg',
  '0x75E8D8676d774C9429FbB148b30E304b5542aC3d': 'Ambertaffy',
  '0xEDFBe9EEf42FfAf8909EC9Ce0d79850BA0C232FE': 'Darkweed',
  '0xeaF833A0Ae97897f6F69a728C9c17916296cecCA': 'Goldvein',
  '0x4cD7025BD6e1b77105b90928362e6715101d0b5a': 'Ragweed',
  '0xadbF23Fe3B47857614940dF31B28179685aE9B0c': 'Redleaf',
  '0xf2D479DaEdE7F9e270a90615F8b1C52F3C487bC7': 'Rockroot',
  '0xCd2192521BD8e33559b0CA24f3260fE6A26C28e4': 'Swift-Thistle',
  '0xD69542aBE74413242e387Efb9e55BE6A4863ca10': 'Frost Drum',
  '0xFceFA4Abcb18a7053393526f75Ad33fac5F25dc9': 'Knaproot',
  '0xCe370D379f0CCf746B3426E3BD3923f3aDF0DC1a': 'Shaggy Caps',
  '0x874FC0015ece1d77ba3D5668F16c46ba72913239': 'Skunk Shade',
  '0x72F860bF73ffa3FC42B97BbcF43Ae80280CFcdc3': 'Bloater',
  '0xBcdD90034eB73e7Aec2598ea9082d381a285f63b': 'Ironscale',
  '0x80A42Dc2909C0873294c5E359e8DF49cf21c74E4': 'Lanterneye',
  '0x8D2bC53106063A37bb3DDFCa8CfC1D262a9BDCeB': 'Redgill',
  '0xc6030Afa09EDec1fd8e63a1dE10fC00E0146DaF3': 'Sailfish',
  '0xa61Bac689AD6867a605633520D70C49e1dCce853': 'Shimmerskin',
  '0x7E121418cC5080C96d967cf6A033B0E541935097': 'Silverfin',
  '0x18cB286EeCE992f79f601E49acde1D1F5dE32a30': 'Frost Bloater',
  '0x48d9fC80A47cee2d52DE950898Bc6aBF54223F81': 'Speckle Tail',
  '0xB4A516bf36e44c0CE9E3E6769D3BA87341Cd9959': 'King Pincer',
  '0x7E1298EBF3a8B259561df6E797Ff8561756E50EA': 'Three Eyed Eel',
  '0xDbd4fA2D2C62C6c60957a126970e412Ed6AC1bD6': 'Blue Stem',
  '0xE408814828f2b51649473c1a05B861495516B920': 'Milkweed',
  '0x08D93Db24B783F8eBb68D7604bF358F5027330A6': 'Spiderfruit',
  '0x3E5081337d1a12F261b013Bc08745fB3cd756Eb3': 'DFK Raffle Tix',
  '0xe52fceF6083e3d2E43D1113FC06caA6bAc9D3db9': 'Duels Trophy S2 Solo',
  '0xE7d77E157672864B500727551633E4Cc453964A9': 'Duels Trophy S2 Squad',
  '0x2C9A39E85D4b3900a63B903113DE103FB448e578': 'Duels Trophy S2 Warr',
  '0xa27C1429a676db902B9f0360686eDbB57d0A7B01': 'Health Vial',
  '0xf710244462431b9962706B46826AFB3B38376c7b': 'Full Health Potion',
  '0x8639d64A2088500EC4f20fB5C41A995fE4f1d85a': 'Mana Vial',
  '0x108D31E23bC6540878E6532F3376b3EC982e1C58': 'Full Mana Potion',
  '0x4546DBaAb48Bf1BF2ad7B56d04952d946Ab6e2a7': 'Stamina Vial',
  '0xE34a733fA92B41A1CA4241da9D2d5834Cc8D1011': 'Anti-Poison Potion',
  '0x5FB537aF1d929af7BDD7935C289158c940782ed6': 'Anti-Blind Potion',
  '0x9c8A0C6a7ad8Be153773070D434CDbeA5176D2ff': 'Magic Resistance Potion',
  '0xf757a7F4ffF29e7F7b4aCCe6Ffb04E59e91EFDA8': 'Toughness Potion',
  '0xcb7aA7cA9357DAF9F2b78D262A4f89cDfE5abC70': 'Swiftness Potion',
  '0x80Ab38fc9fA0a484b98d5600147e7C695627747D': 'might-crystal-lesser',
  '0xa3907dEA6f16f1918B4BcDd178c2928c7e6A571D': 'might-crystal',
  '0x1F93421DaE2f8de79C3Fd197a227ec5EE3Eef71b': 'might-crystal-greater',
  '0xC3B36a02f360c3d18042bF3533be602cb775007A': 'finesse-crystal-lesser',
  '0x15E77beB33D3B09aB7da529daB1E556b955fECf6': 'finesse-crystal',
  '0x616df872971A3f31dffC9a2B55BF55C760B966bF': 'finesse-crystal-greater',
  '0x32Cbbfd741EB7634818aa2e3E8502367cB6602BE': 'swiftness-crystal-lesser',
  '0xc2Ff16F357b51E070c977501563A01a70F3B7BF5': 'swiftness-crystal',
  '0xa5CC44e60F5a898e5c776952E66D1c9905077608': 'swiftness-crystal-greater',
  '0x6C7AF7483b050a00b5fbC4241eD06944c5f0bD77': 'vigor-crystal-lesser',
  '0x14a9D5a75799E4C6B4BfA65C8293a75e02DD5339': 'vigor-crystal',
  '0x73286f76E05aAa7A73F896DE0Ebc745021Cb50F2': 'vigor-crystal-greater',
  '0x1E672a8385b39E13267efA2Fb39f574a2a23AE9F': 'fortitude-crystal-lesser',
  '0xA844059503289B781854aEdcA04E5bB13290bd86': 'fortitude-crystal',
  '0x147b3263F1C4ca729B13Ca1D2A7148c32Aa1d8d0': 'fortitude-crystal-greater',
  '0xf15035b5eD13Feb18f63D829ABc1c3139041e7C2': 'wit-crystal-lesser',
  '0xf30214D43E55BE1cbaC712b49A75d4D3220302a7': 'wit-crystal',
  '0x5F8A485ed5B4B13c1fc3c1C7fe82164E8e534060': 'wit-crystal-greater',
  '0x5f967E325E91977B42D2591Fc2f57da75Ee4490B': 'insight-crystal-lesser',
  '0xAd7fBD9EDDE05227964104Bb23Ff8d171D4c90C8': 'insight-crystal',
  '0x17bb680872D7631e3056136d7e15eC5f6570976a': 'insight-crystal-greater',
  '0x8baD15B5C531d119b328d0F716a6B9D90CeDa88A': 'fortune-crystal-lesser',
  '0x02d27BC195E58498C687A82d96188A8EF282a1e1': 'fortune-crystal',
  '0x0d2ea025007995e9Bb1815864CD4e7B98B47DF7c': 'fortune-crystal-greater',
  '0x537E800b8fD22Dc76A438Af8b9923986A5487853': 'chaos-crystal-lesser',
  '0xE078C782fF0cC1789D0608834A3cD5076896e4FC': 'chaos-crystal',
  '0x9e185426354AA53aAC07De79c2fa1e0B50490fdd': 'chaos-crystal-greater',
  '0xbb8ac0BB95E433204217b0478B3f6d815EcB2d8C': 'might-stone-lesser',
  '0x532bce28c28616552a4BcDdb5D4B4126Dea35f66': 'might-stone',
  '0x434619b18466dEAA26475f97467754135aB8f3AF': 'might-stone-greater',
  '0x784bd01e3882b80aa837f6A3041Cd386eC54a501': 'finesse-stone-lesser',
  '0x31eb3b534E29D10Db08109A1fa50ccB081d10816': 'finesse-stone',
  '0xFE4ac39174C2637537711f0cb3112EaD47E77D37': 'finesse-stone-greater',
  '0xAd51199B453075C73FA106aFcAAD59f705EF7872': 'swiftness-stone-lesser',
  '0xf200597430eAc3e22B4566D1BCd70A3b63804B24': 'swiftness-stone',
  '0x954296fd7563f737BD502e3DdbAdA3f5223F92f1': 'swiftness-stone-greater',
  '0x50F683acefA41b226CEfAdc0dd2ea6fFBfED56A0': 'vigor-stone-lesser',
  '0xA0c89fB3cbb115cf86EdcB4319578312D026A07a': 'vigor-stone',
  '0x9A587bBD01D5B2745b20A89ddd9B83268129fEda': 'vigor-stone-greater',
  '0xBC5248B4f50f4c7D2F9A67Be1f1d4b8be44ffc75': 'fortitude-stone-lesser',
  '0x254787d3b87d8c21A300Ab8D5A06C01426CE40c0': 'fortitude-stone',
  '0x3D0EA055081e62e40257fde3A2036a557af6Ff77': 'fortitude-stone-greater',
  '0x5903F478e456DD4Ce5387caBE3984DfEf93D0A46': 'wit-stone-lesser',
  '0x3BaEFAfF21Fa2F06Ad3899903B7A899a91B5915A': 'wit-stone',
  '0x3C0B9C87b1747C47D0B73910f995A08D75D81Af1': 'wit-stone-greater',
  '0xfC66cF68505F8E95C52C4F7f84936436DBd52e9B': 'insight-stone-lesser',
  '0x22A92428605a3B5b66695A60e96b683E98a9a035': 'insight-stone',
  '0xF861104131825320C3d0D9B7bd373Ea0549f0587': 'insight-stone-greater',
  '0x816E22125021530535364390a3E2fA305a436247': 'fortune-stone-lesser',
  '0xf0cBbd41652d9A93A899f070669186F0c8475F7D': 'fortune-stone',
  '0x91aced74b0CEE03EF8902f13E97F6e308941E6Bd': 'fortune-stone-greater',
  '0x38bDed7C399bbD214a19De35260766b130cAFd2F': 'chaos-stone-lesser',
  '0x880cb941AAb394775f54F2b6468035bbdD0B81dF': 'chaos-stone',
  '0x932049DF7f09DeE7cF5Aefe03f373810EBbdDDc7': 'chaos-stone-greater',
  '0x26bdcB310313eFf8D580e43762e2020B23f3e728': 'Eternal Story Pages'
};
const METIS_TOKENS = {
  '0x0000000000000000000000000000000000000000': 'none',
  '0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481': 'wMetis',
  '0x17C09cfC96C865CF546d73365Cedb6dC66986963': 'Jewel',
  '0xDeaF0ED1851accD469F0A42Ff9e9CC6804a619c5': 'DFKGold',
  '0x9d05F8289F0eA7D1993B316F45b8e6E29F7e5D16': 'Gaia\'s Tears',
  '0xFEd84c0C6a2517f1f48FdC5f1A2Ed00836826aa6': 'Shvas Rune',
  '0x5fb51dff65eFf32644001981856f578120b8aE66': 'Moksha Rune',
  '0x842DFd5E453eF385Dc276a2B7818ffaa9FBbfed6': 'Grey Pet Egg',
  '0x2DAC4d6461a383A66009846f0Dd9de976Ea5CE17': 'Green Pet Egg',
  '0x9A3E3bF38C2a338d0a658a4b2c220A429a37f2c1': 'Blue Pet Egg',
  '0x1302718474bdAFe5a85f516836B4027e37B10abE': 'Yellow Pet Egg',
  '0xC4a3D06B3E5D1244863285f439FA7A0711a1CD9f': 'Golden Egg',
  '0xb6D1C4e5b131FA52Cfa48e5477aAe386B63B6fD6': 'Ambertaffy',
  '0xe099eCbdd066636d19557d9509CF24bEdC1A5dF5': 'Darkweed',
  '0xC0708d02e4F24368d445Acf0733d8380a1101d16': 'Goldvein',
  '0x1430364f07aAF9f406E926af37609feeA9E8F7c6': 'Ragweed',
  '0xd774bA5c82be822b37B6198F12Bb1017e34fe232': 'Redleaf',
  '0x1dD6dcDd7E4191cC775259482E28454B7D6c85B0': 'Rockroot',
  '0xBB69DF1fcE676743c64ECBd2ad4D2C22Eb856BE0': 'Swift-Thistle',
  '0xc67047E590054804b4a439CD04555fe05e709350': 'Frost Drum',
  '0x1399cd3bA4Ca85026B360a158a6E048c0ae5E814': 'Knaproot',
  '0x8464ec1908648C7d09DCbc43e949A6746B941F83': 'Shaggy Caps',
  '0xDD3b10eA8217fA727AAe5A52cF7f04dc9b3911A9': 'Skunk Shade',
  '0x170b348830099E3D4080975616248d45B83bAD0E': 'Bloater',
  '0x4419F44043301a38Ae6b6384c454740fe4DfB6eA': 'Ironscale',
  '0x1a9c734AbBC91219eD383Bb9161302C54A4d5177': 'Lanterneye',
  '0xf724FE22b45D519D149477aA2eC5348Cee08Cae3': 'Redgill',
  '0x55b5eC593b4BfD7441F2AB7cfD125FEDdB0a5526': 'Sailfish',
  '0x16E11802d79d48eAdE94F8E0bd568fE4EA5CdA01': 'Shimmerskin',
  '0x87B3E8A2A755aDe019E882DE42D5eA4e64D586dd': 'Silverfin',
  '0xCFeAd2748e845AB3Cacb9a54E19217172767744f': 'Frost Bloater',
  '0xBeFB707Aba26608C701bc4705F26eB8C2EEc8302': 'Speckle Tail',
  '0x296255163Bd2cD44e5D6903fB90E797BAedA158c': 'King Pincer',
  '0xb2bC817C100a6bd60e8bf8a79dBAD607cE9C3cF2': 'Three Eyed Eel',
  '0xd0C48d91b3a52C27C89548FC04e4b11891946CFB': 'Blue Stem',
  '0x996a584676F14F1A58214AE20175d56b93cB1798': 'Milkweed',
  '0xEb88910Ad7B07b5cB0DEc521138d4E451b369A89': 'Spiderfruit',
  '0xD9551F2A44DE25E833e103eb9217F096f9d09eab': 'Health Vial',
  '0x4E3c1463454ABaa87441C3206d48125715ceB2B3': 'Full Health Potion',
  '0xEf4bE4fb3E03D173F29DbFE8F8f2Da26fDA95932': 'Mana Vial',
  '0x82b999269E4d2C1Dd1fbac4fb1a00eE82458fB56': 'Full Mana Potion',
  '0x2DC1b89d20878aD9dc06e7e165f340d6CCa78475': 'Stamina Vial',
  '0x04b2890C7241bced2006984C5a3F85C99FABFd0c': 'Anti-Poison Potion',
  '0x6E473afAD39150FfDC18Aab5D436C0cce06D44B2': 'Anti-Blind Potion',
  '0xf5895209781ea575be5cF6286cbA2275bE577734': 'Magic Resistance Potion',
  '0x1360de63Ce2c34ac3c49aa4fa99046e8F3E86380': 'Toughness Potion',
  '0x797b89420A898Df912fadfD7CfE7840f7f19cD52': 'Swiftness Potion',
  '0x4C3b021BBC0B3Bb5f60140059CF856bEAE95F832': 'might-crystal-lesser',
  '0x0Bfa7D64D692638B86c2e4a7cCDaEF3B9453EBc4': 'might-crystal',
  '0x6D48b676a54742b1a7503da3FC39E0AFA4093059': 'might-crystal-greater',
  '0x51f2932cb25fD1C8411985c30AC27C4199d6151D': 'finesse-crystal-lesser',
  '0xE15A227cC569e8fcB1C01f066c2215F0305439e1': 'finesse-crystal',
  '0x21259a49fE6d6348B1cdC7bbd6CA7D8EDbd6E3d5': 'finesse-crystal-greater',
  '0xa755d4728B74ae0D76ecA76d0a36D4Ffc1544122': 'swiftness-crystal-lesser',
  '0xbED31d3cE3632d2179799adB8781Dfdd104FE63A': 'swiftness-crystal',
  '0xe2af67B024B043E8de97899385056DBFBFc4d9d3': 'swiftness-crystal-greater',
  '0x82568117fD15E376F9183a327c0e9b03D0fdebEb': 'vigor-crystal-lesser',
  '0x3e8f6b1bCe1fa3C96E89F95E6aB06Dc092bA7b09': 'vigor-crystal',
  '0x8c537c46585f083B7F5180E2b8F0118377855459': 'vigor-crystal-greater',
  '0x1f09508fD945F94Cec4401538FD6d3F712971a3A': 'fortitude-crystal-lesser',
  '0xbE6C7099ca0578e64Ea529b3bf50b1a7D500a620': 'fortitude-crystal',
  '0x0163CCEFa1905aebE5A39902849689e925570204': 'fortitude-crystal-greater',
  '0x15A22966976538f50482477eE84FB1cbF3B6cBc0': 'wit-crystal-lesser',
  '0xEfB57B24589954CFc95592e23B12Ef6fcBb6454A': 'wit-crystal',
  '0xd873E3FC7833aA0ffe2B3880D33C6a1552155AA6': 'wit-crystal-greater',
  '0x82a237e12b4bD4Db62e4f3c41249c870b3c47f48': 'insight-crystal-lesser',
  '0x7378D09e9e2b47d1F601E71A2329C3356F6c56Cd': 'insight-crystal',
  '0xf55d8deF02DB239A24b6b032C2d421276d5894b1': 'insight-crystal-greater',
  '0xdB510ea5f73828aa949bc63b76CAa37E1717637F': 'fortune-crystal-lesser',
  '0x1c248Aa70ce3d82Aa6106A0e6C6C4C3473E666f9': 'fortune-crystal',
  '0xC2F45C216B0A22607Bd810beE9B6f5a57431d1fe': 'fortune-crystal-greater',
  '0xD676439D9f7E2aEaeE1bEe465adE545812851DCf': 'chaos-crystal-lesser',
  '0x9bBD946ED9b6e9EA4FD85f3Fa9ADB9CC6f03c2BE': 'chaos-crystal',
  '0x82B62202B92Cb552B2cbDf3f99d88F9BE376D6d9': 'chaos-crystal-greater',
  '0x12b88D696f3b8603FeCD42b1f2DCC5987e344718': 'might-stone-lesser',
  '0x6B5Eb5C0505006F8887e62dc9ce3200919e967eE': 'might-stone',
  '0x98A0077Fc43a596f408D1D4dCad05F1Cb079e24F': 'might-stone-greater',
  '0x930f1bFfD69e9eb167702FdCfaC0C5F64E7B0f3A': 'finesse-stone-lesser',
  '0x5a1d6f841b6Bb8758c6C853736da6339758689F8': 'finesse-stone',
  '0x94F8bA841407c2f2af966BE6279121e40567cb15': 'finesse-stone-greater',
  '0xD95825adB5F74669A9D4554a088F28a220544C69': 'swiftness-stone-lesser',
  '0x23a14dCd662F9dfFb3E918707567C34cB399AB70': 'swiftness-stone',
  '0xbEb0ffa168e0Ba6978b3A26FE78E4471b541afBe': 'swiftness-stone-greater',
  '0x351D1dE49AA3f6e33645d705c4fA9cf20068e850': 'vigor-stone-lesser',
  '0x66108b50aA60F22FE99518867342bF2bFEDb7A02': 'vigor-stone',
  '0x31D2459eB2407E4b9af4E8716957263Cd5882Ce1': 'vigor-stone-greater',
  '0xa2D001C829328aa06a2DB2740c05ceE1bFA3c6bb': 'fortitude-stone-lesser',
  '0xb497d9177117B8afCb2A72567701e443A29CBa15': 'fortitude-stone',
  '0x7E3Bf4A053500a3f0A976528F2e78Df0538c1dbF': 'fortitude-stone-greater',
  '0x94CDcbC6c23A66e74cED160a54BB2dEf9c7e7245': 'wit-stone-lesser',
  '0xcB0012e4E56F682C6DF37484255EEb90f6D2eD72': 'wit-stone',
  '0x46119706eC292c4187B14ec59ea085fDC0148065': 'wit-stone-greater',
  '0xE01fd3BA8794e6248D7aa556ec9a12abE2aa6D8F': 'insight-stone-lesser',
  '0xC55ee74FDBA1eB7A0c8457fcA569830276456c48': 'insight-stone',
  '0x90fdE1546F64681Ff40f78Ee2D21d6b47076F89e': 'insight-stone-greater',
  '0x0A473d7BDAe9423019dB124bD40F818cb535582B': 'fortune-stone-lesser',
  '0x87993136E323561B305EB958447ab234698BEFb8': 'fortune-stone',
  '0x27C6d743a1306E8f0c9BEb29443DDFC83bAe598e': 'fortune-stone-greater',
  '0x8F0a4EaFe3d860c67E906B743905261BD2982230': 'chaos-stone-lesser',
  '0xBedaCD6E21d9386f49335c63A32710E37b5b96Ab': 'chaos-stone',
  '0x4d4f6aCDE99298bB2FcEA7c807ed29F97D1A57fB': 'chaos-stone-greater'
};

const balanceOfABI = [
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "balance",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
];
const transferABI = [
   {
       'constant': false,
       'inputs': [
           {
               'name': '_to',
               'type': 'address'
           },
           {
               'name': '_value',
               'type': 'uint256'
           }
       ],
       'name': 'transfer',
       'outputs': [
           {
               'name': '',
               'type': 'bool'
           }
       ],
       'type': 'function'
   }
]
