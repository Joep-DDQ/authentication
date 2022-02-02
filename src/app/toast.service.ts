import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private myToast: any;

  constructor(
    private toast: ToastController
  ) { }

  showToast(message: string) {
    this.myToast = this.toast.create({
      message,
      duration: 1000,
      buttons: [
       {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  hideToast() {
    this.myToast = this.toast.dismiss();
  }
}
