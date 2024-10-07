import * as version from '../../../configs/version.json';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { apiurl } from '../../../configs/config';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { roleSelectionRequired } from '../../../Validators/form.validators';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  loginForm = new FormGroup({
    loginEmail: new FormControl(null, Validators.required),
    loginPassword: new FormControl(null, Validators.required),
  });

  registerform = new FormGroup({
    registerEmail: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    registerUsername: new FormControl(null, Validators.required),
    registerPassword: new FormControl(null, Validators.required),
    registerNumber: new FormControl(null, Validators.pattern('[0-9]{10}')),
    regionSelect: new FormControl('none'),
    roleSelect: new FormControl('none', [roleSelectionRequired]),
    restaurentName: new FormControl(null),
  });

  constructor(private http: HttpClient, private router: Router) {
    this.applyFormValidations([this.loginForm, this.registerform]);

    this.registerform.controls.roleSelect.valueChanges.subscribe(() => {
      let ele: HTMLElement | null;
      ele = document.getElementById('container');
      if (this.registerform.controls.roleSelect.value !== 'none') {
        if (ele !== null) ele.style.height = '640px';
      }
    });
  }

  isRegister: boolean = false;
  formTitle: string = 'Login Form';
  version: string = version.version;

  applyFormValidations(forms: Array<FormGroup>): void {
    forms.forEach((form) => {
      Object.keys(form.controls).forEach((control) => {
        form.get(control)?.statusChanges.subscribe(() => {
          let ele: HTMLElement | null;
          ele = document.getElementById(control);
          if (form.get(control)?.valid === false) {
            ele?.classList.remove('focus:border-blue-500');
            ele?.classList.add('formInputError');
          } else {
            ele?.classList.remove('formInputError');
            ele?.classList.add('focus:border-blue-500');
          }
        });
      });
    });
  }

  getData(): Observable<any> {
    return this.http.get<any>(apiurl + 'weatherforecast/get/v1');
  }

  onToggleForm(
    loginradio: HTMLInputElement,
    signupradio: HTMLInputElement
  ): void {
    this.isRegister = !this.isRegister;
    this.formTitle = this.isRegister ? 'Signup Form' : 'Login Form';
    loginradio.checked = this.isRegister ? false : true;
    signupradio.checked = this.isRegister;
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    if (false) this.router.navigate(['home']);
  }

  onRegister(): void {
    if (
      this.registerform.controls.roleSelect.value === 'user' &&
      this.registerform.controls.regionSelect.value === 'none'
    ) {
      this.registerform.controls.regionSelect.setErrors({ required: true });
    } else if (
      this.registerform.controls.roleSelect.value === 'rowner' &&
      (this.registerform.controls.restaurentName.value === '' ||
        this.registerform.controls.restaurentName.value === null)
    ) {
      this.registerform.controls.restaurentName.setErrors({ required: true });
    } else {
      console.log(this.registerform.value);
    }
  }

  updateClass(ele: HTMLDivElement): void {
    if (this.isRegister) {
      if (this.registerform.controls.roleSelect.value === 'none')
        ele.style.height = '560px';
      else ele.style.height = '640px';
    } else ele.style.height = '420px';
  }
}
