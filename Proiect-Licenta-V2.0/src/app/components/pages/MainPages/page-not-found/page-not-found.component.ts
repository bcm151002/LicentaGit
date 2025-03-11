import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Setează un timer care redirecționează utilizatorul către pagina principală după 3 secunde
    setTimeout(() => {
      this.router.navigate(['/']); // Navighează către ruta principală (Home)
    }, 3000); // 3000ms = 3 secunde
  }
}


