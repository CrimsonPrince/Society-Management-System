import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss']
})
export class PokemonInfoComponent implements OnInit {

  public pokemon: Pokemon;
  private Color = require('color');

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemon(this.route.snapshot.paramMap.get('id')).subscribe( data => {
      this.pokemon = data;
      const color = this.Color(this.pokemon.color[0]).darken(0.5);
      console.log(color.toString());
      if (this.pokemon.color.length > 1){
        document.documentElement.style.setProperty('--primary-color', this.pokemon.color[1]);
        document.documentElement.style.setProperty('--secondary-color', this.pokemon.color[0]);
        document.documentElement.style.setProperty('--primary-dark', this.Color(this.pokemon.color[1]).darken(0.25));
      }
      else {
        document.documentElement.style.setProperty('--primary-color', this.pokemon.color[0]);
        document.documentElement.style.setProperty('--secondary-color', this.pokemon.color[0]);
        document.documentElement.style.setProperty('--primary-dark', this.Color(this.pokemon.color[0]).darken(0.25));
      }
    });
  }

}
