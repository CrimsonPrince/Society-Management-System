import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon/pokemon.model';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-personal-pokemon-list',
  templateUrl: './personal-pokemon-list.component.html',
  styleUrls: ['./personal-pokemon-list.component.css']
})
export class PersonalPokemonListComponent implements OnInit {

  public pokemons: Pokemon[];

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.getPokemon().subscribe( data => {
      console.log(data);
    });
  }

  remove() {
    console.log("removed");
  }
}
