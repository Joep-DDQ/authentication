import { Component, OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';

@Component({
  selector: 'app-parse-login',
  templateUrl: './parse-login.component.html',
  styleUrls: ['./parse-login.component.scss'],
})
export class ParseLoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private parseService: ParseService) { }

  ngOnInit() {}

  loginUser() {
    //console.log(this.username);
    this.parseService.username = this.username;
    this.parseService.password = this.password;
    this.parseService.signIn();
    this.clearFields();
  }
  clearFields(){
    this.username = '';
    this.password = '';
  }
}
