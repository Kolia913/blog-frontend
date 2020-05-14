import {Component, OnInit} from '@angular/core';
import {ChatService} from '../common/service/chat.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/common/service/user.service';
import {MessageModel} from '../common/model/chat-message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  chatForm: FormGroup;
  messages: MessageModel[];

  constructor(readonly chatService: ChatService,
              private readonly fb: FormBuilder,
              readonly userService: UserService) {
    this.chatForm = this.fb.group({
      msg: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });
  }

  ngOnInit(): void {
    this.chatService.chatMessages.valueChanges().subscribe( messages => {
      this.messages = messages
    })
  }

  async submit(): Promise<void> {
    if (this.chatForm.valid) {
      if (await this.userService.isLoggedIn()) {
        await this.chatService.sendMessage(this.chatForm.get('msg').value);
        this.chatForm.reset();
      }
    }
  }
}
