import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { styled } from 'styled-components';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import Letter_Operate_Button from './letter_operate_button';
import { get_usreIdx } from '../../Controller/Storage';
import Toast from 'react-native-easy-toast';
import {
  req_like,
  req_likeCheck,
  req_removeLetter,
  req_reportLetter,
} from '../../utils/requestApi';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Letter_Content_Page = props => {
  const { navigation, route } = props;
  const letterInfo = route.params;
  const letterText = letterInfo.content;
  const headerHeight = useHeaderHeight();
  const operateHeight = 100;
  const textInputHeight =
    screenHeight - (headerHeight + 48 + (operateHeight + 32) + 16); // Letter_Input의 height

  const make_TagBox = keywords => {
    if (!keywords) return '';

    if (keywords !== '') {
      const tagcomp = keywords.split(', ');
      return tagcomp;
    }
  };
  const tagArr = make_TagBox(letterInfo.keywords);
  const [ImageValue, setImageValue] = useState(0); // template Image number

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const [heartColor, setHeartColor] = useState(false); // false: 좋아요 X, true: 좋아요 O
  const [collected, setCollected] = useState(false); // 옵션 선택 확인
  const [myLetter, setMyLettter] = useState(false);

  const toastRef = useRef();
  const showCopyToast = useCallback(message => {
    toastRef.current.show(message);
  }, []);

  const handleLike = () => {
    get_usreIdx(mb_idx => {
      const info = { mb_idx: mb_idx, lt_idx: letterInfo.lt_idx };
      req_like(info, data => {
        if (data.result) {
          setHeartColor(!heartColor);
        }
      });
    });
  };

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
  }, [ImageValue]);

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
          <TouchableOpacity
            onPress={() => handleLike()}
            style={{ marginRight: 16 }}>
            {heartColor ? (
              <Icon2 name="heart" size={24} color="#FF6848" />
            ) : (
              <Icon2 name="heart-outline" size={24} color="white" />
            )}
          </TouchableOpacity>
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

  useLayoutEffect(() => {
    // 내 편지인지 확인합니다, 좋아요를 누른 편지인지 확인합니다
    get_usreIdx(mb_idx => {
      if (mb_idx == letterInfo.mb_idx) {
        setMyLettter(true);
      }

      const info = { mb_idx: mb_idx, lt_idx: letterInfo.lt_idx };
      req_likeCheck(info, data => {
        if (data.result) {
          setHeartColor(true);
        }
      });
    });
  }, []);

  const handleReport = () => {
    Alert.alert(
      '신고하기',
      '광고, 욕설, 비적합, 음란물, 불쾌한 표현 등 부적합한 편지일 경우 신고가 가능합니다. 정말로 신고하시겠어요?',
      [
        {
          text: '신고',
          onPress: () => {
            get_usreIdx(mb_idx => {
              const info = { mb_idx: mb_idx, lt_idx: letterInfo.lt_idx };
              req_reportLetter(info, data => {
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
    Alert.alert('삭제하기', '정말로 편지를 삭제하시겠어요?', [
      {
        text: '삭제',
        onPress: () => {
          get_usreIdx(mb_idx => {
            const info = { mb_idx: mb_idx, lt_idx: letterInfo.lt_idx };
            req_removeLetter(info, data => {
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

  return (
    <>
      <BgImage
        source={getTemplateImage(ImageValue)}
        style={{ opacity: fadeOpacity }}
        height={screenHeight}
      />
      <Wrapper
        headerHeight={headerHeight}
        width={screenWidth}
        height={screenHeight - headerHeight}>
        <Sub_Container>
          {tagArr ? (
            tagArr.map((item, index) => (
              <Tag_Box key={index}>
                <Tag_Text>{`#${item}`}</Tag_Text>
              </Tag_Box>
            ))
          ) : (
            <Tag_Input placeholder=" " editable={false} />
          )}
        </Sub_Container>
        <Letter_Input
          multiline
          scrollEnabled={false}
          value={letterText}
          textAlignVertical="top"
          editable={false}
          minHeight={textInputHeight}
        />
        <Letter_Operate_Button
          style={{
            width: screenWidth - 16,
            height: operateHeight,
            marginHorizontal: 8,
            marginVertical: 16,
          }}
          letterInfo={letterInfo}
        />

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
          {myLetter && ( // 내가 보낸편지일 경우 노출되지 않음
            <>
              <Ellipsis_Button onPress={() => handleRemove()}>
                <Ellipsis_Text>삭제하기</Ellipsis_Text>
              </Ellipsis_Button>
            </>
          )}
          <Ellipsis_Button onPress={() => handleReport()}>
            <Ellipsis_Text>신고하기</Ellipsis_Text>
          </Ellipsis_Button>
        </Ellipsis_Container>
      )}

      {/* <SafeAreaView ref={btSafeAreaRef}/> */}
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

const getTemplateImage = index => {
  switch (index) {
    case 1:
      return require('../../../resource/Letter/bg-diary-1-thumbnail.png');
    case 2:
      return require('../../../resource/Letter/bg-diary-2-thumbnail.png');
    case 3:
      return require('../../../resource/Letter/bg-diary-3-thumbnail.png');
    case 4:
      return require('../../../resource/Letter/bg-diary-4-thumbnail.png');
    case 5:
      return require('../../../resource/Letter/bg-diary-5-thumbnail.png');
    case 6:
      return require('../../../resource/Letter/bg-diary-6-thumbnail.png');
    default:
      return require('../../../resource/Letter/bg-diary-1-thumbnail.png');
  }
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
  width: 100%;
  /* min-height: ${(200 / 3120) * 100}%; */
  padding: 0;

  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;

  border-top-width: 1px;
  border-top-color: #e2e2e2;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Tag_Input = styled(TextInput)`
  padding: 4px;
  margin-left: 8px;
  margin-top: 8px;
  min-width: 25%;

  padding-left: 8px;
  font-family: 'Cafe24Simplehae';
  font-size: 14px;

  align-self: center;
  color: white;
`;

const Tag_Box = styled(View)`
  padding: 4px;
  margin-left: 8px;
  margin-top: 8px;

  border-radius: 11px;

  flex-direction: row;
`;

const Tag_Text = styled(Text)`
  font-family: 'Cafe24Simplehae';
  font-size: 14px;

  color: wheat;
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
export default Letter_Content_Page;
