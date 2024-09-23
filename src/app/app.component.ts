import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HttpClient } from '@angular/common/http';
import { apiurl } from '../configs/config';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WelcomeComponent, CommonModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  spinner = inject(NgxSpinnerService);
  ngOnInit() {
    this.spinner.show();
    this.http
      .get<any>(apiurl + 'connection/establish-dbconnection')
      .subscribe((res) => {
        console.log(res);
        this.spinner.hide();
      });
  }
}
