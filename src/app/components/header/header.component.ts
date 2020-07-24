import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponse } from 'src/app/interfaces/AuthResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  authResponse: AuthResponse;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => this.authResponse = user);
  }

  ngOnInit(): void {
  }

  onLogout() {
      this.authService.onLogout();
  }

}
