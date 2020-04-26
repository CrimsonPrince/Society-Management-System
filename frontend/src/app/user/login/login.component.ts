import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router ) {

  }

  private authStatus: Subject<boolean>;

  ngOnInit(): void {

    this.authStatus = this.authService.getAuthStatus();
  }

  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      console.log("Form Invalid");
      return;
    }
    this.authService.login(form.value.email, form.value.password).subscribe(data => {
      console.log(data);
      this.router.navigate(["/user/pokemon"]);
    },
    error =>
    {
      this.authStatus.next(false);
      console.log("error");
    });
  }

}
