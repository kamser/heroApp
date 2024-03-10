import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../interfaces/user.interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private authService: AuthService, private router: Router){}

  onLogin(): void{
    this.authService.login("test", "test")
        .subscribe( (user: User) => {
          this.router.navigate(['/']);
        } )
  }
}
