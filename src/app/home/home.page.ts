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

  loggedIn: boolean;
  private loggedInStatusSubs: Subscription;

  constructor(private authServ: AuthenticationService) {
    this.loggedIn = this.authServ.getLoggedInStatus();
  }

  ngOnInit(): void {
    this.loggedInStatusSubs = this.authServ.loggedInStatus.subscribe(status => {
      this.loggedIn = status;
      GoogleAuth.init();
    });
  }

  ngOnDestroy(): void {
    this.authServ.loggedInStatus.unsubscribe();
  }

  logOutUser(){
    this.authServ.logOut();
  }

  async signIn() {
    const googleUser = await GoogleAuth.signIn();
    //this.username = googleUser.name;
    console.log('signIn:', googleUser);
  }

  async refreshToken() {
    const response = await GoogleAuth.refresh();
    console.log('refresh:', response);
  }

  async signOut() {
    const googleUser = await GoogleAuth.signOut();
    //this.username = '';
    console.log('signOut: user data = ', googleUser);
  }

}
