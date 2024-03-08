import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { Observable, catchError, of } from 'rxjs';
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
    return this.http.get<Hero[]>(`/heroes?q=${query}&_limit=6`);
  }

}
