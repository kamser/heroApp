import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  //this object is related with the reactive forms, and it gaves a lot of information about the form and the way it is had been used.
  public searchInput = new FormControl('');
}
