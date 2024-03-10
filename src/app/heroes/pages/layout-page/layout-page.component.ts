import { Component } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItems = [
    {
      label: 'listado', icon: 'label', url: './list'
    },
    {
      label: 'Agregar', icon: 'add', url: './new-hero'
    },
    {
      label: 'Buscar', icon: 'search', url: './search'
    }
  ];

  constructor(private authService: AuthService){}

  onLogout(){
    this.authService.logout();
  }
}
