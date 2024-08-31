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

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  form = new FormGroup({
    roleSelect: new FormControl('default', Validators.minLength(2)),
  });
  constructor(private http: HttpClient, private router: Router) {
    this.form.controls.roleSelect.valueChanges.subscribe(() => {
      let ele: HTMLElement | null;
      ele = document.getElementById('container');
      if (this.form.controls.roleSelect.value === 'rowner') {
        if (ele !== null) ele.style.height = '560px';
      } else {
        if (ele !== null) ele.style.height = '480px';
      }
    });
  }

  isRegister: boolean = false;
  formTitle: string = 'Login Form';

  getData(): Observable<any> {
    return this.http.get<any>(apiurl + 'weatherforecast/get/v2');
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
    this.router.navigate(['home']);
  }

  updateClass(ele: HTMLDivElement): void {
    if (this.isRegister) {
      if (this.form.controls.roleSelect.value === 'rowner')
        ele.style.height = '560px';
      else ele.style.height = '480px';
    } else ele.style.height = '420px';
  }

  apicall(): void {
    this.getData().subscribe((data) => {
      (data as Array<any>).forEach((d) => console.log(d.summary));
    });
  }
}
