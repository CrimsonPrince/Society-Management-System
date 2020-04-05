import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {


  pokemons = [
    {
      name : "Squirtle",
      description: "Squirtles Hai",
      imageurl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png"
    },
    {
      name : "Squirtle",
      description: "Squirtles Hai",
      imageurl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png"
    },
    {
      name : "Squirtle",
      description: "Squirtles Hai",
      imageurl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png"
    }
  ]

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemon().subscribe( data => {
      console.log(typeof(data));
    })
  }

}
