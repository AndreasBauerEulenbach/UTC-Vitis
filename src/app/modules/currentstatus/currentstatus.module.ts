import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrentstatusComponent} from './components/currentstatus/currentstatus.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    CurrentstatusComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ],
  exports: [
    CurrentstatusComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class CurrentstatusModule { }
