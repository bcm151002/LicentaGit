import { Component } from '@angular/core';
import {NavbarComponent} from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent {

}
