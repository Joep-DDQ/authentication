import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loggedIn: boolean;
  private loggedInStatusSubs: Subscription;

  constructor(private authServ: AuthenticationService) {
    this.loggedIn = this.authServ.getLoggedInStatus();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.loggedInStatusSubs = this.authServ.loggedInStatus.subscribe(status => {
      this.loggedIn = status;
    });
  }

  logOutUser(){
    this.authServ.logOut();
  }
}
