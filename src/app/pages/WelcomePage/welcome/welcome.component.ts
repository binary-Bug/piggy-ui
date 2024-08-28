import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { apiurl } from '../../../../configs/config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(private http: HttpClient) {}

  isRegister : boolean = false;

  getData(): Observable<any> {
    return this.http.get<any>(apiurl + 'weatherforecast/get/v2');
  }

  onToggleForm(): void {
    this.isRegister = !this.isRegister;
  }

  updateClass(ele: HTMLDivElement): void {
    if(this.isRegister)
    ele.style.height = "480px";
  else 
  ele.style.height = "420px";
  }

  apicall(): void {
    this.getData().subscribe((data) => {
      (data as Array<any>).forEach((d) => console.log(d.summary));
    });
  }
}
