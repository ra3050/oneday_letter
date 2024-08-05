import { useState, useLayoutEffect, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { styled } from 'styled-components';
import { useHeaderHeight } from '@react-navigation/elements';
import Receive_Collect_Carousel from './receive_collect_carousel';
import Receive_Collect_Box from './receive_collect_box';
import { useIsFocused } from '@react-navigation/native';
import { req_boastLetter, req_boastList } from '../../../utils/requestApi';

const letterInfo = [
  {
    keywords: '자기개발, 면접, 취업, 니트족',
    title: '반가운 강아지 가족들',
    content: '반가운 강아지 가족들',
    created_date_time: '2023.07.21',
    like_cnt: '17',
    show_cnt: '1100',
    id: 1,
  },
  {
    keywords: '자기개발, 면접, 취업, 니트족',
    title: '반가운 강아지 가족들',
    content: '반가운 강아지 가족들',
    created_date_time: '2023.07.21',
    like_cnt: '17',
    show_cnt: '1100',
    id: 2,
  },
  {
    keywords: '자기개발, 면접, 취업, 니트족',
    title: '반가운 강아지 가족들',
    content: '반가운 강아지 가족들',
    created_date_time: '2023.07.21',
    like_cnt: '17',
    show_cnt: '1100',
    id: 3,
  },
  {
    keywords: '자기개발, 면접, 취업, 니트족',
    title: '반가운 강아지 가족들',
    content: '반가운 강아지 가족들',
    created_date_time: '2023.07.21',
    like_cnt: '17',
    show_cnt: '1100',
    id: 4,
  },
  {
    keywords: '자기개발, 면접, 취업, 니트족',
    title: '반가운 강아지 가족들, 반가운 강아지 가족들',
    content: '반가운 강아지 가족들, 반가운 강아지 가족들',
    created_date_time: '2023.07.21',
    like_cnt: '17',
    show_cnt: '1100',
    id: 5,
  },
  {
    keywords: '자기개발, 면접, 취업, 니트족',
    title: '반가운 강아지 가족들',
    content: '반가운 강아지 가족들',
    created_date_time: '2023.07.21',
    like_cnt: '17',
    show_cnt: '1100',
    id: 6,
  },
]; //임시데이터, API 호출 다이어리 데이터로 변경 요망

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Main_Receive_Collect_Page = props => {
  const { navigation, route } = props;
  const [paging, setPaging] = useState(0);
  const [letterInfo, setLetterInfo] = useState([]);
  const focuesd = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: '다른이야기',
    });
  });

  useLayoutEffect(() => {
    req_boastList(data => {
      if (data.result) {
        console.log(data);
        setLetterInfo(data.letterInfo);
      }
    });
  }, [focuesd]);

  return (
    <ScrollView style={styles.wrapper} bounces={false}>
      <View style={styles.backColor} />
      <>
        <SafeAreaView />
        <View style={[styles.title]}>
          <Text style={estyles.title}>난 이런 답장도</Text>
          <Text style={[estyles.title, { marginTop: 4 }]}>받아봤다</Text>
        </View>
      </>
      <View style={[styles.collect_Carousel]}>
        <Receive_Collect_Carousel
          letterInfo={letterInfo}
          onPaging={setPaging}
        />
      </View>
      <IndicatorWrapper>
        {Array.from({ length: letterInfo.length }, (_, i) => i).map(i => (
          <Indicator key={`Indicator_${i}`} focused={i === paging} />
        ))}
      </IndicatorWrapper>
      <View style={styles.together_title}>
        <Text style={estyles.together_title}>함께 보는 편지</Text>
      </View>
      <View style={styles.collect_list}>
        {letterInfo.map((item, index) => (
          <Receive_Collect_Box
            key={index}
            item={item}
            style={{
              width: (screenWidth - 24) / 2 - 8,
              height: screenWidth / 2 - 8,
              margin: 4,
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

//for Container styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  backColor: {
    width: screenWidth,
    aspectRatio: 1.3,
    backgroundColor: '#95ACC3',
    position: 'absolute',
  },
  title: {
    marginHorizontal: 16,
  },
  collect_Carousel: {
    marginTop: screenWidth * 0.15,
    width: screenWidth,
    aspectRatio: 1.3,
  },
  together_title: {
    margin: 16,
    width: screenWidth - 32,
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 1,
  },
  collect_list: {
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

//for element styles
const estyles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'white',
  },
  together_title: {
    marginVertical: 4,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});

const Indicator = styled(View)`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#537BCC' : '#dfdfdf')};
  width: ${props => (props.focused ? `12px` : `6px`)};
  height: 6px;
  border-radius: 3px;

  align-self: center;
`;

const IndicatorWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export default Main_Receive_Collect_Page;
