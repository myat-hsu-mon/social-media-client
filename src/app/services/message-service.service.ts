import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  receivedMessage = new BehaviorSubject<{}>({});
  constructor() { }

  getMessage(message){
    this.receivedMessage.next(message);
  }
}
