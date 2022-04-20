import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoDialogComponent } from '../add-photo-dialog/add-photo-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _AngularFirestore: AngularFirestore
  ) {}

  galeryPhotos: any[] = [];

  ngOnInit(): void {
    this.showGallery();
  }

  openDialog() {
    this.dialog.open(AddPhotoDialogComponent, {
      width: '500px',
      height: '460px',
    });
  }

  deletePhoto(id: string) {
    return this._AngularFirestore.doc('gallery/' + id).delete();
  }

  async showGallery() {
    const snapshot = this._AngularFirestore.collection('gallery');
    let data = snapshot.valueChanges({ idField: 'id' });
    return data.subscribe((val) => {
      this.galeryPhotos = val;
    });
  }
}
