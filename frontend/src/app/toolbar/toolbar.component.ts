import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router) {}

  public isLoggedIn: boolean;
  private authListenerSubs: Subscription;

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    })
  }

  ngOnDestroy() {

  }

  logOut() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(["/user/login"]);
  }
}
