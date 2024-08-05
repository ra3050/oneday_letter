import { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { styled } from 'styled-components';
import Setting_Receive_Carousel from './setting_receive_carousel';
import Testing from './testing';
import { get_usreIdx } from '../../../../../Controller/Storage';
import { req_exchangeListing } from '../../../../../utils/requestApi';
import { useFocusEffect } from '@react-navigation/native';
import Letter_Exchange_Page from '../../../Letter_Exchange/letter_exchange_page';

const testInfo = [
  {
    nickname: '에디',
  },
  {
    nickname: '곰맛곰탕',
  },
  {
    nickname: '지름길',
  },
  {
    nickname: '냉삼',
  },
  {
    nickname: '하양추',
  },
  {
    nickname: '무지개하츠',
  },
];

const screenWidth = Dimensions.get('window').width;

const Setting_Receive_Page = props => {
  const { navigation, route } = props;
  const [pressIndex, setPressIndex] = useState(1);
  const [exLetterInfo, setExLetterInfo] = useState([]);
  var useFocus;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '내가 받은 편지',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'Cafe24Simplehae', color: '#6b7c96' },
      headerBackTitleVisible: false,
      headerBackTitle: '',
      headerBackTitleVisible: false,
    });
  });

  useLayoutEffect(() => {
    get_usreIdx(mb_idx => {
      const info = { mb_idx: mb_idx };

      req_exchangeListing(info, data => {
        const info = data.info;

        const groupedData = {};
        info.forEach(item => {
          if (item.sender_mb_idx === mb_idx) {
            const { re_mb_nick } = item;
            if (re_mb_nick === null) {
              return;
            }

            if (!groupedData[re_mb_nick]) {
              groupedData[re_mb_nick] = [];
            }
            groupedData[re_mb_nick].push(item);
          } else {
            const { mb_nick } = item;
            if (!groupedData[mb_nick]) {
              groupedData[mb_nick] = [];
            }
            groupedData[mb_nick].push(item);
          }
        });

        const dataArray = Object.keys(groupedData).map(key => {
          return {
            mb_nick: key,
            data: groupedData[key],
          };
        });

        setExLetterInfo(dataArray);
      });
    });
  }, [useFocus]);

  useFocusEffect(() => {
    useFocus = useFocus + 1;
  });

  // console.log(exLetterInfo[pressIndex])

  return (
    <Wrapper>
      <View>
        <Container horizontal={true} showsHorizontalScrollIndicator={false}>
          {exLetterInfo.map((item, index) => (
            <Testing
              letterInfo={item}
              value={index + 1}
              press={pressIndex}
              setPress={setPressIndex}
              width={screenWidth * 0.2}
            />
          ))}
        </Container>
      </View>
      <ScrollView>
        <Setting_Receive_Carousel letterInfo={exLetterInfo[pressIndex - 1]} />
      </ScrollView>
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  flex: 1;
  background-color: white;
`;

const Container = styled(ScrollView)`
  background-color: white;
  overflow: none;
`;
export default Setting_Receive_Page;
