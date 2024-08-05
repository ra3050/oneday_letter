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
import SelectDropdown from 'react-native-select-dropdown';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Octicons';
import Toast from 'react-native-easy-toast';
import { req_duplicate, req_signup } from '../../utils/requestApi';
import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';

// 키보드를 컨트롤하기 위한 변수
// 1: nick, 2: email, 3: password, 4: passwordCheck, 5: phone
var FOCUS_INPUT_VALUE = 0;
const window_height = Dimensions.get('window').height;

const Email_sign_Page = props => {
  const { navigation, route } = props;

  const [wrapperTop, setWrapperTop] = useState(); //키보드가 올라올때 wrapper.top 값을 알맞게 변경해줍니다
  const [privateAgree, setPrivateAgree] = useState(false); //개인정보 처리방침 동의
  const [serviceAgree, setServiceAgree] = useState(false); //서비스 이용약관 동의
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState(''); //패스워드 검사
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
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
        const info = {
          nick: nick,
          email: email,
          phone1: phone1,
          phone2: phone2,
          phone3: phone3,
          password: password,
          repassword: repassword,
        };
        req_duplicate(info, data => {
          if (!data?.result) {
            // false
            showCopyToast(data?.errMessage);
          } else {
            // true
            req_signup(info, reqdata => {
              if (!reqdata?.result) {
                showCopyToast(reqdata?.errMessage);
              } else {
                const mb_idx = reqdata?.mb_idx;
                set_userIdx(mb_idx);
                navigation.navigate('Login_Interest_Choice', {
                  signup: true,
                  mb_idx: reqdata?.mb_idx,
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

  // 사용자 터치 화면제어
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        //터치 시작시 gestureState로 터치한 위치 값을 입력 할 수 있음
        console.log(event.nativeEvent.locationX);
      },
      onPanResponderRelease: () => {
        // 터치 종료 시 처리할 로직
      },
    }),
  ).current;

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
  const checkEmail = input => {
    // 이메일 주소 형식을 검사하는 정규식
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(input)) {
      showCopyToast('이메일 형식으로 입력해주세요.');
      setError('email');
    } else {
      setError('');
    }
  };
  const checkpassword = password => {
    // 비밀번호 길이가 8자 이상인지 확인
    if (password.length < 8) {
      return false;
    }

    // 대문자, 소문자, 숫자, 특수문자를 포함하는지 확인
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/.test(password);

    if (!hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      showCopyToast(
        '비밀번호는 8자리 이상, 대문자, 소문자, 숫자, 특주문자를 포함해야합니다.',
      );
      setError('password');
    } else {
      setError('');
    }
  };
  const checkNumber = input => {
    // 정확히 4개의 숫자로만 구성되어 있는지 검사하는 정규식
    const fourDigitsRegex = /^[0-9]{4}$/;
    if (!fourDigitsRegex.test(input)) {
      showCopyToast('휴대폰 번호를 정확히 입력해주세요.');
      setError('phone');
    } else {
      setError('');
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
            <Input_Title>이메일 주소</Input_Title>
            <Input_User_Info
              ref={inputLayerRef[1]}
              clearButtonMode="unless-editing"
              clearTextOnFocus={true}
              keyboardType="default"
              onFocus={() => (FOCUS_INPUT_VALUE = 1)}
              value={email}
              onChangeText={text => setEmail(text)}
              onEndEditing={() => checkEmail(email)}
            />
            <Input_Title>비밀번호</Input_Title>
            <Input_User_Info
              ref={inputLayerRef[2]}
              secureTextEntry={true}
              clearButtonMode="unless-editing"
              clearTextOnFocus={true}
              onFocus={() => (FOCUS_INPUT_VALUE = 2)}
              value={password}
              onChangeText={text => setPassword(text)}
              onEndEditing={() => checkpassword(password)}
            />
            <Input_Title>비밀번호 확인</Input_Title>
            <Input_User_Info
              ref={inputLayerRef[3]}
              secureTextEntry={true}
              clearButtonMode="unless-editing"
              clearTextOnFocus={true}
              onFocus={() => (FOCUS_INPUT_VALUE = 3)}
              value={repassword}
              onChangeText={text => setRepassword(text)}
            />
            <Input_Title>휴대폰 번호</Input_Title>
            <Input_Phone_Number_Box>
              <SelectDropdown
                data={arr_phone_first}
                buttonStyle={styles.select_button_style}
                buttonTextStyle={styles.select_button_title_style}
                defaultValueByIndex={0}
                rowTextStyle={styles.select_row_text_style}
                onSelect={(item, _) => {
                  setPhone1(item);
                }}
              />
              <TextInput
                clearButtonMode="unless-editing"
                clearTextOnFocus={true}
                maxLength={4}
                style={styles.input_secont_phone_number}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                onFocus={() => (FOCUS_INPUT_VALUE = 4)}
                value={phone2}
                onChangeText={text => setPhone2(text)}
                ref={inputLayerRef[4]}
              />
              <TextInput
                clearButtonMode="unless-editing"
                clearTextOnFocus={true}
                maxLength={4}
                style={styles.input_Third_phone_number}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                onFocus={() => (FOCUS_INPUT_VALUE = 4)}
                value={phone3}
                onChangeText={text => setPhone3(text)}
                ref={inputLayerRef[5]}
              />
            </Input_Phone_Number_Box>
            <Check_User_Agree_info>
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

const arr_phone_first = ['010', '011', '016', '017', '019'];

export default Email_sign_Page;
