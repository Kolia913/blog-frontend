import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {MessageModel} from '../model/chat-message.model';
import {UserService} from '../../../user/common/service/user.service';

@Injectable()
export class ChatService {
  chatMessages: AngularFireList<MessageModel>;

  constructor(private readonly db: AngularFireDatabase,
              private readonly userService: UserService) {
    this.chatMessages = this.db.list('/messages');
  }

  sendMessage(msg: string): void {
    const timestamp = this.getTimeStamp()
    this.userService.getUser(this.userService.getId()).subscribe(user => {
        const message: MessageModel = {
          message: msg,
          timeSent: timestamp,
          userName: user.name,
          email: user.email
        }
        this.chatMessages.push(message)
      },
      error => console.log(error));
  }
  /*
  getMessages(): AngularFireList<MessageModel> {
     return this.db.list('/messages', ref => ref.limitToLast(50).orderByKey())
   }
   */

  getTimeStamp(): string {
    const now = new Date();
    const date = now.getFullYear() + '/' +
      (now.getMonth() + 1) + '/' +
      now.getDate();
    const time = now.getHours() + ':' +
      now.getMinutes() + ':' +
      now.getSeconds();
    return (date + ' ' + time);
  }
}
