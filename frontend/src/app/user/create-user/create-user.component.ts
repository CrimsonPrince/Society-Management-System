import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private authService: AuthService ) {

  }

  ngOnInit(): void {
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
