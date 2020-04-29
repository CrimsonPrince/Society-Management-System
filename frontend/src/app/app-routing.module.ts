import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonInfoComponent } from './pokemon/pokemon-info/pokemon-info.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { LoginComponent } from './user/login/login.component';
import { PersonalPokemonListComponent } from './user/personal-pokemon-list/personal-pokemon-list.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { SearchComponent } from './pokemon/search/search.component';


const routes: Routes = [
  { path: '', component: PokemonListComponent},
  { path: 'pokemon/search', component: SearchComponent},
  { path: 'pokemon/:id', component: PokemonInfoComponent},
  { path: 'user/create', component: CreateUserComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/pokemon', component: PersonalPokemonListComponent},
  { path: 'user/edit', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
