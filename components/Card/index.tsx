import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {CardHeight, CardWidth} from './constants';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
interface CardProps {}
const IMG =
  'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Card: React.FC<CardProps> = ({}) => {
  const [isGrowing, setIsGrowing] = useState(false);
  const cardWidth = useSharedValue(CardWidth);
  const cardHeight = useSharedValue(CardHeight);
  const cardBg = useSharedValue('#000');
  const cardText = useSharedValue('#fff');
  const isPressed = useSharedValue(0);
  const imgRotate = useSharedValue(0);
  const rotateImgStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${imgRotate.value}deg`,
      },
    ],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    width: cardWidth.value,
    height: cardHeight.value,
  }));
  const cardBgStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(isPressed.value, [0, 100], ['black', 'white']);
    return {
      backgroundColor: bg,
    };
  });
  const cardTextStyle = useAnimatedStyle(() => {
    const txtColor = interpolateColor(
      isPressed.value,
      [0, 100],
      ['white', 'black'],
    );
    return {
      color: txtColor,
    };
  });

  const onPressIn = () => {
    setIsGrowing(true);
    isPressed.value = withTiming(100);
    imgRotate.value = withTiming(360, {
      duration: 800,
      // easing: Easing.out(Easing.ease),
    });
    cardWidth.value = withTiming(CardWidth + 100, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    cardHeight.value = withTiming(CardHeight + 30, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  const onPressOut = () => {
    setIsGrowing(Prev => !Prev);
    isPressed.value = withTiming(0);
    imgRotate.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
    cardWidth.value = withTiming(CardWidth, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    cardHeight.value = withTiming(CardHeight, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  return (
    <AnimatedPressable
      // onPress={() => (isGrowing ? onPressOut() : onPressIn())}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[cardStyle, cardBgStyle, styles.container]}
    >
      <Animated.Image
        source={{uri: IMG}}
        style={[rotateImgStyle, styles.image]}
      />
      <View style={styles.textBox}>
        <Animated.Text style={[styles.text, cardTextStyle]}>
          Anas Tely
        </Animated.Text>
        <Animated.Text style={[styles.text, cardTextStyle]}>
          @AnasNTy
        </Animated.Text>
      </View>
    </AnimatedPressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#fff',
  },
  textBox: {
    marginHorizontal: 20,
  },
  text: {
    marginHorizontal: 20,
    fontSize: 20,
    color: '#fff',
  },
});
