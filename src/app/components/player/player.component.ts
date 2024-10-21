import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Account} from "@app/models/account";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-player',
  imports: [CommonModule, RouterLink],
  templateUrl: './player.component.html',
  standalone: true,
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit{
  @Input()
  player: Account;

  ngOnInit() {
  }
}

