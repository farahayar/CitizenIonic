import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _us: UserService, private router: Router) { }

  ngOnInit() {
  }
  login(form) {
    this._us.loginUser(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }
}
