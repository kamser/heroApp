import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(heroId: string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${heroId}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero); //Second parameter are the values that going to be use to create the row on the database.
  }

  updateHero(hero: Hero): Observable<Hero>{
    if(!hero){
      throw Error('Hero id is required');
    }
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero); //Second parameter are the values that going to be use to create the row on the database.
  }

  deleteHero(id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
              catchError(err => of(false)),
              map(resp => true), //This transform the response to a value that we need, whatever it return, it going to be a observable by default
            );
  }

}
