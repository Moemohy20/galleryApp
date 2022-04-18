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
  openDialog() {
    this.dialog.open(AddPhotoDialogComponent, {
      width: '500px',
      height: '460px',
    });
  }
  ngOnInit(): void {
    this.showGallery();
  }
  showGallery() {
    return this._AngularFirestore
      .collection('gallery')
      .valueChanges()
      .subscribe((val) => (this.galeryPhotos = val));
  }
}
