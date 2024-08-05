import { useState, useLayoutEffect, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { styled } from 'styled-components';
import Letter_List_Carousel from './letter_list_carousel';
import { req_letterInfo } from '../../../../utils/requestApi';

const letterInfo = [
  {
    keywords: '왜 물어, 개놈시키, 진짜 개가 뭄',
    title: '안반가운 강아지',
    content:
      'asdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\nasdfasdfadfasdf\n',
    created_date_time: '2023.07.21',
    receive_lt_cnt: 4,
    like_cnt: 9,
    id: 1,
  },
  {
    keywords: '귀욤, 강아지, 시고르자브종',
    title: '반가운 강아지 가족들',
    created_date_time: '2023.07.21',
    receive_lt_cnt: 15,
    like_cnt: 32,
    id: 2,
  },
  {
    keywords: '야생, 도치, 동글동글',
    title: '반가운 고슴도치',
    created_date_time: '2023.07.21',
    receive_lt_cnt: 12,
    like_cnt: 23,
    id: 3,
  },
  {
    keywords: '고슴도치, 깜찍함',
    title: '따봉 도치의 축복',
    created_date_time: '2023.07.21',
    receive_lt_cnt: 30,
    like_cnt: 42,
    id: 4,
  },
  {
    keywords: '난 라쿤이야 멍청이들아',
    title: '너굴맨이 처리했어',
    created_date_time: '2023.07.21',
    receive_lt_cnt: 18,
    like_cnt: 84,
    id: 5,
  },
  {
    keywords: '너굴맨, 라쿤',
    title: '아무튼 처리했으니 걱정말라구',
    created_date_time: '2023.07.21',
    receive_lt_cnt: 57,
    like_cnt: 32,
    id: 6,
  },
]; //임시데이터, API 호출 다이어리 데이터로 변경 요망

const Main_Letter_List_Page = props => {
  const { navigation, route } = props;
  const data = route.params;
  const letterChoiceInfo = data.info;
  const item = data.item;
  // const [letterInfo, setLetterInfo] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: '편지・이야기',
    });
  });

  // useEffect(() => {
  //     req_letterInfo(data => {
  //         if (data.result)
  //             setLetterInfo(data.letter_info);
  //         else
  //             console.log('편지를 불러오는데 실패했습니다')
  //     })
  // }, [])

  return (
    <Wrapper>
      {/* <Header_Container>
                <View style={styles.shadowBG}/>
                <Title>{title}</Title>
            </Header_Container> */}
      <Letter_List_Carousel
        currentItem={item}
        letterChoiceInfo={letterChoiceInfo}
      />
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  background-color: white;
`;

export default Main_Letter_List_Page;
