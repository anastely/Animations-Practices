import React from 'react';
import {View, Text, StyleSheet, ViewStyle, Pressable} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface TrackerProps {
  number: number;
  style: ViewStyle;
  overflowBoxStyle: ViewStyle;
  onPress: () => void;
}
type ContextInterface = {
  translationY: number;
};
const Tracker: React.FC<TrackerProps> = ({
  style,
  overflowBoxStyle,
  onPress,
  number,
}) => {
  const startingPosition = 10;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const pressed = useSharedValue(false);

  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, ctx) => {
      ctx.translationY = y.value;
    },
    onActive: (event, ctx) => {
      y.value = event.translationY + ctx.translationY;
    },
    onEnd: (event, ctx) => {
      // y.value = withSpring(event.translationY);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}],
    };
  });
  return (
    // <PanGestureHandler onGestureEvent={eventHandler}>
    <AnimatedPressable
      style={[styles.container, style, animatedStyle]}
      onPress={onPress}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: '#777777',
          },
          overflowBoxStyle,
        ]}
      />
      <Text style={styles.txt}>{number}</Text>
    </AnimatedPressable>
    // </PanGestureHandler>
  );
};

export default Tracker;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'absolute',
    width: 40,
    height: 80,
    right: 10,
    top: 50,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  txt: {
    fontSize: 16,
    color: '#fff',
  },
});
