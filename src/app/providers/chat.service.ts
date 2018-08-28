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
    this.itemsCollection = this.afs.collection<Message>('chats');
    return this.itemsCollection.valueChanges().pipe(map((messages: Message[]) => {
      this.chats = messages;
      console.log(messages);
    }));
  }
}
