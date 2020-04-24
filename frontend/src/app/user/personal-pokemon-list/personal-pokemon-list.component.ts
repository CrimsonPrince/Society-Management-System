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
  public loggedIn: boolean;

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.getPokemon().subscribe( data => {
        this.pokemons = (data as Pokemon[]);
    });
    this.loggedIn = this.userService.isLoggedIn();
  }

  remove(pokemon) {
    this.userService.removePokemon(pokemon._id).subscribe(data => {
      console.log(data);
    });
    let index = -1;
    this.pokemons.forEach(function (poke, i) {
      if(poke._id == pokemon._id)
      {
        index = i;
      }
    });
    if (index !== -1) this.pokemons.splice(index, 1);
    console.log(this.pokemons);
  }
}
