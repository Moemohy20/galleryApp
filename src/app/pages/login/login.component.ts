import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginFrm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _auth: AngularFireAuth,
    private _router: Router
  ) {
    this.userLoginFrm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}
  onLogin() {
    const { email, password } = this.userLoginFrm.value;
    this._auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this._router.navigate(['home']));
  }
}
