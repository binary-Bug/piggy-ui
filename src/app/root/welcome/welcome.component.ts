import * as version from '../../../configs/version.json';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { roleSelectionRequired } from '../../../Validators/form.validators';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Services/user.service';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AboutComponent],
  providers: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  loginForm = new FormGroup({
    loginEmail: new FormControl<string | null>(null, Validators.required),
    loginPassword: new FormControl<string | null>(null, Validators.required),
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
    restaurentType: new FormControl('none'),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.applyFormValidations([this.loginForm, this.registerform]);

    this.registerform.controls.roleSelect.valueChanges.subscribe(() => {
      let ele: HTMLElement | null;
      ele = document.getElementById('container');
      if (this.registerform.controls.roleSelect.value !== 'none') {
        if (ele !== null) {
          if (this.registerform.controls.roleSelect.value === 'user')
            ele.style.height = '640px';
          else ele.style.height = '680px';
        }
      }
    });

    this.apiService.getRegions().subscribe((res) => {
      this.regions = res;
    });

    this.apiService.getRestaurentTypes().subscribe((res) => {
      this.restaurentTypes = res;
    });
  }

  isRegister: boolean = false;
  formTitle: string = 'Login Form';
  version: string = version.version;
  regions: any = [];
  restaurentTypes: any = [];
  @ViewChild('loginRadio') loginRadio!: ElementRef;
  @ViewChild('signupRadio') signupRadio!: ElementRef;
  @ViewChild('formContainer') formContainer!: ElementRef;

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

  onToggleForm(): void {
    this.isRegister = !this.isRegister;
    this.formTitle = this.isRegister ? 'Signup Form' : 'Login Form';
    //loginradio.checked = this.isRegister ? false : true;
    this.loginRadio.nativeElement.checked = this.isRegister ? false : true;
    this.signupRadio.nativeElement.checked = this.isRegister;
  }

  updateClass(): void {
    if (this.isRegister) {
      if (this.registerform.controls.roleSelect.value === 'none')
        this.formContainer.nativeElement.style.height = '560px';
      else this.formContainer.nativeElement.style.height = '680px';
    } else this.formContainer.nativeElement.style.height = '420px';
  }

  onLogin(): void {
    this.apiService
      .login({
        loginEmail: this.loginForm.value.loginEmail,
        loginPassword: this.loginForm.value.loginPassword,
      })
      .subscribe(
        (res) => {
          this.userService.updateUserToken(res);
          this.router.navigate(['home']);
        },
        (error) => {
          this.toastr.toastrConfig.positionClass = 'toast-bottom-full-width';
          this.toastr.toastrConfig.progressBar = true;
          this.toastr.error('Please enter valid credentials', 'Invalid', {
            timeOut: 3000,
          });
        }
      );
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
    } else if (
      this.registerform.controls.roleSelect.value === 'rowner' &&
      this.registerform.controls.restaurentType.value === 'none'
    ) {
      this.registerform.controls.restaurentType.setErrors({ required: true });
    } else {
      console.log(this.registerform.value);
      if (this.registerform.controls.roleSelect.value === 'user') {
        this.apiService.registerUser(this.registerform.value).subscribe(
          (res) => {
            this.toastr.toastrConfig.positionClass = 'toast-bottom-full-width';
            this.toastr.toastrConfig.progressBar = true;
            this.toastr.success(res, 'Success', {
              timeOut: 5000,
            });
            this.onToggleForm();
            this.updateClass();
          },
          (error) => {
            let errorTxt = '';
            JSON.parse(error.error).forEach((ele: { description: string }) => {
              errorTxt += ele.description + '\n';
            });
            this.toastr.toastrConfig.positionClass = 'toast-bottom-full-width';
            this.toastr.toastrConfig.progressBar = true;
            this.toastr.error(errorTxt, 'Error', {
              timeOut: 10000,
            });
          }
        );
      } else {
        this.apiService.registerRestaurent(this.registerform.value).subscribe(
          (res) => {
            this.toastr.toastrConfig.positionClass = 'toast-bottom-full-width';
            this.toastr.toastrConfig.progressBar = true;
            this.toastr.success(res, 'Success', {
              timeOut: 5000,
            });
            this.onToggleForm();
            this.updateClass();
          },
          (error) => {
            let errorTxt = '';
            JSON.parse(error.error).forEach((ele: { description: string }) => {
              errorTxt += ele.description + '\n';
            });
            this.toastr.toastrConfig.positionClass = 'toast-bottom-full-width';
            this.toastr.toastrConfig.progressBar = true;
            this.toastr.error(errorTxt, 'Error', {
              timeOut: 10000,
            });
          }
        );
      }
    }
  }
}
