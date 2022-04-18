import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment-timezone';
// import { Firestore, doc } from '@angular/fire/firestore';
@Component({
  selector: 'app-add-photo-dialog',
  templateUrl: './add-photo-dialog.component.html',
  styleUrls: ['./add-photo-dialog.component.scss'],
})
export class AddPhotoDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _AngularFireStorage: AngularFireStorage,
    private _AngularFirestore: AngularFirestore
  ) {}
  // selectedFile: File = null;
  downloadURL: Observable<string> | undefined;
  ngOnInit(): void {}
  upload($event: any) {
    this.path = $event.target.files[0];
    console.log(this.path);
  }
  addPhotoForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(12)]],
    photo: [null, [Validators.required]],
  });

  path: any;
  fo: any;
  addNewPhoto(event: any) {
    // console.log(event.target.value);
    return new Promise((resolve, reject) => {
      var n = Date.now();
      const file = event.target.files[0];
      const filePath = `photos/${event.target.files[0].name}`;
      const fileRef = this._AngularFireStorage.ref(filePath);
      const task = this._AngularFireStorage.upload(
        `photos/${event.target.files[0].name}`,
        file
      );
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe((photoUrl) => {
              this._AngularFirestore
                .collection('gallery')
                .add({
                  title: this.addPhotoForm.value.title,
                  photoUrl,
                  date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                })
                .then(() => resolve('image addd susceful'));
            });
          })
        )
        .subscribe(() => {
          resolve(console.log('image upload succceful'));
        });
    });
  }
}
