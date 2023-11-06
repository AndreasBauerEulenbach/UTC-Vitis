import {NgModule} from '@angular/core';
import {MenuComponent} from './components/menu/menu.component';
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [MenuComponent],
    imports: [
        NgClass,
        NgIf,
        RouterLink
    ],
  exports: [
  MenuComponent
  ]
})
export class MenuModule { }
