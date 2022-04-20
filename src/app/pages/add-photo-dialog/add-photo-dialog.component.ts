import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment-timezone';

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

  ngOnInit(): void {}

  downloadURL: Observable<string> | undefined;
  path: any;

  addPhotoForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(12)]],
    photo: [null, [Validators.required]],
  });

  uploadFile($event: any) {
    this.path = $event.target.files[0];
  }

  async addNewPhotoTofire() {
    this.addNewPhoto(this.addPhotoForm.value.title, this.path);
  }

  addNewPhoto(title: string, photo: File) {
    const filePath = `photos/${photo.name}`;
    const fileRef = this._AngularFireStorage.ref(filePath);
    const uploadPhoto = this._AngularFireStorage.upload(
      `photos/${photo.name}`,
      photo
    );
    uploadPhoto
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((photoUrl) => {
            this._AngularFirestore.collection('gallery').add({
              title: title,
              photoUrl,
              date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            });
          });
        })
      )
      .subscribe();
  }
}
