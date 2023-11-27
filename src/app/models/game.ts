import {Time} from "@angular/common";
import {Account} from "@app/models/account";

export class Game {
    gameId: number;
    creatorId: string;
    player1: Account;
    player2: Account;
    date: Date;
    time: Time;
    location: String;
    result_set1_Player1: number;
    result_set1_Player2: Number;
    result_set2_Player1: Number;
    result_set2_Player2: Number;
    result_set3_Player1: Number;
    result_set3_Player2: Number;
    result_winner_accountId: string;
}
