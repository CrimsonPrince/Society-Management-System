import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';

@Injectable({ providedIn: "root"})
export class PokemonService {
  private pokemon: any[] = [];

  constructor(private http: HttpClient) {}

  getAllPokemon() {
    return this.http.get('http://localhost:3001/pokemons/1');
  }
}
