import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private authServ: AuthenticationService) { }

  ngOnInit() {
  }

  loginUser() {
    //console.log(this.username);
    this.authServ.username = this.username;
    this.authServ.password = this.password;
    this.authServ.signIn();
    this.clearFields();
  }
  clearFields(){
    this.username = '';
    this.password = '';
  }
}
