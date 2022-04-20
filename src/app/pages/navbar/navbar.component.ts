import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _AngularFireAuth: AngularFireAuth,
    private _Router: Router,
    private _AuthService: AuthService
  ) {
    this._AuthService.currentUser.subscribe((data) => {
      if (data && data !== null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  isLogin: boolean = false;

  ngOnInit(): void {}
  onLogOut() {
    this._AuthService.signOut();
  }
}
