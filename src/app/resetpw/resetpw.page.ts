import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.page.html',
  styleUrls: ['./resetpw.page.scss'],
})
export class ResetpwPage implements OnInit {
  email: string;

  constructor(private authServ: AuthenticationService) { }

  ngOnInit() {
  }

  resetPw(email){
    this.authServ.parseResetPassword(email);
  }
}
