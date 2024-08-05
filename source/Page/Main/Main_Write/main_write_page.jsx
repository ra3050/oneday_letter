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
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import Font_Picker_View from './font_picker_view';
import { upload_storage } from '../../../utils/StorageAPI';
import { get_usreIdx } from '../../../Controller/Storage';
import { req_postLetter } from '../../../utils/requestApi';
import Toast from 'react-native-easy-toast';
import { useFocusEffect } from '@react-navigation/native';

export const tempPathList = [
  '../../../../resource/Letter/bg-diary-1-thumbnail.png',
  '../../../../resource/Letter/bg-diary-2-thumbnail.png',
  '../../../../resource/Letter/bg-diary-3-thumbnail.png',
  '../../../../resource/Letter/bg-diary-4-thumbnail.png',
  '../../../../resource/Letter/bg-diary-5-thumbnail.png',
  '../../../../resource/Letter/bg-diary-6-thumbnail.png',
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Main_Write_Page = props => {
  const { navigation, route } = props;
  const [tag, setTag] = useState('');
  const [letterText, setLetterText] = useState('');
  const headerHeight = useHeaderHeight();
  const [tagArr, setTagArr] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardP, setKeyboardP] = useState(0);

  const [ImageValue, setImageValue] = useState(1); // template Image Count
  const [tempSize, setTempSize] = useState(0); // 배경 템플릿 고르기 - height
  const [userImgHeight, setUserImgHeight] = useState(50); // 이미지 선택하기 - height
  const [userImgPath, setUserImgPath] = useState({ assets: [] }); // 이미지 선택하기 - path 정보 저장
  const [font, setFont] = useState({
    hidden: false,
    font: 'default',
  });

  //애니메이션
  const fadeAnim = useRef(new Animated.Value(0)).current;

  //Toast전용 Ref
  const toastRef = useRef();

  const fadeOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // 체크버튼 컨트롤
  const handleCheckButton = () => {
    if (letterText.length < 20) {
      toastRef.current.show('20글자 이상 글을 작성해주세요');
    } else {
      get_usreIdx(mb_idx => {
        const info = {
          mb_idx: mb_idx,
          keywords: tag,
          content: letterText,
          bg_idx: ImageValue,
        };
        req_postLetter(info, data => {
          if (!data.result) {
            toastRef.current.show(data.errMessage);
          } else {
            const info = { lt_idx: data.lt_idx, pathArr: userImgPath };
            upload_storage(info); //이미지 업로드

            navigation.reset({
              index: 0,
              routes: [{ name: 'Tab_Screen' }],
            });
          }
        });
      });
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true, //비필수, 성능향상을 위해 사용
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true, //비필수, 성능향상을 위해 사용
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
        <TouchableOpacity onPress={() => handleCheckButton()}>
          <Icon name="check" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tab_Screen' }],
            })
          }>
          <Icon2 name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

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
        <TouchableOpacity onPress={() => handleCheckButton()}>
          <Icon name="check" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tab_Screen' }],
            })
          }>
          <Icon2 name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [letterText, tag, userImgPath]);

  useFocusEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        console.log('test');
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardP(e.endCoordinates.screenY);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setKeyboardP(0);
      },
    );

    // Clean up event listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });

  const handleKeyPress = e => {
    if (e.nativeEvent.key === 'Enter') {
      make_TagBox();

      console.log('엔터 키를 눌렀습니다.');
    } else if (e.nativeEvent.key === ' ') {
      make_TagBox();

      console.log('스페이스(공백) 키를 눌렀습니다.');
    }
  };

  const handleImageChoice = () => {
    if (userImgPath.length >= 3) {
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 3,
        quality: 0.5,
        includeBase64: Platform.OS === 'android',
      },
      imageValue => {
        if (imageValue.didCancel) {
          console.log('사용자, 이지 선택 취소');
          return;
        }

        if (imageValue.errorCode) {
          console.log('이미지 선택시 에러발생, 내용 : ', imageValue.errorCode);
          return;
        }

        console.log(imageValue);
        setUserImgPath(imageValue);
      },
    );
  };

  const make_TagBox = () => {
    const tagcomp = tag;
    setTagArr([...tagArr, tagcomp]);
    setTag(''); // 공백 문자열로 임시로 설정
  };

  return (
    <>
      <BgImage
        source={getTemplateImage(ImageValue)}
        style={{ opacity: fadeAnim }}
        height={screenHeight}
      />
      <Wrapper
        headerHeight={headerHeight}
        width={screenWidth}
        height={screenHeight - headerHeight - keyboardHeight}>
        <KeyboardAvoidingView>
          <Sub_Container>
            {tagArr.map((item, index) => (
              <Tag_Box key={index}>
                <Tag_Text>{`#${item}`}</Tag_Text>
                <TouchableOpacity
                  onPress={() => {
                    const newTagArr = tagArr
                      .slice(0, index)
                      .concat(tagArr.slice(index + 1));
                    setTagArr(newTagArr);
                  }}>
                  <Icon3 name="cancel" size={14} color="#5D82CF" />
                </TouchableOpacity>
              </Tag_Box>
            ))}
            <Tag_Input
              placeholder="#메인 키워드"
              placeholderTextColor="white"
              onChangeText={value => setTag(value)}
              onKeyPress={handleKeyPress}
              value={tag}
              textAlignVertical="center"
            />
          </Sub_Container>
          <Template_Container>
            <Template_Button_Container>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  if (tempSize) {
                    setTempSize(0);
                  } else {
                    setTempSize(50);
                  }
                }}>
                <Icon2 name="image" color="#5D82CF" size={20} />
                <Template_Title>배경 템플릿 고르기</Template_Title>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 16, flexDirection: 'row' }}
                onPress={handleImageChoice}>
                <Icon3 name="add-a-photo" color="#5D82CF" size={16} />
                <Template_Title>이미지 업로드</Template_Title>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{marginLeft: 16, flexDirection: 'row'}} onPress={() => setFont({
                                hidden: !font.hidden,
                                font: font.font
                            })}>
                                <Icon3 name="font-download" color="#5D82CF" size={16}/>
                                <Template_Title>폰트</Template_Title>
                            </TouchableOpacity> */}
            </Template_Button_Container>

            <Template_Choice_Container>
              {tempPathList.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setImageValue(index + 1)}>
                  <Template_Image
                    size={tempSize}
                    source={getTemplateImage(index + 1)}
                  />
                </TouchableOpacity>
              ))}
            </Template_Choice_Container>

            <User_Image_Container>
              {userImgPath &&
                userImgPath.assets.map((item, index) => (
                  <TouchableOpacity>
                    <User_Image size={userImgHeight} source={{ uri: item.uri }} />
                  </TouchableOpacity>
                ))}
            </User_Image_Container>
          </Template_Container>
          <Letter_Input
            editable
            multiline
            scrollEnabled={false}
            onChangeText={text => setLetterText(text)}
            value={letterText}
            textAlignVertical="top"
            placeholder="내용을 입력해주세요"
            placeholderTextColor="gray"
          />
        </KeyboardAvoidingView>
      </Wrapper>
      <Toast
        ref={toastRef}
        positionValue={
          keyboardHeight
            ? screenHeight - keyboardP + headerHeight + 50
            : screenHeight * 0.2
        }
        fadeInDuration={200}
        fadeOutDuration={1000}
        style={{ backgroundColor: '#537BCC' }}
      />
      {font.hidden && (
        <Font_Picker_View
          style={{ flex: 0.5, aspectRatio: 9 / 16 }}
          state={font}
          setState={setFont}
        />
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

export const getTemplateImage = index => {
  switch (index) {
    case 1:
      return require('../../../../resource/Letter/bg-diary-1-thumbnail.png');
    case 2:
      return require('../../../../resource/Letter/bg-diary-2-thumbnail.png');
    case 3:
      return require('../../../../resource/Letter/bg-diary-3-thumbnail.png');
    case 4:
      return require('../../../../resource/Letter/bg-diary-4-thumbnail.png');
    case 5:
      return require('../../../../resource/Letter/bg-diary-5-thumbnail.png');
    case 6:
      return require('../../../../resource/Letter/bg-diary-6-thumbnail.png');
    default:
      return require('../../../../resource/Letter/bg-diary-1-thumbnail.png');
  }
};

const Wrapper = styled(ScrollView)`
  margin-top: ${props => props.headerHeight}px;
  width: ${props => props.screenWidth}px;
  max-height: ${props => props.height}px;
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
  border-color: #5d82cf;
  border-width: 1.5px;

  flex-direction: row;
`;

const Tag_Text = styled(Text)`
  font-family: 'Cafe24Simplehae';
  font-size: 14px;

  color: #5d82cf;
`;

const Template_Button_Container = styled(View)`
  flex-direction: row;
`;

const Template_Container = styled(View)`
  padding: 4px;
  margin-left: 8px;
  margin-top: 8px;

  flex-direction: column;
`;

const Template_Title = styled(Text)`
  padding-left: 4px;
  font-family: 'Cafe24Simplehae';
  font-size: 14px;

  color: #5d82cf;
`;

const Template_Choice_Container = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const User_Image_Container = styled(Template_Choice_Container)``;

const Template_Image = styled(Image)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin-top: 4px;
  margin-right: 4px;

  object-fit: contain;
`;

const User_Image = styled(Template_Image)``;

const Letter_Input = styled(TextInput)`
  /* flex: 1; */
  min-height: 50px;
  margin-left: 8px;
  margin-top: 16px;
  margin-right: 8px;

  color: white;
`;

export default Main_Write_Page;
