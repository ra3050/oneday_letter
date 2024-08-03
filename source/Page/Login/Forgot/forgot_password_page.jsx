import { styled } from "styled-components"; 
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, PanResponder, Keyboard, Dimensions} from "react-native";
import { useLayoutEffect, useState, useRef } from "react";
import Icon from "react-native-vector-icons/Octicons";
import { req_FindPasswordAuthSend } from "../../../utils/requestApi";
import Toast from "react-native-easy-toast";
import { useFocusEffect } from "@react-navigation/native";

const window_height = Dimensions.get('window').height;

const Forgot_password_page = (props) => {
    const {navigation, route} = props;
    const [email, setEmail] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState();
    const toastRef = useRef();

    // 인증번호 요청
    const handleCheckButton = () => {
        const info = { email: email }
        req_FindPasswordAuthSend(info, data => {
            if (data?.result) {
                navigation.navigate('Login_Authentication_Password', { email: email })
            } else {
                toastRef.current.show(data?.errMessage);
            }
        }) 
    }

    // 네비게이션 옵션 정의
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: true,
            title: '비밀번호 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae'},
            headerRight: () => (
            <TouchableOpacity onPress={() => handleCheckButton()}>
                <Icon name="check" size={24} color="black"/>
            </TouchableOpacity>
            )
        })
    }, [email])

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
                <Input_Title>이메일 주소</Input_Title>
                <Input_User_Info 
                    clearButtonMode="unless-editing" 
                    clearTextOnFocus={true}
                    onChangeText={text => { setEmail(text) }}
                    value={email}
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

export default Forgot_password_page;