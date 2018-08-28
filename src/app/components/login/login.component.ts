import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(private _chat: ChatService) { }

  login(provider: string) {
    console.log(provider);
    this._chat.login(provider);
  }

}
