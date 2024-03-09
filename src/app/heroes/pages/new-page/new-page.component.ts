import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {
  public publisherOptions = [
    {id: 'DC Comics', desc: 'DC-Comics'},
    {id: 'Marverl comics', desc: 'Marvel-Studios'},
  ];
}
