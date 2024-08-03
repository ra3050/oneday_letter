import { useEffect, useRef, useState, useCallback } from "react";
import { SafeAreaView, Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, Keyboard, Alert, Pressable } from "react-native";
import { styled } from "styled-components";
import { FloatingLabelInput } from "react-native-floating-label-input";
import logo from "../../../resource/Login/logo-color.png";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import { req_emailLogin } from "../../utils/requestApi";
import { set_userIdx, get_usreIdx } from "../../Controller/Storage";
import { useFocusEffect } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements"

const window_height = Dimensions.get('window').height;

const Login_email_page = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrapperTop, setWrapperTop] = useState(0);
    const [keyboardHeight, setKeyboardHeight] = useState();
    const headerHeight = useHeaderHeight();
    const email_input_ref = useRef();
    const password_input_ref = useRef();
    
    //Toast전용 Ref
    const toastRef = useRef();
    const navigation = useNavigation()

    useFocusEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                password_input_ref.current.measure((x, y, width ,height, pageX, pageY) => {
                    const upTop = (pageY) - e.endCoordinates.screenY + 16;
                    console.log(upTop)
                    
                    if (pageY > e.endCoordinates.screenY) {
                        setWrapperTop(-upTop);   
                    }

                    setKeyboardHeight(e.endCoordinates.screenY)
                })
            }
          );
    
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setWrapperTop(0);
                setKeyboardHeight(0)
            }
        );
    
        // Clean up event listeners
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };

    })

    // handle toast + login request
    const handleLogin = () => {
        const loginInfo = {email: email, password: password};

        if (!email || !password) {
            toastRef.current.show('이메일, 비밀번호를 입력해주세요')
        }

        req_emailLogin(loginInfo, data => {
            if (!data?.result) {
                // console.log(data)
                toastRef.current.show(data?.errMessage);
            } else {
                const mb_idx = data.mb_idx;
                let success = set_userIdx(mb_idx);
                
                if (success) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tab_Screen' }],
                    })
                } else {
                    toastRef.current.show('오류가 발생했습니다 재시작 후 다시 시도해주세요');
                }
            }
        })
    }

    return (
        <Wrapper height={(window_height)} collapsable={false} wrapperTop={wrapperTop} >
            <Pressable style={{width: '100%', height: window_height}} onPress={Keyboard.dismiss} accessible={false}>
                <Wrapper_SafeArea>
                <Logo source={logo}/>
                <Email_Input_Box collapsable={false} ref={email_input_ref}>
                    <FloatingLabelInput collapsable={false}
                    label="이메일"
                    value={email}
                    onChangeText={value => setEmail(value)}
                    animationDuration={150}
                    containerStyles={{
                        borderWidth: 0.5,
                        paddingHorizontal: 10,
                        borderColor: 'gray',
                        borderRadius: 8
                    }}
                    customLabelStyles={{
                        fontSizeFocused: 8
                    }}
                    labelStyles={{
                        fontSize: 11,
                        fontFamily: 'Cafe24Simplehae'
                    }}
                    inputStyles={{
                        color: 'black',
                        fontSize: 11,
                    }}
                    />
                </Email_Input_Box>
                <Password_Input_box collapsable={false} ref={password_input_ref}>
                    <FloatingLabelInput collapsable={false}
                    label="비밀번호"
                    value={password}
                    isPassword
                    onChangeText={value => setPassword(value)}
                    animationDuration={150}
                    containerStyles={{
                        borderWidth: 0.5,
                        paddingHorizontal: 10,
                        paddingBottom: 0,
                        borderColor: 'gray',
                        borderRadius: 8
                    }}
                    customLabelStyles={{
                        fontSizeFocused: 8
                    }}
                    labelStyles={{
                        fontSize: 11,
                        fontFamily: 'Cafe24Simplehae'
                    }}
                    inputStyles={{
                        color: 'black',
                        fontSize: 11,
                    }}
                    />
                </Password_Input_box>
                <Login_Button onPress={() => handleLogin()}>
                    <Text style={styles.Login_Text}>로그인</Text>
                </Login_Button>
                <Auth_Button_Box>
                    <TouchableOpacity onPress={() => navigation.navigate('Login_Email_Sign')}>
                        <Text style={styles.Auth_Text}>회원가입</Text>
                    </TouchableOpacity>
                    <Text style={styles.Auth_Text}>|</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login_Forgot_Eamil')}>
                        <Text style={styles.Auth_Text}>아이디</Text>
                    </TouchableOpacity>
                    <Text style={styles.Auth_Text}>/</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login_Forgot_Password')}>
                        <Text style={styles.Auth_Text}> 비밀번호 찾기</Text>
                    </TouchableOpacity>
                </Auth_Button_Box>
                <Toast ref={toastRef}
                    positionValue={keyboardHeight ? window_height - keyboardHeight + headerHeight + 100 : window_height * 0.35}
                    fadeInDuration={200}
                    fadeOutDuration={1000}
                    style={{backgroundColor:'#537BCC'}}
                />
                </Wrapper_SafeArea>
            </Pressable>
        </Wrapper>
    )
}

const Wrapper = styled(SafeAreaView)`
    top: ${props => props.wrapperTop}px;
    width: 100%;
    height: ${props => props.height}px;    

    position: absolute;
    background-color: white;
`

const Wrapper_SafeArea = styled(View)`
    width: 100%;
    height: 100%;
    position: absolute;
`

const Logo = styled(Image)`
    top: ${380/3120 * 100}%;
    height: ${412/3120 * 100}%;           
    width: ${489/1440  *100}%;

    align-self: center;
    position: absolute;
    object-fit: contain;
`

const Email_Input_Box = styled(View)`
    top: ${910/3120 * 100}%;
    width: ${1320/1440 * 100}%;
    height: ${184/3120 * 100}%;

    font-family: 'Cafe24Simplehae';
    font-size: 11px;

    align-self: center;
    position: absolute;
`

const Password_Input_box = styled(View)`
    top: ${1126/3120 * 100}%;
    width: ${1320/1440 * 100}%;
    height: ${184/3120 * 100}%;

    font-family: 'Cafe24Simplehae';
    font-size: 11px;

    align-self: center;
    position: absolute;
`

const Login_Button = styled(TouchableOpacity)`
    top: ${1374/3120 * 100}%;
    width: ${1320/1440 * 100}%;
    height: ${184/3120 * 100}%;

    border-radius: 4px;

    align-self: center;
    position: absolute;
    align-items: center;
    justify-content: center;

    background-color: #537BCC;
`

const Auth_Button_Box = styled(View)`
    top: ${1644/3120 * 100}%;
    width: ${852/1440 * 100}%;
    height: ${90/3120 * 100}%;

    align-self: center;
    position: absolute;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const styles = StyleSheet.create({
    Login_Text: {
        fontFamily: 'Cafe24Simplehae',
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        color: "white"
    },
    Auth_Sign_Button: {
        flex: 1,  
    },
    Auth_Find_User_Button: {
        flex: 1,
    },
    Auth_Text: {
        fontFamily: 'Cafe24Simplehae',
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        color: "#999999",
        marginLeft: 8,
        marginRight: 8
    }
})

export default Login_email_page;