import { Dimensions } from 'react-native';
import { GameTypeEnum } from './enum';

// Define current device screen dimensions
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// WS Request timeout (ms), After this duration axios will throw an error
export const REQUEST_TIMEOUT = 20000;
export const ACTIVE_TOUCHABLE_OPACITY: number = 0.8;
export const DEFAULT_HORIZONTAL_PADDING: number = 48;
export const CUSTOM_INPUT_DEFAULT_VERTICAL_PADDING: number = 16;

export const CUSTOM_INPUT_DEFAULT_FONT_SIZE: number = 16;

export const PLAYER_NUMBER_RADIO_BUTTON_OPTIONS = [
  {
    id: '1',
    label: '2',
    value: '2'
  },
  {
    id: '2',
    label: '3',
    value: '3'
  },
  {
    id: '3',
    label: '4',
    value: '4'
  }
];

export const GAME_TYPE_RADIO_BUTTON_OPTIONS = [
  {
    id: '1',
    label: GameTypeEnum.RAMI,
    value: GameTypeEnum.RAMI
  },
  {
    id: '2',
    label: GameTypeEnum.CHKOBBA,
    value: GameTypeEnum.CHKOBBA
  }
];
