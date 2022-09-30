import {Dimensions} from 'react-native';

export const {height: ScreenHeight, width: ScreenWidth} =
  Dimensions.get('screen');
export const CardWidth = ScreenWidth * 0.6 + 50;
export const CardHeight = 100;
