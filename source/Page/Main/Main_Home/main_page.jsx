import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { styled } from 'styled-components';
import ilust from '../../../../resource/Main/ilust_main.png';
import Carousel from './main_letter_carousel';
import { getPhotoWithPermission } from '../../../Controller/Gallery';
import { req_letterInfo } from '../../../utils/requestApi';

const Main_page = props => {
  const { navigation, route } = props;
  const [page, setPage] = useState(0);
  const [letterInfo, setLetterInfo] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: '홈',
    });
  });

  useEffect(() => {
    getPhotoWithPermission(); // 사용자 카메라 인증
  }, []);

  useEffect(() => {
    req_letterInfo(data => {
      if (data.result) setLetterInfo(data.letter_info);
      else console.log('안된다');
    });
  }, []);

  return (
    <Wrapper>
      <Main_Absolute_Content_Box style>
        <Main_Title>오늘의 편지가 도착했어요</Main_Title>
        <Main_Descrypt>
          {
            '나를 드러내고 싶지 않지만\n다른사람의 의견을 물어보고싶어\n너는 어떻게 생각해?'
          }
        </Main_Descrypt>
        <Main_Ilust source={ilust} />
        {/* <Letter_Box letterInfo={letterInfo}/>  */}
        <Main_Carousel_Box>
          <Carousel letterInfo={letterInfo.slice(0, 7)} onPaging={setPage} />
        </Main_Carousel_Box>
        <IndicatorWrapper>
          {Array.from({ length: 7 }, (_, i) => i).map(i => (
            <Indicator key={`Indicator_${i}`} focused={i === page} />
          ))}
        </IndicatorWrapper>
      </Main_Absolute_Content_Box>
    </Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)`
  width: 100%;
  height: 100%;

  position: relative;
  background-color: white;
`;

const Main_Absolute_Content_Box = styled(View)`
  width: 100%;
  height: 100%;

  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main_Title = styled(Text)`
  margin-bottom: ${(52 / 822) * 100}%;
  width: 100%;

  position: relative;

  font-family: 'Cafe24Simplehae';
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #537bcc;
`;

const Main_Descrypt = styled(Text)`
  margin-bottom: ${(105 / 3120) * 100}%;
  width: 100%;

  position: relative;

  font-family: 'Cafe24Simplehea';
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #666666;
`;

const Main_Ilust = styled(Image)`
  height: ${(287 / 3120) * 100}%;

  position: relative;
  object-fit: contain;
`;

const Main_Carousel_Box = styled(View)`
  width: 100%;
  aspect-ratio: 1440/1160;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
`;

const Indicator = styled(View)`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#537BCC' : '#dfdfdf')};
  width: ${props => (props.focused ? `12px` : `6px`)};
  height: 6px;
  border-radius: 3px;
`;

const IndicatorWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export default Main_page;
