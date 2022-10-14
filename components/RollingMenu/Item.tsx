import React from 'react';
import {StyleSheet, Image, Dimensions, Pressable} from 'react-native';
import Animated, {FadeInUp, FadeOutDown, Layout} from 'react-native-reanimated';

interface ItemProps {
  icon?: string;
  bg?: string;
  circleStyle?: any;
  onPress?: () => void;
}

const SCREEN_WIDTH = Dimensions.get('screen').width;
export const ITEM_DIMENSION = SCREEN_WIDTH / 6 - 2 * 2;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Item: React.FC<ItemProps> = ({onPress, circleStyle, bg, icon}) => {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: bg,
          transform: [
            {
              scale: 0,
            },
          ],
        },
        circleStyle,
      ]}
    >
      <Image style={styles.img} source={{uri: icon}} />
    </AnimatedPressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: ITEM_DIMENSION,
    height: ITEM_DIMENSION,
    borderRadius: ITEM_DIMENSION / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'center',
    alignSelf: 'center',
  },
});
