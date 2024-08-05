import { useLayoutEffect, useState, useRef } from 'react';
import {
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { styled } from 'styled-components';
import { useHeaderHeight } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-easy-toast';
import { req_receiveLetter } from '../../../utils/requestApi';
import { get_usreIdx } from '../../../Controller/Storage';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Letter_Receive_Page = props => {
  const { navigation, route } = props;
  const letterInfo = route.params;
  const [letterText, setLetterText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const headerHeight = useHeaderHeight();

  //Toast전용 Ref
  const toastRef = useRef();
  console.log(letterInfo);

  // 체크버튼 컨트롤
  const handleCheckButton = () => {
    if (letterText.length < 10) {
      toastRef.current.show('10글자 이상 글을 작성해주세요');
    } else {
      get_usreIdx(mb_idx => {
        const receive_letterInfo = {
          mb_idx: mb_idx,
          receiver_mb_idx: letterInfo.mb_idx
            ? letterInfo.mb_idx
            : letterInfo.sender_mb_idx,
          receiver_mb_nick: letterInfo.mb_nick,
          root_lt_idx: letterInfo.lt_idx
            ? letterInfo.lt_idx
            : letterInfo.root_lt_idx,
          content: letterText,
        };

        console.log(receive_letterInfo);

        req_receiveLetter(receive_letterInfo, data => {
          if (!data.result) {
            toastRef.current.show(data.errMessage);
          } else {
            navigation.goBack();
          }
        });
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
      title: '편지 보내기',
      headerBackTitle: '',
      headerTitleAlign: 'center',
      headerShadowVisible: true,
      headerTitleStyle: {
        fontFamily: 'Cafe24Simplehae',
        fontSize: 22,
        color: 'black',
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => handleCheckButton()}>
          <Icon name="check" size={24} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="chevron-back" size={24} />
        </TouchableOpacity>
      ),
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
      title: '편지 보내기',
      headerBackTitle: '',
      headerTitleAlign: 'center',
      headerShadowVisible: true,
      headerTitleStyle: {
        fontFamily: 'Cafe24Simplehae',
        fontSize: 22,
        color: 'black',
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => handleCheckButton()}>
          <Icon name="check" size={24} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="chevron-back" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [letterText]);

  useFocusEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
        console.log(screenHeight, e.endCoordinates.height, headerHeight);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    // Clean up event listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });

  return (
    <Wrapper height={screenHeight - keyboardHeight - headerHeight}>
      <Pressable onPress={Keyboard.dismiss} accessible={false}>
        <Text_Input
          editable
          multiline
          scrollEnabled={false}
          numberOfLines={50}
          maxLength={500}
          onChangeText={text => setLetterText(text)}
          value={letterText}
          textAlignVertical="top"
          placeholder="답장은 내용을 수정할 수 없으니 마음을 담아 편지를 작성해 주세요."
          placeholderTextColor="gray"
        />
      </Pressable>

      <Toast
        ref={toastRef}
        positionValue={
          keyboardHeight
            ? screenHeight - keyboardHeight - headerHeight + 100
            : screenHeight * 0.35
        }
        fadeInDuration={200}
        fadeOutDuration={1000}
        style={{ backgroundColor: '#537BCC' }}
      />
    </Wrapper>
  );
};

const Wrapper = styled(ScrollView)`
  width: ${screenWidth}px;
  max-height: ${props => props.height}px;

  background-color: white;
`;

const Text_Input = styled(TextInput)`
  padding: 0 8px;
  flex: 1;
  min-height: 500px;

  position: relative;
`;

export default Letter_Receive_Page;
