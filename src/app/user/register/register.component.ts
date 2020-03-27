import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../common/service/user.service';
import {UserModel} from '../common/model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string;

  constructor(private readonly userService: UserService,
              private readonly  fb: FormBuilder,
              private readonly router: Router) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.registerForm.invalid) {
      if (this.registerForm.get('name').invalid) {
        this.errors = `Name is invalid`
        return
      }
      if (this.registerForm.get('email').invalid) {
        this.errors = `Email is invalid`
        return
      }
      if (this.registerForm.get('password').invalid) {
        this.errors = `Password is invalid`
        return
      }
      return
    }
    if (this.registerForm.get('password').value !== this.registerForm.get('passwordConfirm').value) {
      this.errors = `Password does not match!`
      return
    }
    const user: UserModel = {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value

    }
    this.userService.registerUser(user).subscribe( () => {
       this.router.navigate(['/login']).catch(err => console.log(err)),
      alert(`Account successfully created!`)
    },
      err => {
      this.errors = err.error
      })
  }
}
