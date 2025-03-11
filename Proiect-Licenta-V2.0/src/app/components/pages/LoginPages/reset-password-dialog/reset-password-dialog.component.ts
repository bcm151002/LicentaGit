import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from '@angular/material/card';
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {timer} from "rxjs";
import {NgIf} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {LoginService} from "../../../../services/login/login.service";

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardModule,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatButton,
    MatInputModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.scss'
})
export class ResetPasswordDialogComponent {
  email = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    private loginService: LoginService
  ) {}

  resetPassword(): void {
    if (!this.email || !this.validateEmail(this.email)) {
      this.errorMessage = 'Introduceți o adresă de email validă în formatul prenume.nume@mta.ro.';
      this.successMessage = null;
      return;
    }

    this.isLoading = true;

    this.loginService.resetPasswordRequest(this.email).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message;
          this.errorMessage = null;
          timer(2000).subscribe(() => this.dialogRef.close());
        } else {
          this.errorMessage = response.message;
          this.successMessage = null;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Eroare la comunicarea cu serverul:', error);
        this.errorMessage = 'A apărut o eroare. Vă rugăm să încercați din nou.';
        this.successMessage = null;
        this.isLoading = false;
      },
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-z]+(?:\.[a-z]+)*@mta\.ro$/;
    return emailRegex.test(email);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
