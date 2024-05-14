import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<any>("https://localhost:7193/WeatherForecast");
  }

  apicall() : void{
    this.getData().subscribe(data => {
      let summary = data[0].summary;
      console.log(data[0].summary);
    })

  }
}
