import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCDialog } from '@material/dialog';

import { PlatformService } from '../../common/services/platform.service';
import { ContactService } from '../../common/services/contact.service';
import { Contact } from '../../common/classes/content';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public response: any;

  public siteKey = environment.reCAPTCHA.siteKey;

  public contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
    recaptcha: ['', Validators.required]
  });

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio' = 'image';

  constructor(
    private platform: PlatformService,
    private contact: ContactService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.materialise();
  }

  get f(): any {
    return this.contactForm.controls;
  }

  materialise() {
    if (this.platform.platformCheck) {
      const contactForm = document.querySelector('#contactForm');
      const contactFields = contactForm.getElementsByClassName('mdc-text-field');
      for (let i = 0; i < contactFields.length; i++) {
          MDCTextField.attachTo(contactFields[i]);
      }
      const contactValidation = contactForm.getElementsByClassName('mdc-text-field-helper-text');
      for (let i = 0; i < contactValidation.length; i++) {
          MDCTextFieldHelperText.attachTo(contactValidation[i]);
      }
    }
  }

  onSubmit() {
    if (this.platform.platformCheck) {
      const dialog = document.querySelector('.mdc-dialog');
      const mdcDialog = MDCDialog.attachTo(dialog);
      this.contact.sendMail(<Contact>this.contactForm.value).subscribe(
        (data) => {
          this.response = data;
          mdcDialog.show();
        },
        (err) => {
          this.response = err;
          mdcDialog.show();
        },
        () => {
          this.contactForm.reset();
        }
      );
    }
  }

  handleSuccess(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

}
