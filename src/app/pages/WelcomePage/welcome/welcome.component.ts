import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { apiurl } from '../../../../configs/config';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(apiurl + 'weatherforecast/get/v2');
  }

  apicall(): void {
    this.getData().subscribe((data) => {
      (data as Array<any>).forEach((d) => console.log(d.summary));
    });
  }
}
