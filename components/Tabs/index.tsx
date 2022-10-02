import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DATA} from './Data';
import Item, {ItemProps} from './Item';

interface TabsProps {}

const Tabs: React.FC<TabsProps> = ({}) => {
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const styleImg = useAnimatedStyle(() => {
    return {
      height: withTiming(translationY.value > 50 ? 0 : 60, {
        duration: 600,
      }),
      transform: [
        {
          scale: withTiming(translationY.value > 50 ? 0 : 1, {
            duration: 600,
            easing: Easing.linear,
          }),
        },
      ],
      opacity: withTiming(translationY.value > 50 ? 0 : 1, {
        duration: 700,
      }),
    };
  });

  const styleDescText = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(translationY.value > 50 ? 1 : 10, {
        duration: 600,
      }),
      height: withTiming(translationY.value > 50 ? 0 : 30, {
        duration: 700,
      }),
      opacity: withTiming(translationY.value > 50 ? 0 : 1, {
        duration: 500,
      }),
      transform: [
        {
          scale: withTiming(translationY.value > 50 ? 0 : 1, {
            duration: 600,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const renderItem = (item: ItemProps) => {
    return (
      <View key={item.id} style={styles.contentBox}>
        <Image style={styles.image} source={{uri: item.img}} />
        <View>
          <Text style={[styles.text, {fontWeight: '600'}]}>{item.name}</Text>
          <Text style={styles.text}>{item.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.tabsBox}>
        {DATA.map(({id, description, name, img}) => {
          return (
            <Item
              key={id}
              id={id}
              styleImg={styleImg}
              styleDescText={styleDescText}
              description={description}
              name={name}
              img={img}
            />
          );
        })}
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 5,
          paddingBottom: 100,
        }}
      >
        {DATA.map(item => {
          return renderItem(item);
        })}
        {DATA.map(item => {
          return renderItem(item);
        })}
        {DATA.map(item => {
          return renderItem(item);
        })}
        {DATA.map(item => {
          return renderItem(item);
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center',
  },
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  image: {
    marginEnd: 10,
    width: 100,
    borderRadius: 5,
    height: 100,
  },
  text: {
    paddingBottom: 20,
    fontSize: 16,
  },
});
