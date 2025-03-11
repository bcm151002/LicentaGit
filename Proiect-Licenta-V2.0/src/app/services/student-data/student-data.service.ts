import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { DatePersonale, DateScolarizare } from '../../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private personalDataUrl = `${environment.studDataServiceUrl}/users/date-personale`;
  private scolarizareDataUrl = `${environment.studDataServiceUrl}/users/date-scolarizare`;

  private tokenKey = 'authToken';

  // BehaviorSubjects pentru stocarea datelor
  private personalDataSubject = new BehaviorSubject<DatePersonale | null>(null);
  private scolarizareDataSubject = new BehaviorSubject<DateScolarizare | null>(null);

  // Observabile publice pentru a expune datele
  public personalData$: Observable<DatePersonale | null> = this.personalDataSubject.asObservable();
  public scolarizareData$: Observable<DateScolarizare | null> = this.scolarizareDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Preluare date personale și actualizare BehaviorSubject
  fetchPersonalData(): Observable<DatePersonale> {
    const token = this.getToken();
    if (!token) {
      console.error('JWT token is missing in localStorage');
      return throwError(() => new Error('JWT token is missing'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<DatePersonale>(this.personalDataUrl, { headers }).pipe(
      tap(data => this.personalDataSubject.next(data)), // Actualizează BehaviorSubject cu datele primite
      catchError(err => {
        console.error('Error fetching personal data:', err);
        return throwError(() => new Error('Failed to fetch personal data'));
      })
    );
  }

  // Preluare date academice și actualizare BehaviorSubject
  fetchAcademicData(): Observable<DateScolarizare> {
    const token = this.getToken();
    if (!token) {
      console.error('JWT token is missing in localStorage');
      return throwError(() => new Error('JWT token is missing'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<DateScolarizare>(this.scolarizareDataUrl, { headers }).pipe(
      tap(data => this.scolarizareDataSubject.next(data)), // Actualizează BehaviorSubject cu datele primite
      catchError(err => {
        console.error('Error fetching academic data:', err);
        return throwError(() => new Error('Failed to fetch academic data'));
      })
    );
  }

  // Metode pentru accesarea datelor curente fără request
  getPersonalData(): DatePersonale | null {
    return this.personalDataSubject.value;
  }

  getAcademicData(): DateScolarizare | null {
    return this.scolarizareDataSubject.value;
  }
}
