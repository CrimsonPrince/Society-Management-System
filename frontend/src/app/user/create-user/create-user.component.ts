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

  form:FormGroup;

  constructor( private fb:FormBuilder,  private authService: AuthService ) {

    this.form = this.fb.group({
      fname: '',
      lname: '',
      email: ['', [Validators.required]],
      address: '',
      password: ['', [Validators.required, Validators.minLength(10)]],
      gender: ''
  });
  }

  ngOnInit(): void {
  }

  register() {
    const val = this.form.value;
    console.log(val);
    if (this.form.dirty && this.form.valid) {
      this.authService.createUser(val.fname, val.lname, val.email, val.address, val.password, val.gender)
            .subscribe(
                () => {
                    console.log("User is Created");
                }
            );
    }
    else {
      alert("Please Fill in Form");
    }
  }
}
