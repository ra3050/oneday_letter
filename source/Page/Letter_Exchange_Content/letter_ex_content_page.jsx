import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { styled } from 'styled-components';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import ic_receive_bg from '../../../resource/Letter/ic-receive-bg.png';
import Letter_Operate_Button from './letter_ex_operate_button';
import Toast from 'react-native-easy-toast';
import {
  req_boastLetter,
  req_removeExletter,
  req_reportExLetter,
} from '../../utils/requestApi';
import { get_usreIdx } from '../../Controller/Storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Letter_Exchange_Content_page = props => {
  const { navigation, route } = props;
  const data = route.params;
  const letterInfo = data?.letterInfo;
  const sendValue = data?.sendValue; // 내가 보낸 편지인지 아닌지, 추후 내부데이터에 저장된 mb_idx와 비교하여 Operater_Button에 전달해줍니다 value: 1, 2, 3
  const collect = data?.collect; //자랑하는 편지인지 확인
  const [collected, setCollected] = useState(false); // 옵션 선택 확인

  const headerHeight = useHeaderHeight();
  const operateHeight = 100;
  const textInputHeight =
    screenHeight -
    (headerHeight + 24 + (operateHeight + 32) + 16) -
    (sendValue === 3 ? 0 : 58); // Letter_Input의 height

  const [ImageValue, setImageValue] = useState(0); // template Image number

  const toastRef = useRef();
  const showCopyToast = useCallback(message => {
    toastRef.current.show(message);
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true, //비필수, 성능향상을 위해 사용
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }, [collected]);

  useLayoutEffect(() => {
    const currentDate = getCurrentDate();
    navigation.setOptions({
      headerBackTitleVisible: true,
      title: currentDate,
      headerBackTitle: '',
      headerTitleAlign: 'center',
      headerShadowVisible: false,
      headerTransparent: true,
      headerHeight: 50,
      headerTitleStyle: {
        fontFamily: 'Cafe24Simplehae',
        fontSize: 22,
        color: 'white',
      },
      headerRight: () => (
        <>
          <TouchableOpacity onPress={() => setCollected(!collected)}>
            <Icon2 name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  });

  const handleReport = () => {
    Alert.alert(
      '신고하기',
      '광고, 욕설, 비적합, 음란물, 불쾌한 표현 등 부적합한 답장일 경우 신고가 가능합니다. 정말로 신고하시겠어요?',
      [
        {
          text: '신고',
          onPress: () => {
            get_usreIdx(mb_idx => {
              const info = { mb_idx: mb_idx, ex_lt_idx: letterInfo.ex_lt_idx };
              req_reportExLetter(info, data => {
                if (data.result) {
                  showCopyToast('정상적으로 신고되었습니다');
                }
              });
            });
          },
          style: 'cancel',
        },
        {
          text: '취소',
        },
      ],
    );
  };

  const handleRemove = () => {
    Alert.alert('삭제하기', '정말로 답장을 삭제하시겠어요?', [
      {
        text: '삭제',
        onPress: () => {
          get_usreIdx(mb_idx => {
            const info = { mb_idx: mb_idx, ex_lt_idx: letterInfo.ex_lt_idx };
            req_removeExletter(info, data => {
              if (data.result) {
                Alert.alert('정상적으로 삭제되었습니다', '', [
                  {
                    text: '확인',
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]);
              }
            });
          });
        },
      },
      {
        text: '취소',
      },
    ]);
  };

  const handleBoast = () => {
    //wkfkdgkrl
    Alert.alert(
      '자랑하기',
      '내가 받은 답장을 다른 사람들이 볼 수 있도록 공유합니다.',
      [
        {
          text: '자랑하기',
          onPress: () => {
            get_usreIdx(mb_idx => {
              const info = {
                mb_idx: mb_idx,
                ex_lt_idx: letterInfo.ex_lt_idx,
                content: letterInfo.content,
              };
              req_boastLetter(info, data => {
                if (data.result) {
                  Alert.alert('정상적으로 업로드 되었습니다.', '', [
                    {
                      text: '확인',
                    },
                  ]);
                } else {
                  Alert.alert('업로드 실패', data.errMessage, [
                    {
                      text: '확인',
                    },
                  ]);
                }
              });
            });
          },
        },
        {
          text: '취소',
        },
      ],
    );
  };

  return (
    <>
      <BgImage source={ic_receive_bg} height={screenHeight} />
      <Wrapper
        headerHeight={headerHeight}
        width={screenWidth}
        height={screenHeight - headerHeight}>
        {!(sendValue === 3) && !collect && (
          <Sub_Container>
            <Send_User_Nick>{`'${letterInfo.mb_nick}'님의 편지`}</Send_User_Nick>
          </Sub_Container>
        )}

        <Letter_Input
          multiline
          scrollEnabled={false}
          value={letterInfo.content}
          textAlignVertical="top"
          editable={false}
          minHeight={textInputHeight}
        />
        {
          !collect && (
            <Letter_Operate_Button
              style={{
                width: screenWidth - 16,
                height: operateHeight,
                marginHorizontal: 8,
                marginVertical: 16,
              }}
              sendValue={sendValue}
              letterInfo={letterInfo}
            />
          ) // letterInfo를 만들어야해
        }

        <Toast
          ref={toastRef}
          positionValue={screenHeight * 0.35}
          fadeInDuration={200}
          fadeOutDuration={1000}
          style={{ backgroundColor: '#537BCC' }}
        />
      </Wrapper>
      {collected && (
        <Ellipsis_Container
          headerHeight={headerHeight}
          style={{ opacity: fadeOpacity }}>
          {!(sendValue === 3) && ( // 내가 보낸편지일 경우 노출되지 않음
            <>
              <Ellipsis_Button>
                <Ellipsis_Text onPress={() => handleBoast()}>
                  자랑하기
                </Ellipsis_Text>
              </Ellipsis_Button>
              <Ellipsis_Button onPress={() => handleReport()}>
                <Ellipsis_Text>신고하기</Ellipsis_Text>
              </Ellipsis_Button>
            </>
          )}
          <Ellipsis_Button onPress={() => handleRemove()}>
            <Ellipsis_Text>삭제하기</Ellipsis_Text>
          </Ellipsis_Button>
        </Ellipsis_Container>
      )}
    </>
  );
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const Wrapper = styled(ScrollView)`
  margin-top: ${props => props.headerHeight}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: transparent;

  flex-direction: column;

  position: relative;
`;

const BgImage = styled(Animated.Image)`
  width: 100%;
  height: ${props => props.height}px;

  object-fit: cover;
  position: absolute;
`;

const Sub_Container = styled(View)`
  width: ${screenWidth - 32}px;
  height: 50px;
  margin: 4px 16px;
  padding: 0;

  border-bottom-width: 1;
  border-bottom-color: #e2e2e2;

  border-top-width: 1;
  border-top-color: #e2e2e2;

  justify-content: center;
  align-items: center;
`;

const Send_User_Nick = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-weight: bold;

  color: white;
`;

const Letter_Input = styled(TextInput)`
  width: ${screenWidth - 16}px;
  min-height: ${props => props.minHeight}px;
  margin-left: 8px;
  margin-top: 16px;
  margin-right: 8px;

  color: white;
`;

const Ellipsis_Container = styled(Animated.View)`
  margin-top: ${props => props.headerHeight}px;
  position: absolute;
  align-self: flex-end;

  border-radius: 8px;
  ${Platform.OS === 'ios'
    ? `shadow-color: gray;
        shadow-offset: 0px 2px;
        shadow-opacity: 1;
        shadow-radius: 4px;`
    : `elevation: 7;`}

  background-color: white;
`;

const Ellipsis_Button = styled(TouchableOpacity)`
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const Ellipsis_Text = styled(Text)`
  font-size: 14px;
  text-align: center;

  color: black;
`;

export default Letter_Exchange_Content_page;
