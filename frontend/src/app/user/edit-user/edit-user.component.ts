import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  public user: User;

  ngOnInit (): void {
    this.authService.getUser().subscribe(data => {
      this.user = <User>data;
    })
  }

  onEdit (form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      console.log("Form Invalid");
      return;
    }
    this.authService.editUser(form.value.name, form.value.email, form.value.password, form.value.newpassword, form.value.address, form.value.gender).subscribe(data => {
      console.log(data);
    });
  }
}
