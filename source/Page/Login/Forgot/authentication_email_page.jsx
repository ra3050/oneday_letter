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
} from 'react-native';
import { useLayoutEffect } from 'react';
import Icon from 'react-native-vector-icons/Octicons';

const window_height = Dimensions.get('window').height;

const Authentication_email_page = props => {
  const { navigation, route } = props;

  // 네비게이션 옵션 정의
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
      title: '이메일 찾기',
      headerBackTitle: '',
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'Cafe24Simplehae' },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Tab_Screen')}>
          <Icon name="check" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <Wrapper height={window_height}>
      <Input_Box>
        <Input_Title>인증 코드 입력</Input_Title>
        <Input_User_Info
          secureTextEntry={true}
          clearButtonMode="unless-editing"
          clearTextOnFocus={true}
        />
      </Input_Box>
      {/* 인증카운트 추가 필요 */}
    </Wrapper>
  );
};

const Wrapper = styled(SafeAreaView)`
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

const Input_Title = styled(Text)`
  margin-top: ${(82 / 3120) * 100}%;
  height: 16px;
  width: 100%;
  margin-bottom: 8px;

  font-family: 'Cafe24Simplehae';
  font-size: 14px;

  position: relative;
`;

const styles = StyleSheet.create({
  right_Button: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default Authentication_email_page;
