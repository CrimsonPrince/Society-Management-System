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
      console.log(this.pokemons);
    });

    this.loggedIn = this.authService.isLoggedIn();
  }

  add(pokemon) {
    this.authService.addPokemon(pokemon._id).subscribe(data =>
      console.log(data)
    );
  }

}
