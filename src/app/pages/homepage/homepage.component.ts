import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  getFirestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private _AngularFirestore: AngularFirestore) {}
  savedHtml: any;
  unsavedHtml: string = '';
  editorContent: string = '';
  test1: any;
  firestore = getFirestore();
  ngOnInit(): void {
    this.getFroalaContent();
  }

  options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
  };

  saveFroalaContent() {
    this._AngularFirestore
      .collection('Froala Content')
      .doc('HTMLContent')
      .set({
        content: this.editorContent,
      })
      .then(() => console.log('addedd data sucess'));
  }
  async getFroalaContent() {
    onSnapshot(doc(this.firestore, 'Froala Content', 'HTMLContent'), (doc) => {
      return (this.editorContent = doc.get('content'));
    });
  }
}
