import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { NgForm } from '@angular/forms';
import { Pokemon } from '../pokemon.model';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private authService: AuthService) {
    this.loggedIn = this.authService.isLoggedIn();
  }

  default = 'name';
  public pokemons: Pokemon[];
  public loggedIn: boolean;

  ngOnInit(): void {

  }

  onSearch(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      console.log("Form Invalid");
      return;
    }
    this.pokemonService.search(form.value.query, form.value.type).subscribe(data => {
      console.log(data);
      this.pokemons = data;
    });
  }

  add(pokemon) {
    this.authService.addPokemon(pokemon._id).subscribe(data =>
      console.log(data)
    );
  }
}
