import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GauthService } from 'src/app/services/gauth.service';
export class RegularExpressionConstant {
  static EMAIL: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static ADHAR: RegExp = /^(\d{12})$/;
  static OTP: RegExp = /^(\d{6})$/;

}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  // making formgorup for future reference for otp
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,Validators.pattern(RegularExpressionConstant.EMAIL)]],
  });
  constructor(private auth:GauthService,
    private formBuilder: FormBuilder,

    ) { }

  ngOnInit(): void {
  }
  // function to proceed to login window
  login(){
    this.auth.signIn();
  }

  hardCodedLogin(){
    this.auth.hardSign();
  }
}
