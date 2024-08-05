import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated, Text } from 'react-native';
import { styled } from 'styled-components';

/**
 * 해당 함수는 page component로 부터 letterInfo를 받습니다
 * onPress시 user_idx를 사용하여 데이터를 불러옵니다
 * 불러온 데이터를 page component에 state를 사용하여 전달합니다
 * @param {letterInfo(mb_nick, user_idx)값을 인자값으로 받습니다}
 * @param {(value) index값}
 * @param {(press) 현재 클릭된 값입니다}
 * @param {(setPress) 클릭한 번호 index를 넘겨줍니다}
 * @param {(width) 계산된 width값을 받습니다}
 */
const Testing = props => {
  const { letterInfo, value, press, setPress, width } = props;
  const sizeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(sizeAnimation, {
      toValue: value === press ? 1.1 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [press]);

  return (
    <Animated.View
      style={[styles(width).wrapper, { transform: [{ scale: sizeAnimation }] }]}>
      <Pressable style={styles(width).button} onPress={() => setPress(value)}>
        <NickName ellipsizeMode="tail">{letterInfo?.mb_nick}</NickName>
      </Pressable>
    </Animated.View>
  );
};

const styles = width =>
  StyleSheet.create({
    wrapper: {
      marginLeft: 8,
      marginVertical: 8,
      width: width,
      height: width,
      borderRadius: 50,
      backgroundColor: '#C1D4F8',
    },
    button: {
      width: width,
      height: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

const NickName = styled(Text)`
  align-self: center;
  text-align: center;

  font-size: 12px;
  font-weight: bold;
  color: #30487d;
`;

export default Testing;
