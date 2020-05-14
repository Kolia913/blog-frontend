import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageListComponent } from './message-list/message-list.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {ChatService} from './common/service/chat.service';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { ScrollerDirective } from './common/directive/scroller.directive';



@NgModule({
  declarations: [ChatroomComponent, MessageItemComponent, MessageListComponent, ScrollerDirective],
  imports: [
    CommonModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ChatroomComponent
  ],
  providers: [ChatService]
})
export class ChatModule { }
