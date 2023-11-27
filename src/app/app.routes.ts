import {Route} from "@angular/router";
import {HomeComponent} from "@app/components/home/home.component";
import {CurrentstatusComponent} from "@app/components/currentstatus/currentstatus.component";
import {AuthGuard} from "@app/_helpers/auth.guard";
import {RulesComponent} from "@app/components/rules/rules.component";
import {ContactComponent} from "@app/components/contact/contact.component";
import {ImprintComponent} from "@app/components/imprint/imprint.component";
import {ReservationsComponent} from "@app/components/reservations/reservations.component";
import {AccountComponent} from "@app/modules/account/account.component";
import {ProfileLayoutComponent} from "@app/components/profile/profile-layout.component";
import {AdminComponent} from "@app/modules/admin/admin.component";
import {ListComponent} from "@app/modules/admin/accounts/list.component";
import {AddEditComponent} from "@app/modules/admin/accounts/add-edit.component";
import {DetailsComponent} from "@app/components/profile/details.component";
import {UpdateComponent} from "@app/components/profile/update.component";
import {LoginComponent} from "@app/modules/account/login/login.component";
import {RegisterComponent} from "@app/modules/account/register/register.component";
import {VerifyEmailComponent} from "@app/modules/account/verify-email/verify-email.component";
import {ForgotPasswordComponent} from "@app/modules/account/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "@app/modules/account/reset-password/reset-password.component";
import {UmlDiagramComponent} from "@app/modules/admin/accounts/uml-diagram/uml-diagram.component";
import {PlayerdetailsComponent} from "@app/components/player/playerdetails/playerdetails.component";

export const APP_ROUTES: Route[] = [
  { path: '', component: HomeComponent/*, canActivate: [AuthGuard] */},
  { path: 'currentstatus', component: CurrentstatusComponent, canActivate: [AuthGuard] },
  { path: 'rules', component: RulesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] },
  { path: 'playerdetails/:playerid', component: PlayerdetailsComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]
  },
  { path: 'profile', component: ProfileLayoutComponent, canActivate: [AuthGuard] ,
    children: [
      { path: '', component: DetailsComponent, canActivate: [AuthGuard] },
      { path: 'update', component: UpdateComponent, canActivate: [AuthGuard] },
      { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'accounts', component: AdminComponent, canActivate: [AuthGuard]/*, data: { roles: [Role.Admin] }, doppelte Sicherheit, Menüpunkt ist ja auch nur bei Administrator sichtbar*/ ,
    children: [
      { path: '', component: ListComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddEditComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: AddEditComponent, canActivate: [AuthGuard] },
      { path: 'uml-diagram', component: UmlDiagramComponent, canActivate: [AuthGuard] }
      ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]
