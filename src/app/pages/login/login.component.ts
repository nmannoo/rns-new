import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCRipple } from '@material/ripple';

import { flyfadeIn } from '../../common/classes/animations';

import { AuthService } from '../../common/services/auth.service';
import { PlatformService } from '../../common/services/platform.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [flyfadeIn]
})
export class LoginComponent implements OnInit {
  error: string = null;
  loading: boolean;
  trigger: boolean;

  public loginForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required
    ]]
  });

  constructor(
    private auth: AuthService,
    private platform: PlatformService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.materialise();
    this.trigger = true;
  }

  get f(): any {
    return this.loginForm.controls;
  }

  materialise() {
    if (this.platform.platformCheck) {
      const loginForm = document.querySelector('#loginForm');
      const loginFields = loginForm.getElementsByClassName('mdc-text-field');
      for (let i = 0; i < loginFields.length; i++) {
          MDCTextField.attachTo(loginFields[i]);
      }
      const loginValidation = loginForm.getElementsByClassName('mdc-text-field-helper-text');
      for (let i = 0; i < loginValidation.length; i++) {
          MDCTextFieldHelperText.attachTo(loginValidation[i]);
      }
      const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
    }
  }

  loginUser() {
    this.loading = !this.loading;
    this.auth.login(this.loginForm.value).subscribe(
      (data) => {
        this.router.navigate(['/admin']);
        this.loading = !this.loading;
      },
      (err) => {
        console.log('Something went wrong: ', err.message);
        this.error = err.message;
        this.loginForm.reset();
        this.loading = !this.loading;
      }
    );
  }

}
