import { Component, OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-parse-signup',
  templateUrl: './parse-signup.component.html',
  styleUrls: ['./parse-signup.component.scss'],
})
export class ParseSignupComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  termsAccepted: boolean;

  constructor(private parseService: ParseService, private toastService: ToastService) { }

  ngOnInit() {}

  registerUser(){
    if (this.termsAccepted) {
    this.parseService.username = this.username;
    this.parseService.password = this.password;
    this.parseService.email = this.email;
    this.parseService.signUp();
    this.clearFields();
    }
    else {
      this.toastService.showToast('You have to accept the terms to continue');
    }
  }
  clearFields(){
    this.username = '';
    this.password = '';
    this.email = '';
    this.termsAccepted = false;
    //this.toastService.showToast('Message');
  }
}
