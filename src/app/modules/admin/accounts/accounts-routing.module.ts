import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListComponent} from './list.component';
import {AddEditComponent} from './add-edit.component';
import {AuthGuard} from "@app/_helpers/auth.guard";

const routes: Routes = [
    { path: '', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddEditComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: AddEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }
