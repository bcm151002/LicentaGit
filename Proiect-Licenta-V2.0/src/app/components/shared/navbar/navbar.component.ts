import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ThemeSelectorComponent} from "../theme-selector/theme-selector.component";
import {isPlatformBrowser, NgOptimizedImage} from "@angular/common";
import {LoginService} from "../../../services/login/login.service";
import {StudentDataService} from "../../../services/student-data/student-data.service";
import {AnimatedTextComponent} from "../../../animations/animated-title/animated-title.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatAnchor,
    RouterLink,
    MatToolbarRow,
    MatToolbarModule,
    ThemeSelectorComponent,
    NgOptimizedImage,
    AnimatedTextComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  studentName: string = '';

  constructor(private loginService: LoginService,
              private studentService: StudentDataService,
              @Inject(PLATFORM_ID) private platformId: Object
              ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        this.studentService.personalData$.subscribe(data => {
          this.studentName = data?.nume!.toUpperCase() + " " + data?.prenume!;
        })

    } else {
    }
  }


  logout(): void {
    this.loginService.logout();
  }
}
