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
    "conditions": [
      "Confused"
    ],
    "aspirations": [
      "Finding her sister",
      "Graduating top of the class"
    ],
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
      "date_of_birth": "07-04-1962",
      "hair": "Darkd brown. almost black",
      "eyes": "Grey",
      "race": "Caucasian",
      "nationality": "American",
      "height": "181",
      "weight": "72",
      "sex": "Male",
      "distinguishing_characteristics": "Always seriuous expression"
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

function setValueByPath(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}

function saveHeaderEdit(buttonElement, dataPath) {
    const input = buttonElement.previousElementSibling;
    const newValue = input.value;
    setValueByPath(characterData.character, dataPath, newValue);
    setEdited();
    render();
}

function makeEditable(element, dataPath) {
    if (element.parentElement.querySelector('input')) return; // Already editing
    const currentValue = element.textContent;
    const parent = element.parentElement;
    const label = parent.firstElementChild.textContent;

    parent.innerHTML = `
        <span>${label}</span>
        <span>
            <input type="text" value="${currentValue}" style="width: 70%;">
            <button onclick="saveHeaderEdit(this, '${dataPath}')">✓</button>
            <button onclick="render()">✗</button>
        </span>
    `;
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

  if (category === 'beats' && newValue === 5) {
    characterData.character.beats = 0;
    characterData.character.experiences.total += 1;
  } else {
    if (subcategory) {
      characterData.character[category][subcategory][name] = newValue;
    } else if (name) {
      characterData.character[category][name] = newValue;
    } else {
      characterData.character[category] = newValue;
    }
  }
  
  render();
}

function addListItem(category) {
    if (category === 'specialties') {
        const skill = prompt('Enter the skill for the new specialty:');
        if (skill) {
            const specialty = prompt(`Enter the new specialty for ${skill}:`);
            if (specialty) {
                characterData.character.specialties[skill] = specialty;
                setEdited();
                render();
            }
        }
    } else {
        const singular = category.slice(0, -1);
        const newValue = prompt(`Enter new ${singular}:`);
        if (newValue) {
            characterData.character[category].push(newValue);
            setEdited();
            render();
        }
    }
}

function deleteListItem(category, key) {
    if (confirm('Are you sure you want to delete this item?')) {
        if (category === 'specialties') {
            delete characterData.character.specialties[key];
        } else {
            characterData.character[category].splice(key, 1);
        }
        setEdited();
        render();
    }
}



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatSkillName(name) {
  const withSpaces = name.replace(/_/g, ' ');
  return capitalizeFirstLetter(withSpaces);
}

function populateSpecialties(specialties) {
    const specialtiesEl = document.getElementById('specialties-content');
    specialtiesEl.innerHTML = '<h3>Specialties</h3>';
    for (const skill in specialties) {
        const specialty = specialties[skill];
        specialtiesEl.innerHTML += `<div class="item"><span>${formatSkillName(skill)}</span><div class="specialty-item-right"><span>${specialty}</span><img src="images/trash_can.png" class="delete-icon" onclick="deleteListItem('specialties', '${skill}')"></div></div>`;
    }
    specialtiesEl.innerHTML += `<a class="add-link" onclick="addListItem('specialties')">Add new</a>`;
}

function populateSheet(data) {
  const character = data.character;

  document.getElementById('character-name-header').textContent = character.name;

  const headerContent = document.getElementById('header-content');
  headerContent.innerHTML = `
    <div class="header-item"><span>Name:</span> <span id="name" onclick="makeEditable(this, 'name')">${character.name}</span></div>
    <div class="header-item"><span>Age:</span> <span id="age" onclick="makeEditable(this, 'age')">${character.age}</span></div>
    <div class="header-item"><span>Player:</span> <span id="player" onclick="makeEditable(this, 'player')">${character.player}</span></div>
    <div class="header-item"><span>Concept:</span> <span id="concept" onclick="makeEditable(this, 'concept')">${character.concept}</span></div>
    <div class="header-item"><span>Virtue:</span> <span id="virtue" onclick="makeEditable(this, 'virtue')">${character.virtue}</span></div>
    <div class="header-item"><span>Vice:</span> <span id="vice" onclick="makeEditable(this, 'vice')">${character.vice}</span></div>
    <div class="header-item"><span>Chronicle:</span> <span id="chronicle" onclick="makeEditable(this, 'chronicle')">${character.chronicle}</span></div>
    <div class="header-item"><span>Faction:</span> <span id="faction" onclick="makeEditable(this, 'faction')">${character.faction}</span></div>
    <div class="header-item"><span>Group Name:</span> <span id="group_name" onclick="makeEditable(this, 'group_name')">${character.group_name}</span></div>
    <hr class="header-divider">
    <div class="header-item"><span>Date of Birth:</span> <span id="date_of_birth" onclick="makeEditable(this, 'description.date_of_birth')">${character.description.date_of_birth}</span></div>
    <div class="header-item"><span>Hair:</span> <span id="hair" onclick="makeEditable(this, 'description.hair')">${character.description.hair}</span></div>
    <div class="header-item"><span>Eyes:</span> <span id="eyes" onclick="makeEditable(this, 'description.eyes')">${character.description.eyes}</span></div>
    <div class="header-item"><span>Race:</span> <span id="race" onclick="makeEditable(this, 'description.race')">${character.description.race}</span></div>
    <div class="header-item"><span>Nationality:</span> <span id="nationality" onclick="makeEditable(this, 'description.nationality')">${character.description.nationality}</span></div>
    <div class="header-item"><span>Height:</span> <span id="height" onclick="makeEditable(this, 'description.height')">${character.description.height}</span></div>
    <div class="header-item"><span>Weight:</span> <span id="weight" onclick="makeEditable(this, 'description.weight')">${character.description.weight}</span></div>
    <div class="header-item"><span>Sex:</span> <span id="sex" onclick="makeEditable(this, 'description.sex')">${character.description.sex}</span></div>
    <div class="header-item"><span>Distinguishing Characteristics:</span> <span id="distinguishing_characteristics" onclick="makeEditable(this, 'description.distinguishing_characteristics')">${character.description.distinguishing_characteristics}</span></div>
  `;

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
    mentalSkills.innerHTML += `<div class="item"><span><div class="specialty-box ${hasSpecialty ? 'filled' : ''}"></div>${formatSkillName(skill)}</span>${renderDots('skills', 'mental', skill, character.skills.mental[skill])}</div>`;
  }
  const physicalSkills = document.getElementById('physical-skills');
  physicalSkills.innerHTML = '<h3>Physical</h3>';
  for (const skill in character.skills.physical) {
    const hasSpecialty = character.specialties.hasOwnProperty(skill);
    physicalSkills.innerHTML += `<div class="item"><span><div class="specialty-box ${hasSpecialty ? 'filled' : ''}"></div>${formatSkillName(skill)}</span>${renderDots('skills', 'physical', skill, character.skills.physical[skill])}</div>`;
  }
  const socialSkills = document.getElementById('social-skills');
  socialSkills.innerHTML = '<h3>Social</h3>';
  for (const skill in character.skills.social) {
    const hasSpecialty = character.specialties.hasOwnProperty(skill);
    socialSkills.innerHTML += `<div class="item"><span><div class="specialty-box ${hasSpecialty ? 'filled' : ''}"></div>${formatSkillName(skill)}</span>${renderDots('skills', 'social', skill, character.skills.social[skill])}</div>`;
  }

  populateSpecialties(character.specialties);

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

  const statsAndXpEl = document.getElementById('stats-and-xp');
  statsAndXpEl.innerHTML = `
    <div class="item"><span>Size:</span> <span id="size" onclick="makeEditable(this, 'size')">${character.size}</span></div>
    <div class="item"><span>Speed:</span> <span id="speed" onclick="makeEditable(this, 'speed')">${character.speed}</span></div>
    <div class="item"><span>Defense:</span> <span id="defense" onclick="makeEditable(this, 'defense')">${character.defense}</span></div>
    <div class="item"><span>Armor:</span> <span id="armor" onclick="makeEditable(this, 'armor')">${character.armor}</span></div>
    <div class="item"><span>Initiative Mod:</span> <span id="initiative_mod" onclick="makeEditable(this, 'initiative_mod')">${character.initiative_mod}</span></div>
    <h4 class="xp-subheader">Experience</h4>
    <div class="item"><span>Beats:</span> ${renderDots('beats', '', '', character.beats, 5)}</div>
    <div class="item"><span>Total:</span> <span id="total_xp" onclick="makeEditable(this, 'experiences.total')">${character.experiences.total}</span></div>
  `;

  const conditionsEl = document.getElementById('conditions');
  conditionsEl.innerHTML = '<h3>Conditions</h3>';
  character.conditions.forEach((condition, index) => {
    conditionsEl.innerHTML += `<div class="item"><span onclick="makeEditable(this, 'conditions.${index}')">${condition}</span><img src="images/trash_can.png" class="delete-icon" onclick="deleteListItem('conditions', ${index})"></div>`;
  });
  conditionsEl.innerHTML += `<a class="add-link" onclick="addListItem('conditions')">Add new</a>`;

  const aspirationsEl = document.getElementById('aspirations');
  aspirationsEl.innerHTML = '<h3>Aspirations</h3>';
  character.aspirations.forEach((aspiration, index) => {
    aspirationsEl.innerHTML += `<div class="item"><span onclick="makeEditable(this, 'aspirations.${index}')">${aspiration}</span><img src="images/trash_can.png" class="delete-icon" onclick="deleteListItem('aspirations', ${index})"></div>`;
  });
  aspirationsEl.innerHTML += `<a class="add-link" onclick="addListItem('aspirations')">Add new</a>`;
}

function render() {
  populateSheet(characterData);
}

render();

document.addEventListener('DOMContentLoaded', () => {
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
        meritsEditor.json_value = characterData.character.merits;
        meritsEditor.addEventListener('keyup', () => {
            if (meritsEditor.is_valid()) {
                setEdited();
            }
        });
    }
});