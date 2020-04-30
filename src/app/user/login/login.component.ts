import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../common/service/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string
  constructor(private readonly fb: FormBuilder,
              readonly userService: UserService,
              private readonly router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('email', [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl('password', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }
   async submit(): Promise<void> {
   if (this.loginForm.invalid) {
     if (this.loginForm.get('email').invalid) {
       this.error = `"email" must be a valid email`
       return
     }
     if (this.loginForm.get('password').invalid) {
       this.error = `"password" length must be at least 6 characters long`
       return
     }
     return
    }
   await this.userService.login(this.loginForm.value).subscribe(
      item => {
        localStorage.setItem('access-token', item)
        this.router.navigate(['/']).catch(err => console.log(err))
      },
      err => {
        this.error = err.error
      })
    }
}
