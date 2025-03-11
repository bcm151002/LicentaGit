import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FooterComponent} from "../../../shared/footer/footer.component";
import {NavbarComponent} from "../../../shared/navbar/navbar.component";
import {MatCardModule} from "@angular/material/card";
import {ProfilComponent} from "../profil/profil.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatCardModule,
    ProfilComponent,
    NavbarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent  {

}
