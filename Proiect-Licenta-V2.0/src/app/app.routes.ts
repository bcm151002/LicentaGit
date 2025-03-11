import { Routes } from '@angular/router';
import {LoginComponent} from "./components/pages/LoginPages/login/login.component";
import {MainComponent} from "./components/pages/MainPages/main/main.component";
import {ForumComponent} from "./components/pages/ForumPages/forum/forum.component";
import {PageNotFoundComponent} from "./components/pages/MainPages/page-not-found/page-not-found.component";
import {OrarComponent} from "./components/pages/MainPages/orar/orar.component";
import {ExameneComponent} from "./components/pages/MainPages/examene/examene.component";
import {NoteComponent} from "./components/pages/MainPages/note/note.component";
import {RestanteComponent} from "./components/pages/MainPages/restante/restante.component";
import {authGuard} from "./guards/auth.guard";
import {ResetPasswordComponent} from "./components/pages/LoginPages/reset-password/reset-password.component";
import {ProfilComponent} from "./components/pages/MainPages/profil/profil.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      { path: 'examene', component: ExameneComponent, canActivate: [authGuard] },
      { path: 'note', component: NoteComponent, canActivate: [authGuard] },
      { path: 'restante', component: RestanteComponent, canActivate: [authGuard] },
      { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },
    ],
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: 'forum', component: ForumComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '/404' },
];

