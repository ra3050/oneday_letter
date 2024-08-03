import { styled } from "styled-components"; 
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, PanResponder, Keyboard, Dimensions} from "react-native";
import { useLayoutEffect, useState, useRef } from "react";
import Icon from "react-native-vector-icons/Octicons";
import Toast from "react-native-easy-toast";
import { useFocusEffect } from "@react-navigation/native";
import { req_ChangePassword } from "../../../utils/requestApi";
import { useHeaderHeight } from "@react-navigation/elements"

const window_height = Dimensions.get('window').height;

const Change_password_page = (props) => {
    const {navigation, route} = props;
    const oldInfo = route.params;
    const [password, setPassword] = useState('')
    const [duplicate, setDuplicate] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState();
    const toastRef = useRef();
    const headerHeight = useHeaderHeight();

    const checkpassword = (password) => {
        // 비밀번호 길이가 8자 이상인지 확인
        if (password.length < 8) {
            return false;
        }

        // 대문자, 소문자, 숫자, 특수문자를 포함하는지 확인
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/.test(password);

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }

    // 인증번호 유효성 검사
    const handleCheckButton = () => {
        if (duplicate !== password) {
            toastRef.current.show('비밀번호가 일치하는지 확인해주세요')
        } else if (!checkpassword) {
            toastRef.current.show('비밀번호는 8자리 이상, 대문자, 소문자, 숫자, 특주문자를 포함해야합니다.')
        } else {
            const info = { email: oldInfo.email, password: password }

            req_ChangePassword(info, data => {
                if (data?.result) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login_Email' }],
                    })
                } else {
                    toastRef.current.show(data?.errMessage);
                }
            }) 
        }
    }

    // 네비게이션 옵션 정의
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: true,
            title: '비밀번호 변경',
            headerBackTitle: '',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae'},
            headerRight: () => (
            <TouchableOpacity onPress={() => handleCheckButton()}>
                <Icon name="check" size={24} color="black"/>
            </TouchableOpacity>)
        })
    })

    useFocusEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                password_input_ref.current.measure((x, y, width ,height, pageX, pageY) => {

                    setKeyboardHeight(e.endCoordinates.screenY)
                })
            }
          );
    
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0)
            }
        );
    
        // Clean up event listeners
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    })

    return (
        <Wrapper height={window_height}>
            <Input_Box>
                <Input_Title>비밀번호</Input_Title>
                <Input_User_Info 
                    secureTextEntry={true} 
                    clearButtonMode="unless-editing" 
                    clearTextOnFocus={true}
                    onChangeText={text => { setPassword(text)}}
                    value={password}
                />
                <Input_Title >비밀번호 확인</Input_Title>
                <Input_User_Info 
                    secureTextEntry={true} 
                    clearButtonMode="unless-editing" 
                    clearTextOnFocus={true}
                    onChangeText={text => { setDuplicate(text)}}
                    value={duplicate}
                />
            </Input_Box>
            <Toast ref={toastRef}
                positionValue={keyboardHeight ? window_height - keyboardHeight + headerHeight + 100 : window_height * 0.35}
                fadeInDuration={200}
                fadeOutDuration={1000}
                style={{backgroundColor:'#537BCC'}}
            />
        </Wrapper>
    )
}

const Wrapper = styled(SafeAreaView)`
    width: 100%;
    height: ${props => props.height}px;

    position: absolute;
    background-color: white;
`

const Input_Box = styled(View)`
    top: ${82/3120 * 100}%;
    left: 16px;
    right: 16px;
    width: 100% - 32px;
    height: 100%;
    align-self: center;

    position: absolute;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const Input_User_Info = styled(TextInput)`
    width: 100%;
    height: ${180/3120 * 100}%;
    border-radius: 4px;
    border: 1px solid gray;

    padding-left: 8px;
    font-family: 'Cafe24Simplehae';
    font-size: 14px;
    position: relative;
`

const Input_Title = styled(Text)`
    margin-top: ${82/3120 * 100}%;
    height: 16px;
    width: 100%;
    margin-bottom: 8px;

    font-family: 'Cafe24Simplehae';
    font-size: 14px;
    
    position: relative;
`

const styles = StyleSheet.create({
    right_Button: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Change_password_page;