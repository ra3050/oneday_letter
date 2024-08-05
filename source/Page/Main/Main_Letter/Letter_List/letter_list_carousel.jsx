import { styled } from 'styled-components';
import {
  View,
  FlatList,
  Dimensions,
  Platform,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import moment from 'moment';
import Letter_List_Box from './letter_list_box';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/Feather';
import { get_usreIdx } from '../../../../Controller/Storage';
import { req_letterInfo, req_categoryCheck } from '../../../../utils/requestApi';
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const getCurrentLtCnt = async () => {
  try {
    const currentTime = moment().format('YYYY-MM-DD');
    const letterCount = await AsyncStorage.getItem(currentTime);
    if (letterCount !== null) {
      console.log('오늘 작성한 편지는, ', letterCount, '개 입니다');
      return letterCount;
    } else {
      console.log('오늘 작성한 편지가 없습니다');
      return 0;
    }
  } catch (error) {
    console.log('오늘 쓴 데이터를 불러오는데 실패했습니다');
    return 0;
  }
};

const Letter_List_Carousel = props => {
  const { currentItem, letterChoiceInfo } = props; // currentItem: 선택한 카테고리 정보, setLetterInfo: 편지데이터 추가 로딩시 데이터 입력을 위해 사용
  const [sendCount, setSendCount] = useState(getCurrentLtCnt() === null && 0); // 오늘 작성한 편지 개수
  const [letterInfo, setLetterInfo] = useState([]);
  const [choiceInfo, setChoiceInfo] = useState(currentItem);
  const isFocused = useIsFocused();
  const gap = 16;

  useEffect(() => {
    req_letterInfo(data => {
      if (data.result) {
        handleLetterInfo(data.letter_info);
      } else console.log('편지를 불러오는데 실패했습니다');
    });
  }, [choiceInfo, isFocused]);

  const handleLetterInfo = newLetterInfo => {
    get_usreIdx(mb_idx => {
      var publicLetterInfo = [];
      newLetterInfo.forEach((item, index) => {
        if (!item.read_yn) {
          return;
        }

        publicLetterInfo = [...publicLetterInfo, item];
      });

      const info = { mb_idx: mb_idx };
      req_categoryCheck(info, data => {
        const category = data.category;
        var sort = [];

        if (choiceInfo.title == '같은 성향') {
          publicLetterInfo.forEach(item => {
            console.log(item.category, category);
            if (item.category === category) {
              sort = [...sort, item];
            }
          });
        } else if (choiceInfo.title === '비슷한 성향') {
          const categoryArr = category.split(',');

          publicLetterInfo.forEach(item => {
            //완전 동일한 편지는 제외합니다
            const itemCategoryArr = item.category.split(',');

            for (let i = 0; i < itemCategoryArr.length; i++) {
              if (categoryArr.indexOf(itemCategoryArr[i])) {
                sort = [...sort, item];
                return;
              }
            }
          });
        } else if (choiceInfo.title === '다른 성향') {
          const categoryArr = category.split(',');

          console.log('none');
          publicLetterInfo.forEach(item => {
            //완전 동일한 편지는 제외합니다
            if (!(item.category === category)) {
              const itemCategoryArr = item.category.split(',');
              var seperator = true;

              for (let i = 0; i < itemCategoryArr.length; i++) {
                if (categoryArr.indexOf(itemCategoryArr[i]) > -1) {
                  seperator = false;
                }
              }

              if (seperator) {
                sort = [...sort, item];
              }
            }
          });
        }
        setLetterInfo(sort);
      });
    });
  };

  const handleNextChoiceInfo = () => {
    const currentTitle = choiceInfo.title;
    var currentIndex = 0;

    letterChoiceInfo.forEach((element, index) => {
      if (currentTitle === element.title) {
        currentIndex = index;
      }
    });

    // index에 따른 LetterInfo API호출
    if (currentIndex === letterChoiceInfo.length - 1) {
      setChoiceInfo(letterChoiceInfo[0]);
    } else {
      setChoiceInfo(letterChoiceInfo[currentIndex + 1]);
    }
  };

  const renderItem = ({ item, index }) => {
    // console.log('currentItem', currentItem)
    return (
      <SafeAreaView>
        {index == 0 ? (
          <>
            {/* <Header_Container width={screenWidth}>
                        
                        <Header_Title_Container width={screenWidth}>
                            <Title_Container >
                                <Title>{choiceInfo.title}</Title>
                                <Descrypt>{'나와 비슷한 친구 분들과\n이야기를 나눠봐요'}</Descrypt>
                            </Title_Container>
                            <Pressable style={styles.change} onPress={handleNextChoiceInfo}>
                                <Icons name='chevron-right' size={24} color='black'/>
                            </Pressable>
                        </Header_Title_Container>
                        <Send_Letter_Count_Container>
                            <Text style={styles.percentTitle}>오늘 내가 보낸 답장</Text>
                            <Letter_Percent_root_Container>
                                <Letter_Percent_Container>
                                    <Text style={styles.currentCount}>
                                        {`${sendCount === false ? '0' : sendCount} / `}
                                        <Text style={styles.goalCount}>10 letter</Text>
                                    </Text>
                                    <Text style={styles.goalCount}>10%</Text>
                                </Letter_Percent_Container>
                            </Letter_Percent_root_Container>
                            <Percent_Bar>
                                <Percent_Bar_In percent={sendCount * 10}/>
                            </Percent_Bar>
                        </Send_Letter_Count_Container>
                    </Header_Container> */}
            <Letter_List_Box
              item={item}
              style={{ height: screenWidth, marginVertical: gap }}
            />
          </>
        ) : (
          <Letter_List_Box
            item={item}
            style={{ height: screenWidth, marginVertical: gap }}
          />
        )}
      </SafeAreaView>
    );
  };

  return (
    <Container>
      <Header_Container width={screenWidth}>
        <SafeAreaView />
        <Header_Title_Container width={screenWidth}>
          <Title_Container>
            <Title>{choiceInfo.title}</Title>
            <Descrypt>{'나와 비슷한 친구 분들과\n이야기를 나눠봐요'}</Descrypt>
          </Title_Container>
          <Pressable style={styles.change} onPress={handleNextChoiceInfo}>
            <Icons name="chevron-right" size={24} color="black" />
          </Pressable>
        </Header_Title_Container>
        <Send_Letter_Count_Container>
          <Text style={styles.percentTitle}>오늘 내가 보낸 답장</Text>
          <Letter_Percent_root_Container>
            <Letter_Percent_Container>
              <Text style={styles.currentCount}>
                {`${sendCount === false ? '0' : sendCount} / `}
                <Text style={styles.goalCount}>10 letter</Text>
              </Text>
              <Text style={styles.goalCount}>10%</Text>
            </Letter_Percent_Container>
          </Letter_Percent_root_Container>
          <Percent_Bar>
            <Percent_Bar_In percent={sendCount * 10} />
          </Percent_Bar>
        </Send_Letter_Count_Container>
      </Header_Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={letterInfo}
        contentContainerStyle={{
          width: screenWidth,
        }}
        decelerationRate="normal"
        keyExtractor={item => item.id}
        renderItem={renderItem}
        snapToAlignment="start"
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: ${Platform.OS === 'ios' ? 100 : 100}%;

  justify-content: center;
  align-items: center;
`;

const Header_Container = styled(View)`
  margin-bottom: 16px;
  width: ${props => props.width}px;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header_Title_Container = styled(View)`
  padding: 0 0 0 16px;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title_Container = styled(View)`
  background-color: transparent;

  flex-direction: column;

  align-items: flex-start;
`;

const Title = styled(Text)`
  /* font-family: 'Cafe24Simplehae'; */
  font-size: 32px;
  font-weight: bold;

  color: #6b7c96;
`;

const Descrypt = styled(Text)`
  /* font-family: 'Cafe24Simplehae'; */
  margin-top: 16px;
  font-size: 12px;
`;

const Send_Letter_Count_Container = styled(View)`
  margin-top: 16px;
  padding: 8px 16px;
  width: 100%;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  background-color: #202c41;
`;

const Letter_Percent_root_Container = styled(View)``;

const Letter_Percent_Container = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// percent_Bar
const Percent_Bar = styled(View)`
  margin-top: 8px;
  margin-bottom: 16px;
  width: 100%;
  height: 16px;

  border-radius: 4px;

  background-color: white;

  overflow: hidden;
`;

const Percent_Bar_In = styled(View)`
  left: -10%;
  width: ${props => props.percent + 10}%;
  height: 100%;

  border-radius: ${props => (props.percent === 100 ? 0 : '8px')};

  background-color: #ccd2f0;
`;

const styles = StyleSheet.create({
  percentTitle: {
    marginBottom: 16,
    fontSize: 12,
    color: 'white',
  },
  currentCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  goalCount: {
    fontSize: 12,
    color: 'white',
  },
  change: {
    width: 36,
    height: 36,
    // position: 'absolute',
    // backgroundColor: 'white'
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Letter_List_Carousel;
