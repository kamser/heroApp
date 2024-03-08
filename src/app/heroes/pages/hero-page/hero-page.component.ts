import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{
  public hero?: Hero;

  //the activatedRout is to have access to the params that came in the URL, so to have access to the URL.
  //The router is use to redirect the use to other page progrmatically in case no hero were found.
  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router){}

  //this is use to get the data related to the sevice as soon as this component start.
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroById(id)),
      ).subscribe( hero => {
        if(!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        console.log(hero);
        return;
      });
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }
}
