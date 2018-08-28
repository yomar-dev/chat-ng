import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore) { }

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
      name: 'Demo',
      message: msg,
      date: new Date().getTime()
    };

    return this.itemsCollection.add(message);
  }
}
