import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit {

  public pokemon: Pokemon;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemon(this.route.snapshot.paramMap.get('id')).subscribe( data => {
      this.pokemon = data;
    });
  }

}
