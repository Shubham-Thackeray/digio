import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegularExpressionConstant } from '../login-page/login-page.component';

export interface label {
  id: any;
  labelListVisibility?: any;
  messageListVisibility?: any;
  name: any;
  type?: any;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
 
  @ViewChild('customContent') private customContent;
  verified = false ;
  status;

  form: FormGroup = this.formBuilder.group({
    adhar: [{value:'', disabled: this.verified}, [Validators.required,Validators.pattern(RegularExpressionConstant.ADHAR)]],
    otp: ['', [Validators.required,Validators.pattern(RegularExpressionConstant.OTP)]],
    flag: [false, [Validators.required]],

  });

  verifyId:string = '';

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    ) {}

  ngOnInit(): void {
    // preferably should start at ngOnChanges
    setTimeout(() => {
      this.openModal();
    }, 1000);
  }


  openModal(){
    this.modalService.open(this.customContent, {
      windowClass: 'dark-modal',
      backdrop: 'static',
      size: 'lg',
    });
  }

 getInvalid(){
  return (this.form.controls['adhar'].invalid) || 0;
 }

 verify(){
  //  TODO make inline
   this.verified = true;
    }


 submit(){
  //  TODO --get toaster here
  //  TODO integrATE SOME functionality here
this.status = "signing"
setTimeout(() => {
  this.status = "signed";
}, 3000);
 }
}
