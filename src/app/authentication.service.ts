import { Injectable } from '@angular/core';
import Parse from 'parse';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  username: string;
  password: string;
  email: string;
  loggedIn = false;
  loggedInStatus = new Subject<boolean>();

  constructor(private router: Router, private toastSvc: ToastService) {
    Parse.initialize('5yHaDCnG17ySDKKQ0BqL13eWOMoygILWmwnYjDbuDOE','15Inx8rIAqZGhlEDNixoNHb8X8KioVg4DuMX7Bk7E');
    Parse.serverURL = 'https://mobis.ddq.nl/parse';
   }
  clearValues(){
    // Clears up the form
    this.username = '';
    this.password = '';
    this.email = '';
  }

   signUp() {
    Parse.User.signUp(this.username, this.password).then(resp => {
      console.log('Logged in successfully', resp);

      this.clearValues();
      this.toastSvc.showToast('Logged in successfully');
      this.loggedIn = true;
      this.loggedInStatus.next(this.loggedIn);
      this.router.navigate(['home']);

    },  err => {
      console.log('Error loggin in', err);
      this.toastSvc.showToast(err.message);
    });
  }

  signIn() {
    Parse.User.logIn(this.username, this.password).then(resp => {
      console.log('Logged in successfully', resp);
      this.toastSvc.showToast('Logged in successfully');
      this.loggedIn = true;
      this.loggedInStatus.next(this.loggedIn);

      // If you app has Tabs, set root to TabsPage
      this.router.navigate(['home']);
    }, async err => {
      console.log('Error logging in', err);
      this.toastSvc.showToast(err.message);
    });
  }

  logOut() {
    Parse.User.logOut().then(resp => {
      console.log('Logged out successfully', resp);
      this.toastSvc.showToast('Succesfully logged out');
      this.loggedIn = false;
      this.loggedInStatus.next(this.loggedIn);
      this.router.navigate(['home']);
    }, err => {
      console.log('Error logging out', err);
      this.toastSvc.showToast('Error logging out');
    });
  }

  //does not yet work, is not implemented anywhere

  getLoggedInStatus(): boolean {
    return this.loggedIn;
  }
}
