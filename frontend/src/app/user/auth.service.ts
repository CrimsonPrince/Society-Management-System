import * as moment from "moment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from "./user.model";
import { CreateUser } from "./create.model";
import { AuthUser } from "./auth.model";

@Injectable({ providedIn: "root"})
export class AuthService {

    constructor(private http: HttpClient) {

    }

    getPokemon() {
      return this.http.get("http://localhost:3000/users/pokemon");
    }

    addPokemon(pokemonId) {
      return this.http.post("http://localhost:3000/users/pokemon", {"pokemonId": pokemonId});
    }

    login(email: string, password: string ) {
        return this.http.post<AuthUser>('http://localhost:3000/login', {email, password}).pipe(tap(val => this.setSession(val)));
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    getToken() {
        return localStorage.getItem("id_token");
    }
    public isLoggedIn() {
        return moment().isAfter(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    createUser(name: string, email: string, password: string, address: string, gender: string) {
      const createModel: CreateUser = { name, email, password, address, gender};
      console.log(createModel);
      return this.http.post('http://localhost:3000/register', createModel);
    }
}
