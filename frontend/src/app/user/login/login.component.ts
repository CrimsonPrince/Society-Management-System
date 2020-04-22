import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService ) {

  }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      console.log("Form Invalid");
      return;
    }
    this.authService.login(form.value.email, form.value.password).subscribe(data => {
      console.log(data);
    });
  }

}
