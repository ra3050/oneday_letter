import { styled } from 'styled-components';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  PanResponder,
  Keyboard,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Octicons';
import Toast from 'react-native-easy-toast';
import {
  req_duplicate,
  req_signup,
  req_socialNickCheck,
} from '../../utils/requestApi';
import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { set_userIdx } from '../../Controller/Storage';

// 키보드를 컨트롤하기 위한 변수
// 1: nick, 2: email, 3: password, 4: passwordCheck, 5: phone
var FOCUS_INPUT_VALUE = 0;
const window_height = Dimensions.get('window').height;

const Social_Sign_Page = props => {
  const { navigation, route } = props;
  const socialInfo = route.params;

  const [wrapperTop, setWrapperTop] = useState(); //키보드가 올라올때 wrapper.top 값을 알맞게 변경해줍니다
  const [privateAgree, setPrivateAgree] = useState(false); //개인정보 처리방침 동의
  const [serviceAgree, setServiceAgree] = useState(false); //서비스 이용약관 동의
  const [nick, setNick] = useState('');
  const [errorCode, setError] = useState('all');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const headerHeight = useHeaderHeight();

  const wrapperRef = useRef(null);
  const inputLayerRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  //handler toast
  const toastRef = useRef();
  const showCopyToast = useCallback(message => {
    toastRef.current.show(message);
  }, []);

  // 네비게이션 옵션 정의
  useLayoutEffect(() => {
    // 닉네임 정보만 담아서 관심사 설정페이지로 이동
    const sign = () => {
      if (!errorCode) {
        if (!privateAgree) {
          showCopyToast('개인정보 취급방침에 동의해주세요');
          return;
        }
        if (!serviceAgree) {
          showCopyToast('서비스 이용약관에 동의해주세요');
          return;
        }
        const info = { nick: nick }; //
        req_socialNickCheck(info, data => {
          if (!data?.result) {
            // false
            showCopyToast(data?.errMessage);
          } else {
            const newSocialInfo = {
              nick: nick,
              socialType: socialInfo.reg_type,
              reg_code: socialInfo.reg_code,
            };
            // true
            req_signup(newSocialInfo, reqdata => {
              if (!reqdata?.result) {
                showCopyToast(reqdata?.errMessage);
              } else {
                const mb_idx = reqdata?.mb_idx;
                set_userIdx(mb_idx);
                navigation.navigate('Login_Interest_Choice', {
                  signup: true,
                  mb_idx: mb_idx,
                });
              }
            });
          }
        });
      } else {
        showCopyToast('입력하신 내용을 다시 확인해주세요.');
      }
    };

    navigation.setOptions({
      headerBackTitleVisible: true,
      title: '회원가입',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'Cafe24Simplehae' },
      headerRight: () => (
        <TouchableOpacity onPress={() => sign()}>
          <Icon name="check" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  useFocusEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        inputLayerRef[FOCUS_INPUT_VALUE].current.measure(
          (x, y, width, height, pageX, pageY) => {
            const upTop = pageY - e.endCoordinates.screenY + 16;
            console.log(upTop);

            if (pageY > e.endCoordinates.screenY) {
              setWrapperTop(-upTop);
            }

            setKeyboardHeight(e.endCoordinates.screenY);
          },
        );
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setWrapperTop(0);
        setKeyboardHeight(0);
      },
    );

    // Clean up event listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });

  const checkNick = input => {
    // 1~15자리 범위 내의 문자열인지 확인
    if (input.length >= 1 && input.length <= 15) {
      // 문자열이 올바른 형식을 갖추고 있는지 확인
      const regex = /^[_a-zA-Z0-9가-힣]*$/; // 알파벳, 숫자, '_', 한글만 허용

      if (!regex.test(input)) {
        showCopyToast('닉네임은 1~15자리, 특수문자는 _만 사용가능합니다');
        setError('nick');
      } else {
        setError('');
      }
    } else {
      showCopyToast('닉네임은 1~15자리, 특수문자는 _만 사용가능합니다');
      setError('nick');
    }
  };

  return (
    <Wrapper ref={wrapperRef} wrapperTop={wrapperTop} height={window_height}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Pressable
          style={{ width: '100%', height: window_height }}
          onPress={Keyboard.dismiss}
          accessible={false}>
          <Input_Box>
            <Input_Title>닉네임</Input_Title>
            <Input_User_Info
              ref={inputLayerRef[0]}
              clearButtonMode="unless-editing"
              clearTextOnFocus={true}
              onFocus={() => (FOCUS_INPUT_VALUE = 0)}
              value={nick}
              onChangeText={text => setNick(text)}
              onEndEditing={() => checkNick(nick)}
            />
            <Check_User_Agree_info marginTop={16}>
              <CheckBox
                boxType="square"
                style={styles.checkBox_style}
                value={privateAgree}
                tintColors={{ true: '#007aff' }}
                onValueChange={() => setPrivateAgree(!privateAgree)}
              />
              <TouchableOpacity style={styles.agree_button}>
                <Check_User_Agree_info_title>
                  [필수] 개인정보 취급방침 동의
                </Check_User_Agree_info_title>
              </TouchableOpacity>
            </Check_User_Agree_info>
            <Check_User_Agree_info>
              <CheckBox
                boxType="square"
                style={styles.checkBox_style}
                value={serviceAgree}
                tintColors={{ true: '#007aff' }}
                onValueChange={() => setServiceAgree(!serviceAgree)}
              />
              <TouchableOpacity style={styles.agree_button}>
                <Check_User_Agree_info_title>
                  [필수] 이용약관 동의
                </Check_User_Agree_info_title>
              </TouchableOpacity>
            </Check_User_Agree_info>
          </Input_Box>

          <Toast
            ref={toastRef}
            positionValue={
              keyboardHeight
                ? window_height - keyboardHeight + headerHeight + 100
                : window_height * 0.35
            }
            fadeInDuration={200}
            fadeOutDuration={1000}
            style={{ backgroundColor: '#537BCC' }}
          />
        </Pressable>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)`
  top: ${props => props.wrapperTop}px;
  width: 100%;
  height: ${props => props.height}px;

  position: absolute;
  background-color: white;
`;

const Input_Box = styled(View)`
  top: ${(82 / 3120) * 100}%;
  left: 16px;
  right: 16px;
  width: 100% - 32px;
  height: 100%;
  align-self: center;

  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input_Title = styled(Text)`
  margin-top: ${(82 / 3120) * 100}%;
  height: 16px;
  width: 100%;
  margin-bottom: 8px;

  font-family: 'Cafe24Simplehae';
  font-size: 14px;

  position: relative;
`;

const Input_User_Info = styled(TextInput)`
  width: 100%;
  height: ${(180 / 3120) * 100}%;
  border-radius: 4px;
  border: 1px solid gray;

  padding-left: 8px;
  font-family: 'Cafe24Simplehae';
  font-size: 14px;
  position: relative;
`;

const Input_Phone_Number_Box = styled(View)`
  width: 100%;
  height: ${(180 / 3120) * 100}%;
  margin-bottom: 16px;
  position: relative;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Check_User_Agree_info = styled(View)`
  width: 100%;
  height: 24px;
  margin-bottom: 8px;

  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Check_User_Agree_info_title = styled(Text)`
  font-family: 'Cafe24Simplehae';
  font-size: 14px;
  position: relative;
`;

const styles = StyleSheet.create({
  right_Button: {
    width: 36,
    height: 36,
  },
  select_button_style: {
    flex: 1,
    height: `100%`,
    marginRight: 0,
    marginLeft: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    position: 'relative',
  },
  select_button_title_style: {
    fontFamily: 'Cafe24Simplehae',
    fontSize: 14,
  },
  select_row_text_style: {
    fontFamily: 'Cafe24Simplehae',
    fontSize: 14,
  },
  input_secont_phone_number: {
    flex: 1,
    height: `100%`,
    marginRight: 8,
    marginLeft: 8,
    paddingLeft: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    position: 'relative',
  },
  input_Third_phone_number: {
    flex: 1,
    height: `100%`,
    marginRight: 0,
    marginLeft: 8,
    paddingLeft: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    position: 'relative',
  },
  checkBox_style: {
    height: 16,
    width: 16,
  },
  agree_button: {
    marginLeft: 16,
  },
});

export default Social_Sign_Page;
