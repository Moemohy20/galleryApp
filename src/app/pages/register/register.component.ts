import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private _AuthService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,10}$/)],
      ],
    });
  }

  ngOnInit(): void {}

  createUserWithEmailAndPassword() {
    return this._AuthService.createUserWithEmailAndPassword(this.registerForm);
  }

  createUserWithGoogle() {
    return this._AuthService.createUserWithGoogle();
  }
}
