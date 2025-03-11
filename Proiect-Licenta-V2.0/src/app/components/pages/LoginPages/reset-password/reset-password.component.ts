import {Component, signal} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule, MatCardContent, MatCardHeader } from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { timer } from 'rxjs';
import {MatIcon} from "@angular/material/icon";
import {sign} from "node:crypto";
import {LoginService} from "../../../../services/login/login.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    MatFormField,
    FormsModule,
    NgIf,
    MatButton,
    RouterLink,
    MatInput,
    MatIcon,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  token: string | null = null;
  newPassword = signal('');
  errorMessage: string | null = null;
  successMessage: string | null = null; // Adăugăm mesajul de succes
  hide = signal(true);

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {
    // Extrage token-ul din URL
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.errorMessage = 'Invalid or missing token.';
    }
  }

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  resetPassword(): void {
    if (!this.token) {
      this.errorMessage = 'Token invalid.';
      this.router.navigate(['/404']);
      return;
    }

    if (
      this.newPassword().length < 8 ||
      !/[A-Z]/.test(this.newPassword()) ||
      !/[!@#$%^&*()]/.test(this.newPassword())
    ) {
      this.errorMessage =
        'Parola trebuie să conțină cel puțin 8 caractere, o literă mare și un caracter special.';
      return;
    }

    const body = { token: this.token, newPassword: this.newPassword() };

    this.loginService.resetPassword(body).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message;
          this.errorMessage = null;
          timer(3000).subscribe(() => this.router.navigate(['/login'])); // Redirecționează după 3 secunde
        } else {
          this.errorMessage = response.message;
          this.successMessage = null;
        }
      },
      error: (error) => {
        console.error('Eroare:', error);
        this.errorMessage = 'A apărut o eroare. Vă rugăm să încercați din nou.';
        this.successMessage = null;
      },
    });
  }

}
