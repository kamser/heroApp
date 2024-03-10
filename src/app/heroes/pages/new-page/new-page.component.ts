import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';


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

  constructor(private heroService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog){}


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

  onDeleteHero(){
    if(!this.currentHeroFromForm.id) throw Error('Hero is required!');

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.reactiveHeroForm.value
    });


    /**
     * What this does is first do all the actions on the pipe. the filter pipe what it does is check if the right side is true or false,
     * in this case, for the firs filter, we expect a boolean response from the dialog, so I just check the value of the arriaval value.
     * After the first filter, I do the delete, which is an Observer, but, it is on the pipe, so the pipe does an internal subscirbe and
     * excute the logic of the deleteHero. The deleteHero return a boolean, so in the second filter I have to check again the incoming
     * value, if it is true, it will continue to the subscribe, even with this one being out of the pipe, doesn't matter. But if the result is
     * false, it will stop on the filter and not execute the next step, which in this case is the subscribe. So the order is: filter, switchMap, filter and subscribe.
     */
    dialogRef.afterClosed()
        .pipe(
          filter( (dialogChoice : boolean) => dialogChoice),
          switchMap( (dialogChoice: boolean) => this.heroService.deleteHero(this.currentHeroFromForm.id) ),
          filter( (wasDeleted: boolean) => wasDeleted),
        )
    .subscribe(result => {
      this.router.navigate(['/heroes']);
    });

    /*dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.heroService.deleteHero(this.currentHeroFromForm.id);

      this.router.navigate(['/heroes']);
    });*/
  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'Done', {
      duration: 2500,
    })
  }
}
