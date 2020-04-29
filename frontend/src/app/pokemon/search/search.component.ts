import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { NgForm } from '@angular/forms';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  default = 'name';
  public pokemons: Pokemon[];

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

}
