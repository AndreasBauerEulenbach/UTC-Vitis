import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Account} from "@app/models/account";
import {RouterLink} from "@angular/router";
import {connectToDatabase} from "@app/_services/database.service";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit{
  @Input()
  player: Account;

  ngOnInit() {
    //connectToDatabase();
  }
}

