import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GameTypeEnum } from '../../../utils/enum';

interface Player {
  playerIndex: number;
  name: string;
  score: number;
}
interface GameState {
  players: Player[];
  playersNumber: number;
  gameType: GameTypeEnum;
  finalScore?: number;
  isGameOver: boolean;
  isGameStarted?: boolean;
  team?: boolean;
}

const initialState: GameState = {
  players: [],
  playersNumber: 2,
  gameType: GameTypeEnum.RAMI,
  isGameOver: false,
  isGameStarted: false,
  team: false
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayersNumber: (state, action: PayloadAction<number>) => {
      state.playersNumber = action.payload;
    },
    setGameType: (state, action: PayloadAction<GameTypeEnum>) => {
      state.gameType = action.payload;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameStarted = false;
      state.team = false;
    },
    setFinalScore: (state, action: PayloadAction<number>) => {
      state.finalScore = action.payload;
    },
    setGameStarted: (state) => {
      state.isGameStarted = true;
    },
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload.map((playerName) => ({
        playerIndex: action.payload.indexOf(playerName) + 1,
        name: playerName,
        score: 0
      }));
      // .filter((player) => player.name);
    },
    toggleGameTeamMode: (state, action: PayloadAction<boolean>) => {
      state.team = action.payload;
    }
  }
});

export const {
  setGameType,
  setPlayers,
  setGameOver,
  setFinalScore,
  setPlayersNumber,
  setGameStarted,
  toggleGameTeamMode
} = gameSlice.actions;

export const selectGame = (state: { game: GameState }): GameState => state.game;

export default gameSlice;
