import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit{
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

  constructor(private heroService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router, private snackbar: MatSnackBar){}


  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
          .pipe(
            switchMap(({id}) => this.heroService.getHeroById(id)),
          ).subscribe( hero => {
            if(!hero) return this.router.navigateByUrl('/');

            this.reactiveHeroForm.reset(hero); //This helps to assign the values to the reactive form automatically with the hero information that arrives.
            return;
          })
  }

  get currentHeroFromForm(): Hero{
    const hero = this.reactiveHeroForm.value as Hero;
    return hero;
  }

  onSubmit(): void{
    if(this.reactiveHeroForm.invalid) return;

    if(this.currentHeroFromForm.id){
      this.heroService.updateHero(this.currentHeroFromForm)
            .subscribe(hero => {
              this.showSnackbar(`${hero.superhero} updated!`);
            });
      return;
    }

    this.heroService.addHero(this.currentHeroFromForm)
          .subscribe(hero => {
            this.router.navigate(['/heroes/edit', hero.id])
            this.showSnackbar(`${hero.superhero} created!`);
          })
  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'Done', {
      duration: 2500,
    })
  }
}
