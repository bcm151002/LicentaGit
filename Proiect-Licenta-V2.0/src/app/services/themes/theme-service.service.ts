import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme!: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('selectedTheme');
      this.currentTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme');
      this.updateTheme();
    }
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    localStorage.setItem('selectedTheme', theme);
    this.updateTheme();
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark-theme';
  }

  private updateTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.classList.remove('light-theme', 'dark-theme');
      this.document.body.classList.add(this.currentTheme);
    }
  }
}
