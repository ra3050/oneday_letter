import { useLayoutEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styled } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import seperatorIcon from '../../../resource/icon/ic-separator-logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { get_usreIdx } from '../../Controller/Storage';
import { req_receiveCheck } from '../../utils/requestApi';

const Letter_Operate_Button = props => {
  const { style, letterInfo } = props; // letterInfo의 정보를 통해, 내가 쓴 편지인지 확인
  const [myLetter, setMyLetter] = useState(false); // false: 내 편지 X, true: 내 편지 O, letterInfo의 mb_idx를 비교하여 내가 보낸 편지일경우 true로 설정합니다
  const [check, setCheck] = useState(false); // false: 답장을 보낼 수 있음, true: 이미 답장을 보냄
  const navigation = useNavigation();

  useLayoutEffect(() => {
    get_usreIdx(value => {
      const check_info = { lt_idx: letterInfo.lt_idx, mb_idx: value };
      req_receiveCheck(check_info, data => {
        if (data.result) {
          setCheck(true);
        }
      });

      if (value == letterInfo.mb_idx) {
        setMyLetter(true);
      }
    });
  }, []);

  return (
    <View style={style}>
      <Title_Container>
        <Title_Line />
        <Title_Icon source={seperatorIcon} />
        <Title_Line />
      </Title_Container>
      <Operate_Button
        onPress={() => {
          if (myLetter) {
            const new_lt_info = { lt_idx: letterInfo.lt_idx };
            navigation.navigate('Main_Letter_Exchange', new_lt_info);
          } else {
            if (!check) {
              navigation.navigate('Main_Letter_Receive', letterInfo);
            }
          }
        }}>
        <Icon name="mail-outline" size={24} color="white" />
        <Operate_Text>
          {myLetter
            ? '답장 확인하기'
            : check
              ? '이미 답장을 보냈습니다'
              : '편지 보내기'}
        </Operate_Text>
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
  margin: 4px 8px;

  font-size: 14px;
  font-weight: bold;

  color: white;
`;

export default Letter_Operate_Button;
