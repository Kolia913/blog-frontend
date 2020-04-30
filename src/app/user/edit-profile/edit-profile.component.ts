import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {UserService} from '../common/service/user.service';
import {UserModel} from '../common/model/user.model';
import {Router} from '@angular/router';
import {UserEditModel} from '../common/model/user-edit.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  errors: string;
  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router) {
    this.editProfileForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, [Validators.minLength(6)]),
      password: new FormControl(null,  [Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
    this.userService.getUser(this.userService.getId()).subscribe(item => {
      this.editProfileForm
        .patchValue({
          name: item.name,
          email: item.email,
        })
    },
    err => {
      this.errors = err.error
    })
  }

  async submit(): Promise<void> {
    if (this.editProfileForm.get('passwordConfirm').value || this.editProfileForm.get('password').value) {
    if (this.editProfileForm.get('passwordConfirm').value !== this.editProfileForm.get('password').value) {
      this.errors = `Password does not match!`
      return
    }
    if (this.editProfileForm.get('password').invalid) {
        this.errors = `"password" length must be at least 6 characters long`
        return
      }
  }
    if (this.editProfileForm.invalid) {
      if (this.editProfileForm.get('email').invalid) {
        this.errors = `"email" must be a valid email`
        return
      }
      if (this.editProfileForm.get('oldPassword').invalid) {
        this.errors = `"password" length must be at least 6 characters long`
        return
      }
      return
    }
    const user: UserEditModel = {
      email: this.editProfileForm.get('email').value,
      name: this.editProfileForm.get('name').value,
      password: this.editProfileForm.get('password').value,
      oldPassword: this.editProfileForm.get('oldPassword').value
    }
    await this.userService.editUser(user).subscribe(() => {
      this.router.navigate(['/']).catch(err => console.log(err))
    },
      err => {
      this.errors = err.error
    })
  }
}
