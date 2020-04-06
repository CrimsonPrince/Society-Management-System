import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Injectable({ providedIn: "root"})
export class PokemonService {
  private pokemon: any[] = [];

  constructor(private http: HttpClient) {}

  getAllPokemon() {
    return this.http.get<Pokemon[]>('http://localhost:3001/pokemon/');
  }

  getPokemon(id: string) {
    return this.http.get<Pokemon>('http://localhost:3001/pokemon/' + id);
  }
}
