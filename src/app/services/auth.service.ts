import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _FireAuth: AngularFireAuth, private _Router: Router) {
    let user = localStorage.getItem('user');
    if (user && user !== null) {
      this.currentUser.next(JSON.parse(user));
    }
  }

  currentUser = new BehaviorSubject<any>('');

  createUserWithEmailAndPassword(regForm: FormGroup) {
    const { email, password } = regForm.value;
    this._FireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        this.currentUser.next(userInfo.user);
        localStorage.setItem('user', JSON.stringify(userInfo.user));
        this._Router.navigate(['/home']);
      })
      .catch((err) => alert(err.code));
  }

  async createUserWithGoogle() {
    await this._FireAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((userInfo) => {
        this.currentUser.next(userInfo.user);
        this._Router.navigate(['home']);
      })
      .catch((err) => {
        alert(err.code);
      });
    return await this._Router.navigate(['home']);
  }

  loginWithEmailAndPasswrod(loginForm: FormGroup) {
    const { email, password } = loginForm.value;
    this._FireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userInfo) => {
        this.currentUser.next(userInfo.user);
        localStorage.setItem('user', JSON.stringify(userInfo.user));
        this._Router.navigate(['home']);
      })
      .catch((error) => {
        alert(error.code);
      });
  }

  signOut() {
    this._FireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.currentUser.next(null);
      this._Router.navigate(['login']);
    });
  }
}
