import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styled } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import seperatorIcon from '../../../resource/icon/ic-separator-logo.png';
import Icon from 'react-native-vector-icons/Ionicons';

const Letter_Ex_Operate_Button = props => {
  const { style, letterInfo, sendValue } = props; //letterInfo의 정보를 통해, 내가 쓴 편지인지 확인
  const navigation = useNavigation();

  const getOperateText = () => {
    if (sendValue === 1) {
      return '답장하기';
    } else if (sendValue === 2) {
      return '이미 답장을 보냈습니다';
    } else if (sendValue === 3) {
      return '내가 보낸 답장입니다';
    }
  };

  return (
    <View style={style}>
      <Title_Container>
        <Title_Line />
        <Title_Icon source={seperatorIcon} />
        <Title_Line />
      </Title_Container>
      <Operate_Button
        onPress={() => {
          if (sendValue === 1) {
            navigation.navigate('Main_Letter_Receive', letterInfo);
          }
        }}>
        <Icon name="mail-outline" size={18} color="white" />
        <Operate_Text>{getOperateText()}</Operate_Text>
      </Operate_Button>
    </View>
  );
};

const Title_Container = styled(View)`
  margin: 12px 0 8px 0;
  width: 100%;
  height: 32px;
  align-self: center;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title_Line = styled(View)`
  flex: 4;
  background-color: white;
  border: 0.25px solid white;

  position: relative;

  z-index: 10;
`;

const Title_Icon = styled(Image)`
  flex: 1;
  margin: 0 8px;

  object-fit: contain;
`;

const Operate_Button = styled(Pressable)`
  margin-top: 8px;
  margin-bottom: 12px;
  width: 100%;
  height: 32px;

  border: 1px solid white;
  border-radius: 100px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Operate_Text = styled(Text)`
  margin: 0 8px;

  font-size: 14px;
  font-weight: bold;

  color: white;
`;

export default Letter_Ex_Operate_Button;
