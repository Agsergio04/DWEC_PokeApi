'use strict';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const API_LIST = 'https://pokeapi.co/api/v2/pokemon?limit=1008';

const searchForm = document.getElementById('searchForm');
const pokemonInput = document.getElementById('pokemonInput');
const autocompleteList = document.getElementById('autocompleteList');
const pokemonCard = document.getElementById('pokemonCard');
const errorMessage = document.getElementById('errorMessage');
const pokemonName = document.getElementById('pokemonName');
const pokemonId = document.getElementById('pokemonId');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonStats = document.getElementById('pokemonStats');

let pokemonNames = [];

// Carga nombres de Pokémon una vez al iniciar
fetch(API_LIST)
  .then(r => r.json())
  .then(data => {
    pokemonNames = data.results.map(x => x.name);
  });

// Autocompletado con soporte para nombres Y números
pokemonInput.addEventListener('input', () => {
  const query = pokemonInput.value.trim().toLowerCase();
  autocompleteList.innerHTML = '';
  
  if (!query) {
    autocompleteList.style.display = 'none';
    return;
  }

  // Si es un número, buscar directamente
  if (/^\d+$/.test(query)) {
    searchPokemon(query);
    autocompleteList.style.display = 'none';
    return;
  }

  // Si es texto, filtrar nombres
  const filtered = pokemonNames.filter(name => name.startsWith(query)).slice(0, 15);
  
  if (!filtered.length) {
    autocompleteList.style.display = 'none';
    return;
  }
  
  filtered.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    li.onclick = () => {
      pokemonInput.value = name;
      autocompleteList.style.display = 'none';
      searchPokemon(name);
    };
    autocompleteList.appendChild(li);
  });
  
  autocompleteList.style.display = 'block';

  // Navegación con teclado
  let current = -1;
  pokemonInput.onkeydown = function(e) {
    const items = autocompleteList.querySelectorAll('li');
    if (!items.length) return;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      current = (current + 1) % items.length;
      items.forEach((el, i) => el.classList.toggle('active', i === current));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      current = (current - 1 + items.length) % items.length;
      items.forEach((el, i) => el.classList.toggle('active', i === current));
    }
    if (e.key === "Enter" && current >= 0) {
      e.preventDefault();
      items[current].click();
    }
    if (e.key === "Escape") {
      autocompleteList.innerHTML = '';
      autocompleteList.style.display = 'none';
    }
  };
});

// Buscar con el botón
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const query = pokemonInput.value.trim();
  if (query) {
    searchPokemon(query);
    autocompleteList.innerHTML = '';
    autocompleteList.style.display = 'none';
  }
});

function searchPokemon(query) {
  hideElements();
  fetch(`${API_URL}${query.toLowerCase()}`)
    .then(response => {
      if (!response.ok) throw new Error('Pokémon no encontrado');
      return response.json();
    })
    .then(data => {
      displayPokemon(data);
    })
    .catch(() => {
      showError();
    });
}

function displayPokemon(data) {
  pokemonName.textContent = data.name;
  pokemonId.textContent = `#${String(data.id).padStart(3, '0')}`;

  // Imagen animada GIF de PokéAPI y fallback PNG
  const animatedGIF = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`;
  const artworkPNG = data.sprites.other['official-artwork'].front_default || data.sprites.front_default || '';
  pokemonImage.onerror = function () {
    pokemonImage.src = artworkPNG;
  };
  pokemonImage.src = animatedGIF;
  pokemonImage.alt = `Sprite animado de ${data.name}`;

  pokemonWeight.textContent = `${(data.weight / 10).toFixed(1)} kg`;
  pokemonHeight.textContent = `${(data.height / 10).toFixed(1)} m`;

  pokemonTypes.innerHTML = '';
  data.types.forEach(typeInfo => {
    pokemonTypes.appendChild(createTypeElement(typeInfo.type.name));
  });

  pokemonStats.innerHTML = '';
  data.stats.forEach(statInfo => {
    pokemonStats.appendChild(createStatElement(statInfo));
  });

  pokemonCard.classList.remove('pokemon-card--hidden');
  pokemonCard.classList.add('pokemon-card--visible');
}

function createTypeElement(typeName) {
  const typeTranslations = {
    normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico', grass: 'Planta', ice: 'Hielo',
    fighting: 'Lucha', poison: 'Veneno', ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
    rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro', steel: 'Acero', fairy: 'Hada'
  };
  const traduccion = typeTranslations[typeName] || typeName;
  const typeElement = document.createElement('span');
  typeElement.className = `pokemon-type pokemon-type--${typeName}`;
  typeElement.textContent = traduccion;
  return typeElement;
}

function createStatElement(statInfo) {
  const statItem = document.createElement('div');
  statItem.className = 'pokemon-stats__item';

  const statName = document.createElement('span');
  statName.className = 'pokemon-stats__name';
  statName.textContent = translateStatName(statInfo.stat.name);

  const barContainer = document.createElement('div');
  barContainer.className = 'pokemon-stats__bar-container';

  const bar = document.createElement('div');
  bar.className = 'pokemon-stats__bar';
  bar.style.width = `${(statInfo.base_stat / 255) * 100}%`;

  const statValue = document.createElement('span');
  statValue.className = 'pokemon-stats__value';
  statValue.textContent = statInfo.base_stat;

  barContainer.appendChild(bar);
  statItem.appendChild(statName);
  statItem.appendChild(barContainer);
  statItem.appendChild(statValue);

  return statItem;
}

function translateStatName(statName) {
  const translations = {
    'hp': 'PS',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'special-attack': 'At. Especial',
    'special-defense': 'Def. Especial',
    'speed': 'Velocidad'
  };
  return translations[statName] || statName;
}

function hideElements() {
  pokemonCard.classList.remove('pokemon-card--visible');
  pokemonCard.classList.add('pokemon-card--hidden');
  errorMessage.classList.remove('error-message--visible');
  errorMessage.classList.add('error-message--hidden');
}

function showError() {
  errorMessage.classList.remove('error-message--hidden');
  errorMessage.classList.add('error-message--visible');
}
