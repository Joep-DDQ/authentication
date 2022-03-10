import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Parse from 'parse';
import { Subject } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  username: string;
  password: string;
  email: string;

  parseLoggedIn = false;
  parseLoggedInStatus = new Subject<boolean>();
  constructor(private router: Router, private toastService: ToastService) {
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
   signUp() {
    Parse.User.signUp(this.username, this.password, {email: this.email}).then(resp => {
      console.log('Account created successfully', resp);
      this.clearValues(); //reset form
      this.toastService.showToast('Account created successfully. Check your email for verification.');

      //converts the loggedin boolean to a printable value
      this.parseLoggedInStatus.next(this.parseLoggedIn);

      //goto the login page after account is created
      this.router.navigate(['login']);

    },  err => {
      console.log('Error loggin in', err);
      this.toastService.showToast(err.message);
    });
  }

  signIn() {
    Parse.User.logIn(this.username, this.password).then(user => {
      console.log('Logged in successfully', user);
      this.toastService.showToast('Logged in successfully');

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
        this.toastService.showToast('You need to verify your email before you can use this app.');
      }

    }, async err => {
      console.log('Error logging in', err);
      this.toastService.showToast(err.message);
    });
  }

  //run at beginning of program to check if user was already logged in on device so not has to do it again
  getLoggedInUser(){
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
      return user;
    }, err => {
    console.log('Error getting logged user');
    return null;
   });
  }

  logOut() {
    Parse.User.logOut().then(resp => {
      console.log('Logged out successfully', resp);
      this.toastService.showToast('Succesfully logged out');
      this.parseLoggedIn = false;
      this.parseLoggedInStatus.next(this.parseLoggedIn);
      this.router.navigate(['home']);
    }, err => {
      console.log('Error logging out', err);
      this.toastService.showToast('Error logging out');
    });
  }

  resetPassword(email) {
    Parse.User.requestPasswordReset(email).then( res =>
      {console.log('Password reset request was sent successfully');
      this.router.navigate(['login']);
    }).catch( error => {
      console.log('The login failed with error: ' + error.code + ' '  + error.message);
      this.toastService.showToast(error.message);
    });
  }

  getLoggedInStatus(): boolean {
    return this.parseLoggedIn;
  }
}
