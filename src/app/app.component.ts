import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiurl, localapiurl } from '../configs/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'AngularTest';

  constructor(private http: HttpClient ){}

  getData(): Observable<any> {
    return this.http.get<any>(apiurl+"weatherforecast/get/v2");
  }

  apicall(): void{
    this.getData().subscribe(data => {
      (data as Array<any>).forEach(d => console.log(d.summary));
    });
  }
}
