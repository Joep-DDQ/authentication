import { Component, OnDestroy } from '@angular/core';

import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { ParseService } from '../services/parse.service';
import { GoogleService } from '../services/google.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  //user: any;
  //username: string;
  isWeb = false;

  parseLoggedIn: boolean;
  googleLoggedIn: boolean;

  private parseLoggedInStatusSubs: Subscription;
  private googleLoggedInStatusSubs: Subscription;


  constructor(private parseService: ParseService, private googleService: GoogleService, private platform: Platform) {
    this.parseLoggedIn = this.parseService.getLoggedInStatus();
    this.googleLoggedIn = this.googleService.getLoggedInStatus();
  }

  ngOnInit(): void {
    this.isWeb = !this.platform.is('android') && !this.platform.is('ios');
    //needs platform detection. ONLY RUN ON WEB!
    if (this.isWeb) {
      GoogleAuth.init();
    }

    this.parseService.getLoggedInUser();
    this.parseLoggedInStatusSubs = this.parseService.parseLoggedInStatus.subscribe(status => {
      this.parseLoggedIn = status;
    });
    this.googleLoggedInStatusSubs = this.googleService.googleLoggedInStatus.subscribe(status => {
      this.googleLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    this.parseService.parseLoggedInStatus.unsubscribe();
    this.googleService.googleLoggedInStatus.unsubscribe();
  }

  parseLogOutUser(){
    this.parseService.logOut();
  }

  gSignIn(){
    this.googleService.signIn();
  }

  gRefreshToken() {
    this.googleService.refreshToken();
  }

  gSignOut(){
    this.googleService.signOut();
  }
}
