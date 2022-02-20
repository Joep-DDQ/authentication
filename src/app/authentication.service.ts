import { Injectable } from '@angular/core';
import Parse from 'parse';
import { NavigationExtras, Router } from '@angular/router';
import { ToastService } from './toast.service';
import { Subject, of } from 'rxjs';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  username: string;
  password: string;
  email: string;
  parseLoggedIn = false;
  parseLoggedInStatus = new Subject<boolean>();

  googleLoggedIn = false;
  googleLoggedInStatus = new Subject<boolean>();

  constructor(private router: Router, private toastSvc: ToastService) {
    /*DDQ Parse
    ==================
    Parse.initialize('5yHaDCnG17ySDKKQ0BqL13eWOMoygILWmwnYjDbuDOE','15Inx8rIAqZGhlEDNixoNHb8X8KioVg4DuMX7Bk7E');
    Parse.serverURL = 'https://mobis.ddq.nl/parse';
    */
    /*Back4App Parse
    =================*/
    Parse.initialize('3z7ETB9kJIjTNdligGBnGPfWRh4dMtUCbxpvDNSd','0BRb0a2x57VjB4FV11nJZ37vTDuHHda74u2JS6yJ');
    Parse.serverURL = 'https://parseapi.back4app.com';
   }
  clearValues(){
    // Clears up the form
    this.username = '';
    this.password = '';
    this.email = '';
  }

  //with email verification
   parseSignUp() {
    Parse.User.signUp(this.username, this.password, {email: this.email}).then(resp => {
      console.log('Account created successfully', resp);
      this.clearValues(); //reset form
      this.toastSvc.showToast('Account created successfully. Check your email for verification.');

      //converts the loggedin boolean to a printable value
      this.parseLoggedInStatus.next(this.parseLoggedIn);

      //goto the login page after account is created
      this.router.navigate(['login']);

    },  err => {
      console.log('Error loggin in', err);
      this.toastSvc.showToast(err.message);
    });
  }

  parseSignIn() {
    Parse.User.logIn(this.username, this.password).then(user => {
      console.log('Logged in successfully', user);
      this.toastSvc.showToast('Logged in successfully');

      if (user.get('emailVerified')) {
        this.parseLoggedIn = true;
        this.parseLoggedInStatus.next(this.parseLoggedIn);
        this.router.navigate(['home']);
      }
      else {
        Parse.User.logOut().then((resp) => {
          console.log('User not verified, logging out', resp);
        }, err => {
          console.log('Error logging out', err);
        });
        this.toastSvc.showToast('You need to verify your email before you can use this app.');
      }

    }, async err => {
      console.log('Error logging in', err);
      this.toastSvc.showToast(err.message);
    });
  }

  //run at beginning of program to check if user was already logged in on device so not has to do it again
  getParseLoggedInUser(){
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
      return user;
    }, err => {
    console.log('Error getting logged user');
    return null;
   });
  }

  parseLogOut() {
    Parse.User.logOut().then(resp => {
      console.log('Logged out successfully', resp);
      this.toastSvc.showToast('Succesfully logged out');
      this.parseLoggedIn = false;
      this.parseLoggedInStatus.next(this.parseLoggedIn);
      this.router.navigate(['home']);
    }, err => {
      console.log('Error logging out', err);
      this.toastSvc.showToast('Error logging out');
    });
  }

  parseResetPassword(email) {
    Parse.User.requestPasswordReset(email).then( res =>
      {console.log('Password reset request was sent successfully');
      this.router.navigate(['login']);
    }).catch( error => {
      console.log('The login failed with error: ' + error.code + ' '  + error.message);
      this.toastSvc.showToast(error.message);
    });
  }

  checkGoogleLoggedIn() {
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
        this.googleSignIn();
      }
    });
  }

  async googleSignIn() {
    const googleUser = await GoogleAuth.signIn();
    console.log('signIn:', googleUser);
    this.googleLoggedIn = true;
    this.googleLoggedInStatus.next(this.googleLoggedIn);
  }

  async googleRefreshToken() {
    const response = await GoogleAuth.refresh();
    console.log('refresh:', response);
  }

  async googleSignOut() {
    const googleUser = await GoogleAuth.signOut();
    console.log('signOut: user data = ', googleUser);
    this.googleLoggedIn = false;
    this.googleLoggedInStatus.next(this.googleLoggedIn);
  }

  getParseLoggedInStatus(): boolean {
    return this.parseLoggedIn;
  }
  getGoogleLoggedInStatus(): boolean {
    return this.googleLoggedIn;
  }
}
