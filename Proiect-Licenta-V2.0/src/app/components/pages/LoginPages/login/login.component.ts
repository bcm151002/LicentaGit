import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ThemeSelectorComponent } from "../../../shared/theme-selector/theme-selector.component";
import { Router, RouterLink } from "@angular/router";
import {LoginService} from "../../../../services/login/login.service";
import {MatDialog} from '@angular/material/dialog';
import {ResetPasswordDialogComponent} from "../reset-password-dialog/reset-password-dialog.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    ThemeSelectorComponent,

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = signal(true);
  username = signal('');
  password = signal('');
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private loginService: LoginService,
              private router: Router,
              private dialog: MatDialog,
              ) {

  }

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  login() {
    this.loginService.login(this.username(), this.password()).subscribe({
      next: (response) => {
        if (response.success) {
          this.loginService.saveToken(response.token!);
          this.successMessage = response.message;
          this.errorMessage = null;

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        }
      },
      error: (errorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this.errorMessage = errorResponse.error.message;
        } else {
          this.errorMessage = "A aparut o eroare necunoscuta!";
        }
        this.successMessage = null;
      }
    });
  }



  openResetPasswordDialog(event: MouseEvent): void {
    event.preventDefault(); // Previne trimiterea formularului
    this.dialog.open(ResetPasswordDialogComponent, {
      width: '400px',
      disableClose: false,
    });
  }
}
