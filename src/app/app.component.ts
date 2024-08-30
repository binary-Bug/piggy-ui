import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
}
