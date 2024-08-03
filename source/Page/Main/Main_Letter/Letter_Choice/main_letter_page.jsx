import { useLayoutEffect, useState, useCallback, useRef } from "react";
import { ImageBackground, View, Text, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";
import bg_Image from "../../../../../resource/Main/bg_letter_page.png"
import Back_Button from "../../../../Component/back_button";
import Carousel from "./letter_content_carousel";
import Icons from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-easy-toast";

const Main_Letter_Page = (props) => {
    const {navigation, route} = props;
    const [subscribeOn, setSubscribeOn] = useState(false);
    const ToastRef = useRef();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            title: '편지・이야기',
        })
    })

    const handleToast = () => {
        ToastRef.current.show(`${subscribeOn ? '일반모드로 전환되었습니다' : '구독자 모드로 전환되었습니다'}`)
    }

    return (
        <Wrapper>
            <BgImage source={bg_Image}/>
            <Wrapper_Safe>
                <View style={styles.topButtonBox}> 
                    <Back_Button path='Tab_Screen' style={styles.backButton}/>
                    {/* <TouchableOpacity style={styles.subOnButton} onPress={() => {
                        setSubscribeOn(!subscribeOn)
                        handleToast()
                    }}> 
                        <Icons name='exchange' size={24} color='white'/>
                    </TouchableOpacity> */}
                </View>
                <Letter_Content_Container>
                    <Letter_Title>{'어떤 친구와\n이야기를 나누고 싶나요?'}</Letter_Title>
                    <Letter_Descryption>{'얼굴은 모르지만,\n일상의 이야기가 궁금하다면\n서로 공유해 보아요'}</Letter_Descryption>
                    <Carousel subscribeOn={subscribeOn}/>
                </Letter_Content_Container>
            </Wrapper_Safe>
            <Toast
                ref={ToastRef}
                position='bottom'
                fadeInDuration={200}
                fadeOutDuration={1000}
                style={{backgroundColor: '#537BCC'}}
            />
        </Wrapper>
    )
}

const Wrapper = styled(View)`
    flex: 1;
    background-color: white;
`

const Wrapper_Safe = styled(SafeAreaView)`
    flex:1;
`

const BgImage = styled(ImageBackground)`
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
`

const Letter_Content_Container = styled(View)`
    width: ${100}%;
    height: ${(844 - 213) / 844 * 100}%;

    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
`

const Letter_Title = styled(Text)`
    top: 16px;
    left: 16px;
    width: 100%;

    position: relative;

    font-family: 'Cafe24Simplehae';
    font-size: 24px;
    font-weight: normal;
    color: white;
`

const Letter_Descryption = styled(Text)`
    left: 16px;
    width: 100%;

    position: relative;

    font-family: 'Cafe24Simplehae';
    font-size: 14px;
    font-weight: normal;

    color: white;
`

const styles = StyleSheet.create({
    topButtonBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backButton: {
        left: 8,
        top: 8,
        width: 36
    },
    subOnButton: {
        right: 8,
        top: 8,
        width: 36,
        height: 36,
        // position: 'absolute',
        // backgroundColor: 'white'
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Main_Letter_Page;