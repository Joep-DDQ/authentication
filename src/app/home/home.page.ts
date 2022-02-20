import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  //user: any;
  //username: string;

  parseLoggedIn: boolean;
  googleLoggedIn: boolean;

  private parseLoggedInStatusSubs: Subscription;
  private googleLoggedInStatusSubs: Subscription;


  constructor(private authServ: AuthenticationService) {
    this.parseLoggedIn = this.authServ.getParseLoggedInStatus();
    this.googleLoggedIn = this.authServ.getGoogleLoggedInStatus();
  }

  ngOnInit(): void {
    GoogleAuth.init();
    this.authServ.getParseLoggedInUser();
    this.parseLoggedInStatusSubs = this.authServ.parseLoggedInStatus.subscribe(status => {
      this.parseLoggedIn = status;
    });
    this.googleLoggedInStatusSubs = this.authServ.googleLoggedInStatus.subscribe(status => {
      this.googleLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    this.authServ.parseLoggedInStatus.unsubscribe();
    this.authServ.googleLoggedInStatus.unsubscribe();
  }

  parseLogOutUser(){
    this.authServ.parseLogOut();
  }

  gSignIn(){
    this.authServ.googleSignIn();
  }

  gRefreshToken() {
    this.authServ.googleRefreshToken();
  }

  gSignOut(){
    this.authServ.googleSignOut();
  }
}
