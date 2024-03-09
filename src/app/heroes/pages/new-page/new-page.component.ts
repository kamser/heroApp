import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {
  /**To create a Reactive form, I need to create a general FormGroup and inner that FormGroup, create
   * the the FormControl whom represents the values or atributes that I want to handle
   * with my reactive form, so normally, we put all the inputs we have
   * in the form UI and the variables that handle those inputs values.
   */
  reactiveHeroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics), //This needs to have a specific value
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publisherOptions = [
    {id: 'DC Comics', desc: 'DC-Comics'},
    {id: 'Marverl comics', desc: 'Marvel-Studios'},
  ];

  constructor(private heroService: HeroesService){}

  get currentHeroFromForm(): Hero{
    const hero = this.reactiveHeroForm.value as Hero;
    return hero;
  }

  onSubmit(): void{
    if(this.reactiveHeroForm.invalid) return;

    if(this.currentHeroFromForm.id){
      this.heroService.updateHero(this.currentHeroFromForm)
            .subscribe(hero => {
              console.log(hero);
            });
      return;
    }

    this.heroService.addHero(this.currentHeroFromForm)
          .subscribe(hero => {
            //show the snacbar
          })
  }
}
