import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ThemeService } from "../../../services/themes/theme-service.service";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatIconButton
  ],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent {
  constructor(protected themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.setTheme(this.themeService.isDarkTheme() ? 'light-theme' : 'dark-theme');
  }
}
