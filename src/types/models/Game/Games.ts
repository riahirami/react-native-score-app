import {type GameTypeEnum} from '_utils/enum';

export interface GameAttributes {
  playersNumber: number;
  gameType: GameTypeEnum;
  finalScore?: number;
  playersName?: string[];
  team?: boolean;
}
