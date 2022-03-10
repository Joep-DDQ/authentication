import { Component, OnInit } from '@angular/core';
import { ParseService } from '../services/parse.service';

@Component({
  selector: 'app-parse-resetpassword',
  templateUrl: './parse-resetpassword.component.html',
  styleUrls: ['./parse-resetpassword.component.scss'],
})
export class ParseResetpasswordComponent implements OnInit {
  email: string;

  constructor(private parseService: ParseService) { }

  ngOnInit() {}

  resetPw(email){
    this.parseService.resetPassword(email);
  }
}
