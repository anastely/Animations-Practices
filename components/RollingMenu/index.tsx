import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {DATA} from './Data';
import Item, {ITEM_DIMENSION} from './Item';

interface RollingMenuProps {}
const SCREEN_WIDTH = Dimensions.get('screen').width;
const RollingMenu: React.FC<RollingMenuProps> = ({}) => {
  const [pressed, setPressed] = useState(false);
  const mainCircleTranslationX = useSharedValue(0);
  const circlesTranslationX = useSharedValue(-SCREEN_WIDTH);
  const circlesScale = useSharedValue(0);
  const circlesRotate = useSharedValue(240);
  const mainCirclesRotate = useSharedValue(0);

  const onPress = () => {
    setPressed(prev => !prev);
    if (!pressed) {
      mainCircleTranslationX.value = withTiming(
        SCREEN_WIDTH - ITEM_DIMENSION - 4,
        {
          duration: 1500,
        },
      );
      mainCirclesRotate.value = withTiming(135, {
        duration: 1520,
      });
      circlesTranslationX.value = withTiming(-ITEM_DIMENSION - 4, {
        duration: 1550,
      });
      circlesRotate.value = withTiming(0, {
        duration: 1600,
      });
      circlesScale.value = withTiming(1, {
        duration: 1800,
      });
    } else {
      mainCircleTranslationX.value = withTiming(0, {
        duration: 1100,
      });
      mainCirclesRotate.value = withTiming(0, {
        duration: 1100,
      });
      circlesTranslationX.value = withTiming(-SCREEN_WIDTH, {
        duration: 1200,
      });
      circlesRotate.value = withTiming(240, {
        duration: 1100,
      });
      circlesScale.value = withTiming(0, {
        duration: 1100,
      });
    }
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: mainCircleTranslationX.value,
        },
        {
          rotate: `${mainCirclesRotate.value}deg`,
        },
      ],
    };
  });

  const circlesStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: circlesTranslationX.value,
        },
        {
          rotate: `${circlesRotate.value}deg`,
        },
        {
          scale: circlesScale.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circlesBox}>
        <Item
          onPress={onPress}
          circleStyle={[
            {
              //   position: 'absolute',
              left: 0,
              zIndex: 999,
            },
            rStyle,
          ]}
          bg={'#ffffff'}
          icon={'https://static.thenounproject.com/png/1807535-200.png'}
        />
        {DATA.map((item, index) => {
          return (
            <Item
              circleStyle={[{}, circlesStyle]}
              key={item.id}
              bg={item.bg}
              icon={item.icon}
            />
          );
        })}
      </View>
    </View>
  );
};

export default RollingMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  circlesBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
