import {Time} from "@angular/common";
import {Account} from "@app/models/account";

export class Game {
    _id: number;
    tournamentId: number;
    creatorId: string;
    player1: Account;
    player2: Account;
    creationDate: Date;
    location: string;
    expirationDate: Date;                     //Datum wann die Forderung verstreicht, vorerst 14 Tage nach dem creationDate.
    expired: Boolean;                         //Forderung verstrichen - J/N
    declined: Boolean;                        //Forderung abgelehnt - J/N
    declinedReason: string;                   //Forderung abgelehnt - im Falle von 'J': Ablehnungsgrund
    result_set1_Player1: number;
    result_set1_Player2: number;
    result_set2_Player1: number;
    result_set2_Player2: number;
    result_set3_Player1: number;
    result_set3_Player2: number;
    result_winner_accountId: string;
}
