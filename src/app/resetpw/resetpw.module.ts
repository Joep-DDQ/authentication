import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpwPageRoutingModule } from './resetpw-routing.module';

import { ResetpwPage } from './resetpw.page';
import { ParseResetpasswordComponent } from '../parse-resetpassword/parse-resetpassword.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpwPageRoutingModule
  ],
  declarations: [ResetpwPage,ParseResetpasswordComponent]
})
export class ResetpwPageModule {}
