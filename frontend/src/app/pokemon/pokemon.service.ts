import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Injectable({ providedIn: "root"})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getAllPokemon() {
    return this.http.get<Pokemon[]>('https://pokeapi.r4.ie/pokemon/');
  }

  getPokemon(id: string) {
    return this.http.get<Pokemon>('https://pokeapi.r4.ie/pokemon/' + id);
  }

  search(query: string, type: string) {
    console.log(type)
    if(type == "name") { return this.http.post<Pokemon[]>('https://pokeapi.r4.ie/pokemon/search/name', { "query": query}); }
    if(type == "level") { return this.http.post<Pokemon[]>('https://pokeapi.r4.ie/pokemon/search/level', { "query": query}); }
    if(type == "category") { return this.http.post<Pokemon[]>('https://pokeapi.r4.ie/pokemon/search/category', { "query": query}); }
  }
}
