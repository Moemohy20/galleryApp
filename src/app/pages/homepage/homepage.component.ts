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
    // this.getFroalaContent();
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
    // return this._AngularFirestore
    //   .collection('Froala Content')
    //   .doc('HTMLContent')
    //   .valueChanges()
    //   .subscribe(
    //     (val) => ((this.savedHtml = val), console.log(this.savedHtml))
    //   );
    //   return this._AngularFirestore
    //     .collection('Froala Content')
    //     .valueChanges()
    //     .subscribe((val) => (this.galeryPhotos = val));
    // const getData = onSnapshot();
    // const readDoc = collection(firestore, 'Froala Content');

    // sh8ala 3ady
    const readData = onSnapshot(
      doc(this.firestore, 'Froala Content', 'HTMLContent'),
      (doc) => {
        this.savedHtml = doc.get('content');
        // this.savedHtml.push(doc.data());
        console.log('current data: ', doc.get('content'));
      }
    );

    // EDNNNNadasdasd

    // await setDoc(doc(citiesRef, 'content'), {
    //   name: 'Beijing',
    //   state: null,
    //   country: 'China',
    //   capital: true,
    //   population: 21500000,
    //   regions: ['jingjinji', 'hebei'],
    // });
    // console.log('hello');
  }
}

// this._AngularFirestore
// .collection('gallery')
// .add({
//   title: this.addPhotoForm.value.title,
//   photoUrl,
//   date: moment().format('MMMM Do YYYY, h:mm:ss a'),
// })
// .then(() => resolve('image addd susceful'));

// showGallery() {
//   return this._AngularFirestore
//     .collection('gallery')
//     .valueChanges()
//     .subscribe((val) => (this.galeryPhotos = val));
// }
