import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _AngularFireAuth: AngularFireAuth,
    private _Router: Router
  ) {}

  ngOnInit(): void {}
  onLogOut() {
    this._AngularFireAuth
      .signOut()
      .then(() => this._Router.navigate(['login']));
  }
}
