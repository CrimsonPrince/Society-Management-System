import json
from pprint import pprint

with open('pokemon.json') as f:
  data = json.load(f)

for pokemon in data["pokemon"]:
    pokemon['color'] = []
    pokemon['id'] = int(pokemon['id'])
    pokemon['evolvedfrom'] = int(pokemon['id'])
    pokemon['evolutions'] = list(map(int, pokemon['evolutions']))
    for poketype in pokemon['typeofpokemon']:
      for pokeData in data['Types']:
        if poketype in pokeData['name']:
          index = pokeData['name'].index(poketype)
          color = pokeData['color']
          pokemon['color'].append(color)
    # for poketype in data['Types']:
    #     if poketype['name'] in pokemon['typeofpokemon']:
    #         color = poketype['color']
    #         pokemon['color'].append(color)


with open('pokemon-final.json', 'w') as data_file:
    data = json.dump(data, data_file)