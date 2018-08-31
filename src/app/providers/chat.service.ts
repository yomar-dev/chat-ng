import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  public user: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {

      if (!user) {
        return;
      } else {
        this.user.name = user.displayName;
        this.user.uid = user.uid;
      }
    });
  }

  login(provider: string) {
    if (provider === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(7));
    return this.itemsCollection.valueChanges().pipe(map((messages: Message[]) => {
      this.chats = [];
      for (const message of messages) {
        this.chats.unshift(message);
      }
      console.log(messages);
    }));
  }

  sendMessage(msg: string) {
    const message: Message = {
      name: this.user.name,
      message: msg,
      date: new Date().getTime(),
      uid: this.user.uid
    };

    return this.itemsCollection.add(message);
  }
}
