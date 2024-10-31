export class Tournament {
  tournamentId: number;
  dateFrom: Date;
  dateTo: Date;
  defaultGameLocation: string;
  ranking: string;                    //VeithKevin;AngelStefan;GastingerSteffi;BauerBernhard;...
  rankingInNumbers: string;           //412;356;555; //356;412;555;
                                      //Ziel wäre es nach jedem Spiel einen neuen Ranking-Snapshot zu machen
}
