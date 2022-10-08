import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DATA} from './Data';
import Tracker from './Tracker';

interface ScrollTrackerProps {}

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const ITEM_HEIGHT = SCREEN_HEIGHT;
const ITEMS_COUNT = DATA.length;

const ScrollTracker: React.FC<ScrollTrackerProps> = ({}) => {
  const [currentIndex, setIndex] = useState(ITEMS_COUNT);
  const translationY = useSharedValue(0);
  const aref = useAnimatedRef();
  const scroll = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(aref, 0, scroll.value * ITEM_HEIGHT, true);
  });

  const scrollHandler = useAnimatedScrollHandler(event => {
    const index = Math.floor(translationY.value / ITEM_HEIGHT);
    translationY.value = event.contentOffset.y;
    runOnJS(setIndex)(ITEMS_COUNT - index);
    // index >= 1
    //   ? runOnJS(setIndex)(ITEMS_COUNT - index)
    //   : runOnJS(setIndex)(ITEMS_COUNT);
  });

  const overflowBoxStyle = useAnimatedStyle(() => {
    const top =
      (translationY.value / ITEMS_COUNT) * 0.1 <= 0
        ? (translationY.value / ITEMS_COUNT) * 0.1
        : (translationY.value / ITEMS_COUNT) * 0.1 + 5;
    return {
      top: withTiming(top, {
        duration: 500,
        easing: Easing.linear,
      }),
    };
  });

  const styleTracker = useAnimatedStyle(() => {
    // const top = translationY.value / ITEMS_COUNT + (ITEM_HEIGHT - 10);
    const top =
      translationY.value / ITEMS_COUNT <= 0
        ? translationY.value / ITEMS_COUNT + 50
        : translationY.value / ITEMS_COUNT <= 50
        ? translationY.value / ITEMS_COUNT + 50
        : translationY.value / ITEMS_COUNT - 10;
    return {
      top: withTiming(top, {
        duration: 500,
        // easing: Easing.bezier(0.61, 1, 0.88, 1),
        easing: Easing.linear,
      }),
    };
  });

  const onPress = () => {
    let increment = 1;
    scroll.value = scroll.value + increment;
    if (scroll.value >= ITEMS_COUNT - 1) scroll.value = 0;
    // if (scroll.value >= ITEMS_COUNT) scroll.value = 0;
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.imgBox}>
        <Image source={{uri: item.img}} style={styles.img} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={aref}
        data={DATA}
        scrollEventThrottle={16}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
      <Tracker
        overflowBoxStyle={overflowBoxStyle}
        style={styleTracker}
        number={currentIndex}
        onPress={onPress}
      />
    </View>
  );
};

export default ScrollTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBox: {
    width: '100%',
    height: ITEM_HEIGHT,
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flexGrow: 1,
  },
});
// const Comp = () => {
//   const aref = useAnimatedRef();
//   const scroll = useSharedValue(0);

//   useDerivedValue(() => {
//     scrollTo(aref, 0, scroll.value * 100, true);
//   });

//   const items = Array.from(Array(10).keys());

//   return (
//     <View style={{flex: 1, height: '100%', top: 100}}>
//       <Button
//         title="scroll down"
//         onPress={() => {
// scroll.value = scroll.value + 1;
// if (scroll.value >= 10) scroll.value = 0;
//         }}
//       />
//       <View style={{width: 120, height: 200, backgroundColor: 'green'}}>
//         <ScrollView ref={aref} style={{backgroundColor: 'orange', width: 120}}>
//           {items.map((_, i) => (
//             <View
//               key={i}
//               style={{
//                 backgroundColor: 'white',
//                 width: 100,
//                 height: 100,
//                 margin: 10,
//               }}
//             />
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };
// export default Comp;
