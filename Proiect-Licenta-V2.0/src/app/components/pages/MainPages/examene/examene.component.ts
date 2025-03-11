import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardModule, MatCardContent, MatCardHeader, MatCard, MatCardTitle} from "@angular/material/card";
import {ThemeService} from "../../../../services/themes/theme-service.service";
import {isPlatformBrowser, NgClass, NgForOf} from "@angular/common";
import {DatePersonale, DateScolarizare} from "../../../../interfaces/user-data";
import { StudentDataService} from "../../../../services/student-data/student-data.service";
import {MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatSelect} from "@angular/material/select";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatLabel} from "@angular/material/form-field";


@Component({
  selector: 'app-examene',
  standalone: true,
  imports: [
    NgClass,
    MatOption,
    MatSelect,
    MatFormField,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatTable,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatButton,
    NgForOf,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatLabel,
    MatCardTitle,
  ],
  templateUrl: './examene.component.html',
  styleUrl: './examene.component.scss'
})
export class ExameneComponent {
  constructor(public themeService: ThemeService) {
  }

  // Filter options
  years = [1, 2, 3, 4];
  semesters = [1, 2];
  academicYears = ['2021-2022', '2022-2023', '2023-2024', '2024-2025'];
  selectedYear = 4;
  selectedSemester = 1;
  selectedAcademicYear = '2024-2025';

  // Subjects list
  subjects = [
    'Managementul resurselor umane',
    'Politici şi opţiuni contabile',
    'Măsurarea şi controlul performanţei',
    'Sisteme informatice de gestiune',
    'Audit financiar',
    'Introducere în analiză economico-financiară',
    'Statistică'
  ];

  // Table data
  displayedColumns: string[] = ['disciplina', 'data', 'ora', 'sala', 'forma', 'credite'];
  exams = [
    { disciplina: 'Tactica', data: '23/01/2025', ora: '08:00', sala: 'A2-1-12', forma: 'Colocviu', credite: '3.00' },
    { disciplina: 'IP', data: '27/01/2025', ora: '09:00', sala: 'A2-1-11', forma: 'Examen', credite: '5.00' },
    // Add other exam entries...
  ];
}
