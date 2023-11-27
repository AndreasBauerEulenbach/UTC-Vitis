import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Account} from "@app/models/account";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input()
  player: Account;
}
