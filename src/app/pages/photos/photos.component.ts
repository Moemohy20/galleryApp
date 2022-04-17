import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoDialogComponent } from '../add-photo-dialog/add-photo-dialog.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  galeryphotos: string[] = ['', '', '', '', ''];
  openDialog() {
    this.dialog.open(AddPhotoDialogComponent, {
      width: '500px',
      height: '460px',
    });
  }
}
