import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

export interface ItemProps {
  id: number;
  name: string;
  description: string;
  img: string;
  styleImg: ViewStyle;
  styleDescText: TextStyle;
}
const SCREEN_WIDTH = Dimensions.get('screen').width;

const Item: React.FC<ItemProps> = ({
  id,
  description,
  name,
  img,
  styleImg,
  styleDescText,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: id === 2 ? '#e82486' : '#ffffff',
        },
      ]}
    >
      <Animated.View style={styleImg}>
        <Image style={styles.img} source={{uri: img}} />
      </Animated.View>
      <Text style={[styles.name, {color: id === 2 ? '#fff' : '#000'}]}>
        {name}
      </Text>
      {/* <Animated.View style={[styles.descBox]}> */}
      <Animated.Text
        style={[
          styles.desc,
          {color: id === 2 ? '#fff' : '#000'},
          styleDescText,
        ]}
      >
        {description}
      </Animated.Text>
      {/* </Animated.View> */}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 4.3,
    backgroundColor: 'white',
    marginHorizontal: 3,
    borderRadius: 4,
    // marginEnd: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    height: undefined,
  },
  img: {
    marginVertical: 5,
    borderRadius: 5,
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  contextBox: {
    marginHorizontal: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 5,
  },
  descBox: {
    marginHorizontal: 5,
    // backgroundColor: '#048',
  },
  desc: {
    fontSize: 10,
    textAlign: 'center',
    color: '#333',
  },
});
