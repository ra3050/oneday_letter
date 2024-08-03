import { styled } from "styled-components"; 
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, PanResponder, Keyboard, Dimensions} from "react-native";
import { useLayoutEffect, useState, useRef } from "react";
import Icon from "react-native-vector-icons/Octicons";
import Toast from "react-native-easy-toast";
import { useFocusEffect } from "@react-navigation/native";
import { req_FindPasswordAuthCheck } from "../../../utils/requestApi";
import { useHeaderHeight } from "@react-navigation/elements"

const window_height = Dimensions.get('window').height;

const Authentication_password_page = (props) => {
    const {navigation, route} = props;
    const oldInfo = route.params;
    const [code, setCode] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState();
    const toastRef = useRef();
    const headerHeight = useHeaderHeight();

    // 인증번호 유효성 검사
    const handleCheckButton = () => {
        const info = { email: oldInfo.email, auth_code: code }

        req_FindPasswordAuthCheck(info, data => {
            if (data?.result) {
                navigation.navigate('Login_Change_Password', { email: info.email })
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
                <Input_Title>인증 코드 입력</Input_Title>
                <Input_User_Info 
                    secureTextEntry={true} 
                    clearButtonMode="unless-editing" 
                    clearTextOnFocus={true}
                    onChangeText={text => { setCode(text) }}
                    value={code}
                />
            </Input_Box>
            <Toast ref={toastRef}
                positionValue={keyboardHeight ? window_height - keyboardHeight + headerHeight + 100 : window_height * 0.35}
                fadeInDuration={200}
                fadeOutDuration={1000}
                style={{backgroundColor:'#537BCC'}}
            />
            {/* 인증카운트 추가 필요 */}
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
    select_button_style: {
        flex: 1,
        height: `100%`,
        marginRight: 0,
        marginLeft: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        position: 'relative'
    },
    select_button_title_style: {
        fontFamily: 'Cafe24Simplehae',
        fontSize: 14
    },
    select_row_text_style: {
        fontFamily: 'Cafe24Simplehae',
        fontSize: 14
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
        position: 'relative'
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
        position: 'relative'
    },
})

export default Authentication_password_page;