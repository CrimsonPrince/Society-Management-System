import * as moment from "moment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from "./user.model";
import { CreateUser } from "./create.model";
import { AuthUser } from "./auth.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root"})
export class AuthService {

    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient) {

    }

    getAuthStatusListener() {
      return this.authStatusListener.asObservable();
    }

    getAuthStatus() {
      return this.authStatusListener;
    }

    getPokemon() {
      return this.http.get("http://localhost:3000/users/pokemon");
    }

    addPokemon(pokemonId) {
      return this.http.post("http://localhost:3000/users/pokemon", {"pokemonId": pokemonId});
    }

    removePokemon(pokemonId) {
      return this.http.post('http://localhost:3000/users/pokemon/delete', {"pokemonId": pokemonId});
    }

    login(email: string, password: string ) {
        this.authStatusListener.next(true);
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
