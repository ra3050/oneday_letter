import React, { useLayoutEffect } from "react";
import { View, ImageBackground, Image, Text, Platform, Dimensions, Alert } from "react-native";
import { styled } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import KakaoLogins, {login, getProfile} from '@react-native-seoul/kakao-login'

import bgimg from "../../../resource/Login/login_bg.png";
import LogoImg from "../../../resource/Login/LOGO.png";
import btn_kakao from "../../../resource/Login/btn-login-kakao.png";
import btn_email from "../../../resource/Login/btn-login-email.png";
import btn_naver from "../../../resource/Login/btn-login-naver.png";
import btn_apple from "../../../resource/Login/btn-login-apple.png";
import { get_usreIdx, set_userIdx } from "../../Controller/Storage";
import NaverLogin from "@react-native-seoul/naver-login";
import { req_socialCheck } from "../../utils/requestApi";
import appleAuth from "@invertase/react-native-apple-authentication";

const Login_page = (props) => {
    const fontSize = Dimensions.get('window').width * 0.05;
    const os = Platform.OS;
    const navigation = useNavigation();    

    get_usreIdx(mb_idx => { // 이메일, 자동로그인
        if (mb_idx) {
            navigation.navigate('Tab_Screen')           
        }
    })

    const socialCheck = (ref_id, type) => {
        const info = { reg_id: ref_id }
        req_socialCheck(info, (data) => {
            if (data?.next) {
                navigation.navigate('Login_Social_Sign', {reg_code: ref_id, reg_type: type})
            } else if (data?.result) {
                // mb_idx asyncStorage에 저장 후 'Tab_Screen'으로 이동
                set_userIdx(data?.mb_idx);
                navigation.navigate('Tab_Screen')
            }
        })
    }

    const handleKakaoSignin = async() => {
        const successResponse = await login().then(result => {
            return result
        }).catch(error => {
            console.log(error)
            throw error;
        })

        if (successResponse?.accessToken) {
            await getProfile().then(result => {
                console.log(result?.id)
                socialCheck(result?.id, 'KAKAO')
            }).catch(error => {
                console.log(error) 
                throw error;
            })
        }
    }

    const handleNaverLogin = async() => {
        const iosKeys = {
            consumerKey: "P8fw62V8vrNgmxOO4vRf",
            consumerSecret: "nT_nQRQriV",
            appName: "나의하루",
            serviceUrlScheme: "naverP8fw62V8vrNgmxOO4vRf" // only for iOS
        };
        
        const androidKeys = {
            consumerKey: "P8fw62V8vrNgmxOO4vRf",
            consumerSecret: "nT_nQRQriV",
            appName: "나의하루"
        };

        const naverKey = Platform.OS === "ios" ? iosKeys : androidKeys
        
        const {failureResponse, successResponse} =  await NaverLogin.login(iosKeys)
        try {
            const profile = await NaverLogin.getProfile(successResponse?.accessToken);
            console.log(profile.response.id)
            socialCheck(profile.response.id, 'NAVER')
        } catch (e) {
            console.log(e)
            throw e;
        }
        
    }

    const handleAppleLogin = async() => {
        const request = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(request.user);

        if (credentialState === appleAuth.State.AUTHORIZED) {
            const reg_id = request.user
            console.log(reg_id)
            socialCheck(reg_id, 'APPLE')
        }
    }
    
    return (
        <Wrapper >
            <BgImage source={bgimg}>
                <BgImage_Background_opacity/>
                <Logo source={LogoImg}/>
                <Title_Container>
                    <Title_Line/>
                    <Title_Connect fontsize={fontSize}>Connect With</Title_Connect>
                    <Title_Line/>
                </Title_Container>
                <Login_Container>
                    {os === 'ios' ? 
                        <>
                            <Login_Button onPress={() => handleKakaoSignin()}>
                                <Login_Button_Image source={btn_kakao}/>
                            </Login_Button>
                            <Login_Button onPress={() => navigation.navigate('Login_Email')} title='open to login_page'>
                                <Login_Button_Image source={btn_email}/>
                            </Login_Button>
                            <Login_Button onPress={() => handleNaverLogin()}>
                                <Login_Button_Image source={btn_naver}/>
                            </Login_Button>
                            <Login_Button onPress={() => handleAppleLogin()}>
                                <Login_Button_Image source={btn_apple}/>
                            </Login_Button>
                        </>    
                    : 
                    <>
                        <Login_Button onPress={() => handleKakaoSignin()}>
                            <Login_Button_Image source={btn_kakao}/>
                        </Login_Button>
                        <Login_Button onPress={() => navigation.navigate('Login_Email')} title='open to login_page'>
                            <Login_Button_Image source={btn_email}/>
                        </Login_Button>
                        <Login_Button onPress={() => handleNaverLogin()}>
                            <Login_Button_Image source={btn_naver}/>
                        </Login_Button>
                    </>
                    }  
                </Login_Container>
                <Company_Title>(주)나의하루</Company_Title>
            </BgImage>
        </Wrapper>
    )
}

Login_page.navigationOptions = {
    headerShown: false,
}

const Wrapper = styled(View)`
    flex: 1;

    background-color: white;
`

const BgImage = styled(ImageBackground)` 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    position: relative;
`

const BgImage_Background_opacity = styled.View`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: ${100}%;
    height: ${100}%;

    position: absolute;

    background-color: black;
    opacity: 0.5;
    z-index: 5;
`

const Logo = styled(Image)`
    top: ${450/3120 * 100}%;
    height: ${412/3120 * 100}%;           
    width: ${489/1440  *100}%;

    align-self: center;
    position: absolute;
    object-fit: contain;

    z-index: 10;
`

const Title_Container = styled(View)`
    top: ${2007/3120 * 100}%;
    width: ${1160/1440 * 100}%;
    height: ${152/3120 * 100}%;

    align-self: center;
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    z-index: 10;
`

const Title_Connect = styled(Text)`
    flex: 2;
    font-family: 'Cafe24Simplehae';
    font-size: ${props => props.fontsize}px;
    text-align: center;
    color: white;

    position: relative;

    z-index: 10;
`

const Title_Line = styled(View)`
    flex: 1;
    background-color: white;
    border: 0.25px solid white;

    position: relative;

    z-index: 10;
`

const Login_Container = styled(View)`
    top: ${2257/3120 *100}%;
    width: ${(1440 - 282) / 1440 * 100}%;
    height: ${312/3120 * 100}%;

    align-self: center;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    position: absolute;

    z-index: 10;
` 

const Login_Button = styled.TouchableOpacity`
    flex: ${2/9};

    justify-content: center;
    align-items: center;

    position: relative;

    z-index: 10;
`

const Login_Button_Image = styled(Image)`
    width: 100%;
    height: 100%;

    position: relative;
    object-fit: contain;

    z-index: 10;
`

const Company_Title = styled(Text)`
    top: ${2884/3120 * 100}%;
    font-family: 'Cafe24Simplehae';
    font-size: 11px;
    align-self: center;
    text-align: center;
    color: white;

    position: absolute;

    z-index: 10;
`

export default Login_page;