import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.model';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public pokemons: Pokemon[];
  public loggedIn: boolean;

  constructor(private pokemonService: PokemonService, private authService: AuthService) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemon().subscribe(data => {
      this.pokemons = data;
    });

    this.loggedIn = this.authService.isLoggedIn();
    console.log(this.loggedIn);
  }

  add(pokemon) {
    this.authService.addPokemon(pokemon.id).subscribe(data =>
      console.log(data)
    );
  }

}
