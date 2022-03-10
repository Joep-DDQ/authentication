import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  user: string;

  googleLoggedIn = false;
  googleLoggedInStatus = new Subject<boolean>();

  constructor(private router: Router, private toastService: ToastService) { }

  checkLoggedIn() {
    GoogleAuth.refresh().then((data) => {
      if (data.accessToken) {
        const navigationExtras: NavigationExtras = {
          state: {
            user: { type: 'existing', accessToken: data.accessToken, idToken: data.idToken }
          }
        };
        this.router.navigate(['home'], navigationExtras);
      }
    }).catch(e => {
      if (e.type === 'userLoggedOut') {
        this.signIn();
      }
    });
  }

  async signIn() {
    const googleUser = await GoogleAuth.signIn();
    this.toastService.showToast(`signin${googleUser}`);
    console.log('signIn:', googleUser);
    this.googleLoggedIn = true;
    this.googleLoggedInStatus.next(this.googleLoggedIn);
  }

  async refreshToken() {
    const response = await GoogleAuth.refresh();
    console.log('refresh:', response);
  }

  async signOut() {
    const googleUser = await GoogleAuth.signOut();
    console.log('signOut: user data = ', googleUser);
    this.googleLoggedIn = false;
    this.googleLoggedInStatus.next(this.googleLoggedIn);
  }

  getLoggedInStatus(): boolean {
    return this.googleLoggedIn;
  }
}

