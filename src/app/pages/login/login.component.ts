import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  user: any;
  constructor(private fb: FormBuilder, private _AuthService: AuthService) {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,10}$/)],
      ],
    });
  }

  ngOnInit(): void {}

  async loginWithGoogle() {
    return this._AuthService.createUserWithGoogle();
  }

  onLogin() {
    return this._AuthService.loginWithEmailAndPasswrod(this.userLoginForm);
  }
}
