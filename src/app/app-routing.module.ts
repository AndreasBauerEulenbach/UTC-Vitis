import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CurrentstatusComponent} from "./modules/currentstatus/components/currentstatus/currentstatus.component";
import {ContactComponent} from "./modules/contact/components/contact/contact.component";
import {HomeComponent} from "@app/modules/home/home.component";
import {AuthGuard} from "@app/_helpers/auth.guard";
import {RulesComponent} from "@app/modules/rules/components/rules/rules.component";
import {ReservationsComponent} from "@app/modules/reservations/components/reservations/reservations.component";
import {ImprintComponent} from "@app/modules/imprint/components/imprint/imprint.component";

const accountModule = () => import('./modules/account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./modules/admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./modules/profile/profile.module').then(x => x.ProfileModule);
const accountsModule = () => import('././modules/admin/accounts/accounts.module').then(x => x.AccountsModule);

const routes: Routes = [
  { path: '', component: HomeComponent/*, canActivate: [AuthGuard] */},
  { path: 'currentstatus', component: CurrentstatusComponent, canActivate: [AuthGuard] },
  { path: 'rules', component: RulesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule},
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'accounts', loadChildren: accountsModule, canActivate: [AuthGuard]/*, data: { roles: [Role.Admin] }, doppelte Sicherheit, Menüpunkt ist ja auch nur bei Administrator sichtbar*/ },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
