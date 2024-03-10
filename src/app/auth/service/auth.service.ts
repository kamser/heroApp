import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { User } from '../interfaces/user.interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = enviroments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if(!this.currentUser) return undefined;

    //return this.user; this is the wrong way, because here I am returning the reference to the object, which means that it can be mutable for external factors and I dont want that for the user.
    //return {...this.user}; this is a normal way to do it, because it will return a new object with the the data that the user has, but it is not a reference, so, they could do any changes over the returned object that non of them will affect the original object.
    return structuredClone(this.user); //This is the best way to do it, because it create a deep clone of the object and send an identical object but not the same object, so it doesnt sent the reference, just the data.

  }

  login(email: string, password: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( (user: User) => this.user = user),
        tap( (user: User) => localStorage.setItem('token', user.id.toString()) ),
      );
  }

  logout(): void{
    this.user = undefined;
    localStorage.clear();
  }
}
