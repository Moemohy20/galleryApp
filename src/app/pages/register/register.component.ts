import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public auth: AngularFireAuth,
    private _Router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.min(5)]],
    });
  }

  ngOnInit(): void {}

  createUser() {
    const { email, password } = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      this._Router.navigate(['/home']);
    });
  }
}
