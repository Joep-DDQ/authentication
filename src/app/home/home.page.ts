import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  loggedIn: boolean;
  private loggedInStatusSubs: Subscription;

  constructor(private authServ: AuthenticationService) {
    this.loggedIn = this.authServ.getLoggedInStatus();
  }

  ngOnInit(): void {
    this.loggedInStatusSubs = this.authServ.loggedInStatus.subscribe(status => {
      this.loggedIn = status;
    });
  }

  ngOnDestroy(): void {
    this.authServ.loggedInStatus.unsubscribe();
  }

  logOutUser(){
    this.authServ.logOut();
  }
}
