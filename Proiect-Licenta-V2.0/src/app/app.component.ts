import { Component } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import {ThemeService} from "./services/themes/theme-service.service";
import {AnimatedTextComponent} from "./animations/animated-title/animated-title.component";
import {NavbarComponent} from "./components/shared/navbar/navbar.component";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent, NgIf,
    HttpClientModule,
    AnimatedTextComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Proiect-Licenta-V2.0';

  showNavbar: boolean = true;

  constructor(private themeService: ThemeService, private router: Router) {


    this.router.events.subscribe(() => {
      const currentUrl = this.router.url.split('?')[0]; // Ignoram parametrii query
      this.showNavbar = currentUrl !== '/login' && currentUrl !== '/404' && currentUrl !== '/reset-password';
    });
  }

}
