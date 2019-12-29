import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  receivedMessage = new BehaviorSubject<{}>({});
  constructor() { }

  getMessage(message){
    console.log('total message inside service:',message)
    this.receivedMessage.next(message);
  }
}
