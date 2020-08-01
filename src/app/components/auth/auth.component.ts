import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  isError = false;
  errorMessage = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const pass = authForm.value.password;

    if (this.isLoginMode) {
      this.authService.onLogin(email, pass).subscribe(
        (res) => {
          this.router.navigate(['/']);
        },
        (error) => {
          // console.log('error onLogin');
          // console.log(error);
          this.isError = true;
          this.errorMessage = error.error.message;
        }
      );
    } else {
      this.authService.onRegister(email, pass).subscribe(
        (res) => {
          this.onSwitchMode();
        },
        (error) => {
          console.log('error onRegister');
          console.log(error);
          this.errorMessage = error.error.message;
          this.isError = true;
        }
      );
      authForm.reset();
    }
  }

  onHandleError() {
    this.isError = false;
    this.errorMessage = null;
  }
}
