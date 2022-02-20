import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string;
  password: string;
  email: string;
  termsAccepted: boolean;

  constructor(private authServ: AuthenticationService, private toastSvc: ToastService) {
  }

  ngOnInit() {
  }

  registerUser(){
    if (this.termsAccepted) {
    this.authServ.username = this.username;
    this.authServ.password = this.password;
    this.authServ.email = this.email;
    this.authServ.parseSignUp();
    this.clearFields();
    }
    else {
      this.toastSvc.showToast('You have to accept the terms to continue');
    }
  }
  clearFields(){
    this.username = '';
    this.password = '';
    this.email = '';
    this.termsAccepted = false;
    //this.toastSvc.showToast('Message');
  }

}
