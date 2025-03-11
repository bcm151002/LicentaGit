import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ThemeService } from '../../../../services/themes/theme-service.service';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { DatePersonale, DateScolarizare } from '../../../../interfaces/user-data';
import { StudentDataService } from '../../../../services/student-data/student-data.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    NgClass,
    MatButton
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  datePersonale: DatePersonale | null = null;
  dateScolarizare: DateScolarizare | null = null;
  errorMessage: string | null = null;

  constructor(
    public themeService: ThemeService,
    private studentDataService: StudentDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Abonare la fluxurile de date din serviciu
      this.studentDataService.personalData$.subscribe(data => {
        this.datePersonale = data;
      });

      this.studentDataService.scolarizareData$.subscribe(data => {
        this.dateScolarizare = data;
      });

      // Verificăm dacă datele există deja; dacă nu, le preluăm
      if (!this.studentDataService.getPersonalData()) {
        this.studentDataService.fetchPersonalData().subscribe({
          error: (err) => {
            console.error('Eroare la preluarea datelor personale:', err);
            this.errorMessage = 'Nu s-au putut încărca datele personale.';
          }
        });
      }

      if (!this.studentDataService.getAcademicData()) {
        this.studentDataService.fetchAcademicData().subscribe({
          error: (err) => {
            console.error('Eroare la preluarea datelor de școlarizare:', err);
            this.errorMessage = 'Nu s-au putut încărca datele de școlarizare.';
          }
        });
      }
    }
  }
}
