import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonInfoComponent } from './pokemon/pokemon-info/pokemon-info.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { LoginComponent } from './user/login/login.component';


const routes: Routes = [
  { path: '', component: PokemonListComponent},
  { path: 'pokemon/:id', component: PokemonInfoComponent},
  { path: 'user/create', component: CreateUserComponent },
  { path: 'user/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
