import { Pressable, Platform, Text, Dimensions, View } from 'react-native';
import { styled } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import moment from 'moment';
import { get_usreIdx } from '../../../Controller/Storage';

const Letter_Exchange_Container = props => {
  const { letterInfo } = props;
  const navigation = useNavigation();
  const [idx, setIdx] = useState('');

  useLayoutEffect(() => {
    get_usreIdx(mb_idx => {
      if (mb_idx) {
        setIdx(mb_idx);
      }
    });
  }, []);

  const handleReToReceive = (item, letterInfo) => {
    //답장을 보냈는가, 내가 보낸 답장인가,에 대한 값을 반환합니다
    var value = 1;

    console.log(idx, letterInfo);
    if (item.sender_mb_idx === idx) {
      // 내가 답장을 보냄, 3반환
      return 3;
    } else {
    }

    // letterInfo.forEach(element => {
    //     if (element.receiver_mb_idx === idx) {
    //         console.log(element, idx )
    //         value = 2;
    //     }
    // });

    return value;
  };

  return (
    <Wrapper>
      {letterInfo?.map((item, index) => {
        const sendValue = handleReToReceive(item, letterInfo);
        console.log(sendValue);

        return (
          <Letter_Content
            receive={sendValue === 3 ? false : true}
            key={index}
            onPress={() => {
              navigation.navigate('Main_Letter_Exchange_Content', {
                sendValue: sendValue,
                letterInfo: item,
              });
            }}>
            <Letter_Title numberOfLines={1} lineBreakMode="tail">
              {item.content}
            </Letter_Title>
            <Letter_Date>
              {moment(item.created_date_time).format('YYYY.MM.DD')}
            </Letter_Date>
          </Letter_Content>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  flex: 1;

  background-color: white;
`;

const Letter_Content = styled(Pressable)`
  margin: 8px 16px;
  width: 75%;
  height: 80px;

  border-radius: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //receive는 받은편지, 보낸편지를 구분하는 값
  //구분된 값에 따라서 왼쪽, 오른쪽으로 위치가 이동하도록 표현됨
  align-self: ${props => (props.receive ? 'flex-start' : ' flex-end')};

  ${Platform.OS === 'ios'
    ? `shadow-color: gray;
        shadow-offset: 0px 1px;
        shadow-opacity: 0.5;
        shadow-radius: 4px;`
    : `elevation: 7;`}

  background-color: ${props => (props.receive ? 'white' : '#DEEBF7')};
`;

const Letter_Title = styled(Text)`
  width: 75%;

  align-self: center;

  position: relative;
  font-family: 'Cafe24Simplehae';
  font-size: 16px;
  text-align: center;

  color: gray;
`;

const Letter_Date = styled(Text)`
  margin-top: 4px;
  font-family: 'Cafe24Simplehae';
  font-size: 12px;

  position: relative;

  color: gray;
`;

export default Letter_Exchange_Container;
