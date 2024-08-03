import { styled } from "styled-components"; 
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, PanResponder, Keyboard, Dimensions, Alert} from "react-native";
import { useLayoutEffect, useState, useRef } from "react";
import Icon from "react-native-vector-icons/Octicons";
import SelectDropdown from 'react-native-select-dropdown';
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import { useHeaderHeight } from "@react-navigation/elements"
import { req_FindEmailAuthSend } from "../../../utils/requestApi";

const window_height = Dimensions.get('window').height;

const Forgot_email_page = (props) => {
    const {navigation, route} = props;
    const [phone1, setPhone1] = useState('010');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState();
    const headerHeight = useHeaderHeight();

    const toastRef = useRef();

    // 이메일 찾기 요청
    const handleCheckButton = () => {
        const info = { phone1: phone1, phone2: phone2, phone3: phone3 }
        req_FindEmailAuthSend(info, data => {
            console.log(data)
            if (data?.result) {
                Alert.alert(
                    '이메일정보를 확인해주세요',
                    `${data?.info[0].email}\n\n '확인'클릭시 로그인 화면으로 이동합니다`,
                    [{
                        text: '확인',
                        onPress: () => navigation.navigate('Login_Email'),
                    }])

            } else {
                toastRef.current.show(data?.errMessage);
            }
        }) 
    }
    // 네비게이션 옵션 정의
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: true,
            title: '이메일 찾기',
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
                setKeyboardHeight(e.endCoordinates.screenY)
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
                <Input_Title >휴대폰 번호</Input_Title>
                <Input_Phone_Number_Box>
                    <SelectDropdown 
                        data={arr_phone_first} 
                        buttonStyle={styles.select_button_style} 
                        buttonTextStyle={styles.select_button_title_style} 
                        defaultValueByIndex={0} 
                        rowTextStyle={styles.select_row_text_style}
                        onSelect={(item, _) => { setPhone1(item)}}
                    />
                    <TextInput 
                        clearButtonMode="unless-editing" 
                        clearTextOnFocus={true} 
                        maxLength={4} 
                        style={styles.input_secont_phone_number} 
                        textContentType="telephoneNumber"
                        keyboardType="number-pad" 
                        onChangeText={text => setPhone2(text)}
                        value={phone2}
                    />
                    <TextInput 
                        clearButtonMode="unless-editing" 
                        clearTextOnFocus={true} 
                        maxLength={4} 
                        style={styles.input_Third_phone_number} 
                        textContentType="telephoneNumber"
                        keyboardType="number-pad" 
                        onChangeText={text => setPhone3(text)}
                        value={phone3}
                    />
                </Input_Phone_Number_Box>
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

const Input_Title = styled(Text)`
    margin-top: ${82/3120 * 100}%;
    height: 16px;
    width: 100%;
    margin-bottom: 8px;

    font-family: 'Cafe24Simplehae';
    font-size: 14px;
    
    position: relative;
`

const Input_Phone_Number_Box = styled(View)`
    width: 100%;
    height: ${180/3120 * 100}%;
    margin-bottom: 16px;
    position: relative;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

const arr_phone_first = ['010', '011', '016', '017', '019']

export default Forgot_email_page;