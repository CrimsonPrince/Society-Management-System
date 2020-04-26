import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private authService: AuthService ) {

  }

  ngOnInit(): void {
    this.authService.get
  }

  onSignup(form: NgForm) {
    console.log(form.value);
    if ( form.invalid) {
      console.log("Form Invalid");
      return;
    }
    this.authService.createUser(form.value.name, form.value.email, form.value.password, form.value.address, form.value.gender).subscribe(data => {
      console.log(data);
    });
  }
}
