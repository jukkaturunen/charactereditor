let character_edited = false;

const characterData = {
  "character": {
    "name": "Pax Fuller",
    "age": "20",
    "player": "Jukka",
    "concept": "Driven young man looking for his disappeared sister",
    "virtue": "Humble",
    "vice": "Hasty",
    "chronicle": "Lifting the Veil",
    "faction": "",
    "group_name": "",
    "attributes": {
      "mental": {
        "intelligence": 4,
        "wits": 2,
        "resolve": 2
      },
      "physical": {
        "strength": 2,
        "dexterity": 2,
        "stamina": 2
      },
      "social": {
        "presence": 3,
        "manipulation": 1,
        "composure": 3
      }
    },
    "skills": {
      "mental": {
        "academics": 4,
        "computer": 2,
        "crafts": 0,
        "investigation": 3,
        "medicine": 0,
        "occult": 1,
        "politics": 0,
        "science": 1
      },
      "physical": {
        "athletics": 1,
        "brawl": 0,
        "drive": 1,
        "firearms": 1,
        "larceny": 1,
        "stealth": 0,
        "survival": 0,
        "weaponry": 0
      },
      "social": {
        "animal_ken": 0,
        "empathy": 3,
        "expression": 0,
        "intimidation": 0,
        "persuasion": 2,
        "socialize": 1,
        "streetwise": 1,
        "subterfuge": 0
      }
    },
    "specialties": {
      "academics": "history",
      "investigation": "crime scene investigation",
      "empathy": "detecting lies"
    },
    "merits": {
      "Eidetic Memory": {
        "dots": [
          2
        ],
        "effect": "Automatically recalls details. +2 on Intelligence + Composure to recall facts."
      },
      "Contacts": {
        "dots": 3,
        "targets": [
          "the lone gunmen",
          "occult",
          "investigation",
          "streetwise"
        ],
        "prerequisites": [],
        "effect": "Each dot gives access to a field of information. Roll Manipulation + Social Skill to gain intel. Can reveal other characters’ Merits or Conditions."
      },
      "Resources": {
        "dots": 2,
        "prerequisites": [],
        "effect": "Disposable income. Each dot increases purchasing power. Items up to Resources can be bought each chapter without problem."
      }
    },
    "health": {
      "max": 7,
      "damage": {
        "bashing": 1,
        "lethal": 3,
        "aggravated": 2
      }
    },
    "willpower": {
      "max": 5,
      "current": 2
    },
    "integrity": 7,
    "size": 5,
    "speed": 9,
    "defense": 2,
    "armor": 0,
    "initiative_mod": 5,
    "beats": 2,
    "experiences": {
      "total": 2,
      "gained from": {},
      "spent on": {"integrity+1":2, "wits+1":4,"occult+1":2,"larceny+1":2}
    },
    "conditions": [],
    "aspirations": [],
    "equipment": [],
    "weapons": {
      "none": {
        "dmg": 0,
        "range": {
          "short": 0,
          "medium": 0,
          "long": 0
        },
        "clip": 0,
        "init": 0,
        "str": 0,
        "size": 0
      }
    },
    "vehicles": {
      "none": {
        "durability": 0,
        "structure": 0,
        "size": 0,
        "acceleration": 0,
        "safe speed": 0,
        "max speed": 0,
        "handling": 0
      }
    },
    "breaking_points": ["bonus tähän"],
    "history": [],
    "goals": [],
    "description": {
      "age": "",
      "date_of_birth": "",
      "hair": "",
      "eyes": "",
      "race": "",
      "nationality": "",
      "height": "",
      "weight": "",
      "sex": "Male",
      "distinguishing_characteristics": ""
    }
  }
};

function setEdited() {
    character_edited = true;
    document.getElementById('save-changes-link').classList.remove('hidden');
}

function saveChanges() {
    const meritsEditor = document.getElementById('merits-editor');
    if (meritsEditor && meritsEditor.is_valid()) {
        characterData.character.merits = meritsEditor.json_value;
        alert('character data saved');
        character_edited = false;
        document.getElementById('save-changes-link').classList.add('hidden');
    } else {
        alert('Invalid JSON in Merits editor. Please fix it before saving.');
    }
    return false;
}

function toggleSection(sectionId, toggleElement) {
  const section = document.getElementById(sectionId);
  section.classList.toggle('collapsed');

  if (section.classList.contains('collapsed')) {
      toggleElement.innerHTML = '▶';
  } else {
      toggleElement.innerHTML = '▼';
  }
}

function renderDots(category, subcategory, name, value, maxDots = 5) {
  let dotsHtml = '<div class="dots">';
  for (let i = 0; i < maxDots; i++) {
    const newValue = (i + 1 === value) ? 0 : i + 1;
    dotsHtml += `<div class="dot ${i < value ? 'filled' : ''}" onclick="updateValue('${category}', '${subcategory}', '${name}', ${newValue})"></div>`;
  }
  dotsHtml += '</div>';
  return dotsHtml;
}

let healthDamageState = [];

function renderBoxes(category, name, value, maxBoxes = 10) {
  let boxesHtml = '<div class="boxes">';
  for (let i = 0; i < maxBoxes; i++) {
    const newValue = (i + 1 === value) ? 0 : i + 1;
    boxesHtml += `<div class="box ${i < value ? 'filled' : ''}" onclick="updateValue('${category}', '', '${name}', ${newValue})"></div>`;
  }
  boxesHtml += '</div>';
  return boxesHtml;
}

function renderHealthDamage(damageState) {
  let boxesHtml = '<div class="boxes">';
  damageState.forEach((damageType, index) => {
      boxesHtml += `<div class="box" onclick="updateHealthDamage(${index})">`;
      switch (damageType) {
          case 1: // Bashing
              boxesHtml += '<svg width="15" height="15"><line x1="0" y1="15" x2="15" y2="0" stroke="black" stroke-width="1"/></svg>';
              break;
          case 2: // Lethal
              boxesHtml += '<svg width="15" height="15"><line x1="0" y1="0" x2="15" y2="15" stroke="black" stroke-width="1"/><line x1="0" y1="15" x2="15" y2="0" stroke="black" stroke-width="1"/></svg>';
              break;
          case 3: // Aggravated
              boxesHtml += '<svg width="15" height="15"><line x1="0" y1="0" x2="15" y2="15" stroke="black" stroke-width="1"/><line x1="0" y1="15" x2="15" y2="0" stroke="black" stroke-width="1"/><line x1="7.5" y1="0" x2="7.5" y2="15" stroke="black" stroke-width="1"/><line x1="0" y1="7.5" x2="15" y2="7.5" stroke="black" stroke-width="1"/></svg>';
              break;
      }
      boxesHtml += '</div>';
  });
  boxesHtml += '</div>';
  return boxesHtml;
}

function updateHealthDamage(boxIndex) {
  setEdited();
  const currentDamageType = healthDamageState[boxIndex];
  const newDamageType = (currentDamageType + 1) % 4;
  healthDamageState[boxIndex] = newDamageType;

  recalculateDamageCounts();
}

function recalculateDamageCounts() {
  let bashing = 0;
  let lethal = 0;
  let aggravated = 0;

  for (const damageType of healthDamageState) {
      if (damageType === 1) bashing++;
      else if (damageType === 2) lethal++;
      else if (damageType === 3) aggravated++;
  }

  characterData.character.health.damage = { bashing, lethal, aggravated };
  render();
}

function updateValue(category, subcategory, name, newValue) {
  setEdited();
  if (subcategory) {
    characterData.character[category][subcategory][name] = newValue;
  } else if (name) {
    characterData.character[category][name] = newValue;
  } else {
    characterData.character[category] = newValue;
  }
  render();
}

function toggleSpecialty(skillName) {
  setEdited();
  if (characterData.character.specialties.hasOwnProperty(skillName)) {
    delete characterData.character.specialties[skillName];
  } else {
    characterData.character.specialties[skillName] = "";
  }
  render();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatSkillName(name) {
  const withSpaces = name.replace(/_/g, ' ');
  return capitalizeFirstLetter(withSpaces);
}

function populateSheet(data) {
  const character = data.character;

  document.getElementById('character-name-header').textContent = character.name;

  // Header
  document.getElementById('name').textContent = character.name;
  document.getElementById('age').textContent = character.age;
  document.getElementById('player').textContent = character.player;
  document.getElementById('concept').textContent = character.concept;
  document.getElementById('virtue').textContent = character.virtue;
  document.getElementById('vice').textContent = character.vice;
  document.getElementById('chronicle').textContent = character.chronicle;
  document.getElementById('faction').textContent = character.faction;
  document.getElementById('group_name').textContent = character.group_name;

  // Attributes
  const mentalAttributes = document.getElementById('mental-attributes');
  mentalAttributes.innerHTML = '<h3>Mental</h3>';
  for (const attr in character.attributes.mental) {
    mentalAttributes.innerHTML += `<div class="item"><span>${capitalizeFirstLetter(attr)}</span>${renderDots('attributes', 'mental', attr, character.attributes.mental[attr])}</div>`;
  }
  const physicalAttributes = document.getElementById('physical-attributes');
  physicalAttributes.innerHTML = '<h3>Physical</h3>';
  for (const attr in character.attributes.physical) {
    physicalAttributes.innerHTML += `<div class="item"><span>${capitalizeFirstLetter(attr)}</span>${renderDots('attributes', 'physical', attr, character.attributes.physical[attr])}</div>`;
  }
  const socialAttributes = document.getElementById('social-attributes');
  socialAttributes.innerHTML = '<h3>Social</h3>';
  for (const attr in character.attributes.social) {
    socialAttributes.innerHTML += `<div class="item"><span>${capitalizeFirstLetter(attr)}</span>${renderDots('attributes', 'social', attr, character.attributes.social[attr])}</div>`;
  }

  // Skills
  const mentalSkills = document.getElementById('mental-skills');
  mentalSkills.innerHTML = '<h3>Mental</h3>';
  for (const skill in character.skills.mental) {
    const hasSpecialty = character.specialties.hasOwnProperty(skill);
    mentalSkills.innerHTML += `<div class="item"><span><div class="specialty-box ${hasSpecialty ? 'filled' : ''}" onclick="toggleSpecialty('${skill}')"></div>${formatSkillName(skill)}</span>${renderDots('skills', 'mental', skill, character.skills.mental[skill])}</div>`;
  }
  const physicalSkills = document.getElementById('physical-skills');
  physicalSkills.innerHTML = '<h3>Physical</h3>';
  for (const skill in character.skills.physical) {
    const hasSpecialty = character.specialties.hasOwnProperty(skill);
    physicalSkills.innerHTML += `<div class="item"><span><div class="specialty-box ${hasSpecialty ? 'filled' : ''}" onclick="toggleSpecialty('${skill}')"></div>${formatSkillName(skill)}</span>${renderDots('skills', 'physical', skill, character.skills.physical[skill])}</div>`;
  }
  const socialSkills = document.getElementById('social-skills');
  socialSkills.innerHTML = '<h3>Social</h3>';
  for (const skill in character.skills.social) {
    const hasSpecialty = character.specialties.hasOwnProperty(skill);
    socialSkills.innerHTML += `<div class="item"><span><div class="specialty-box ${hasSpecialty ? 'filled' : ''}" onclick="toggleSpecialty('${skill}')"></div>${formatSkillName(skill)}</span>${renderDots('skills', 'social', skill, character.skills.social[skill])}</div>`;
  }

  // Other Traits
  const healthEl = document.getElementById('health');
  healthEl.innerHTML = '<h3>Health</h3>';
  healthEl.innerHTML += renderDots('health', '', 'max', character.health.max, 10);
  if (healthDamageState.length === 0) {
      const damage = character.health.damage;
      for (let i = 0; i < damage.aggravated; i++) healthDamageState.push(3);
      for (let i = 0; i < damage.lethal; i++) healthDamageState.push(2);
      for (let i = 0; i < damage.bashing; i++) healthDamageState.push(1);
      while (healthDamageState.length < 10) healthDamageState.push(0);
  }
  healthEl.innerHTML += renderHealthDamage(healthDamageState);

  const willpowerEl = document.getElementById('willpower');
  willpowerEl.innerHTML = '<h3>Willpower</h3>';
  willpowerEl.innerHTML += renderDots('willpower', '', 'max', character.willpower.max, 10);
  willpowerEl.innerHTML += renderBoxes('willpower', 'current', character.willpower.current, 10);

  const integrityEl = document.getElementById('integrity');
  integrityEl.innerHTML = '<h3>Integrity</h3>';
  integrityEl.innerHTML += renderDots('integrity', '', '', character.integrity, 10);

  const meritsEditor = document.getElementById('merits-editor');
  if (meritsEditor) {
    meritsEditor.json_value = character.merits;
  }
}

function render() {
  populateSheet(characterData);
}

render();
const characterSelector = document.getElementById('character-selector');
const loadCharacterBtn = document.getElementById('load-character-btn');

if (characterSelector && loadCharacterBtn) {
    characterSelector.addEventListener('change', () => {
        if (characterSelector.value) {
            loadCharacterBtn.disabled = false;
        } else {
            loadCharacterBtn.disabled = true;
        }
    });

    loadCharacterBtn.addEventListener('click', () => {
        const selectedCharacter = characterSelector.value;
        if (selectedCharacter) {
            alert(`Loading character: ${selectedCharacter}`);
        }
    });
}

const meritsEditor = document.getElementById('merits-editor');
if (meritsEditor) {
    meritsEditor.addEventListener('keyup', () => {
        if (meritsEditor.is_valid()) {
            setEdited();
        }
    });
}