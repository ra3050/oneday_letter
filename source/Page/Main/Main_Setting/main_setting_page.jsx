import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Dimensions, Platform, ScrollView } from "react-native";
import { styled } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome6";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Main_Setting_Letter_Box from "./main_setting_letter_box";
import { get_usreIdx } from "../../../Controller/Storage";
import { req_sendLetterInfo } from "../../../utils/requestApi";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Main_Setting_Page = (props) => {
    const {navigation, route} = props;

    const [userTitle, setUserTitle] = useState('');
    const [sendLtCnt, setSendLetter] = useState(398);
    const [receiveCnt, setReceive] = useState(500);
    const [imageUri, setImageUri] = useState({ 
        path:'../../../../resource/Letter/bg-diary-4-thumbnail.png', 
        dynamic: false,
    });

    const [sendLt, setSendLt] = useState(true);
    const [receiveLt, setReceiveLt] = useState(false);
    const [letterInfo, setLetterInfo] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTitle: 'MY',
            title: 'MY',
        })

        const loadUserTitle = async () => {
            try {
                //나에게 쓰는 말
                const value = await AsyncStorage.getItem('SayMe');
                if(value !== null) {
                    console.log('Loaded data: ', value);
                    setUserTitle(value);
                } else {
                    console.log('저장한 이미지가 없습니다');
                }

                const image = await AsyncStorage.getItem('ImageMe');

                if (image !== null) {
                    console.log('load Image: ', image);
                    setImageUri({
                        path: image,
                        dynamic: true
                    })
                } else {
                    console.log('저장한 이미지가 없습니다')
                }
            } catch (error) {
                console.log('Error loading data:', error);
            }
        }

        loadUserTitle();
    }, [])

    useLayoutEffect(() => {
        get_usreIdx(mb_idx => {
            if (mb_idx) {
                req_sendLetterInfo({mb_idx: mb_idx}, data => {
                    if (data.result) {
                        setLetterInfo(data?.letter_info);
                    }
                })
            }
        })
    }, [])

    const handleSaveUserTitle = async () => {
        try {
            await AsyncStorage.setItem('SayMe', userTitle);
            console.log('Data saved successfully');
        } catch (error) {
            console.log('Error saving data: ', error);
        }
    }

    const handleSaveUserImage = () => {
        launchImageLibrary({mediaType: 'photo'}, async (imgValue) => {

            if (imgValue.didCancel) {
                //사용자가 이미지를 취소했을 때
                console.log('이미지 선택 취소')
                return
            }
            
            if (imgValue.errorCode) {
                //이미지 선택 에러 발생시
                console.log('이미지 선택시 에러발생, 내용: ', imgValue.errorCode)
                return
            }

            try {
                await AsyncStorage.setItem('ImageMe', imgValue.assets[0].uri)
                setImageUri({
                    path: imgValue.assets[0].uri,
                    dynamic: true,
                })
                console.log('이미지를 정상적으로 저장하였습니다.')
            } catch (error) {
                console.log('이미지를 저장하는 과정에서 에러가 발생하였습니다 : ', error)
            }
        })
    }
    
    return (
        <Wrapper>
            <ScrollView
                decelerationRate="fast"
                bounces='false'
                showsVerticalScrollIndicator={false}
            >
                <User_Set_Container height={screenHeight * 0.45}>
                    <User_Set_Image source={imageUri.dynamic ? { uri: imageUri.path } : require("../../../../resource/Letter/bg-diary-4-thumbnail.png")}/>
                    <User_Set_Title_Container>
                        <User_Set_Title
                            placeholder="'나에게 하는 한마디'"
                            placeholderTextColor="#5D82CF"
                            value={userTitle}
                            onChangeText={text => setUserTitle(text)}
                            onEndEditing={handleSaveUserTitle}
                        />
                    </User_Set_Title_Container>
                    <View
                        style={styles.gradientContainer}
                    >
                        <User_Set_Image_Choice_Button width={screenWidth * 0.15} height={screenWidth * 0.15} onPress={handleSaveUserImage}>
                            <Icon name="plus" color="white" size={Math.round(screenWidth * 0.075)} transform={[{rotateZ: '15deg'}]}/>
                        </User_Set_Image_Choice_Button>
                    </View>
                </User_Set_Container>

                <User_Letter_Info_Container height={screenHeight * 0.1}>
                    <TouchableOpacity style={styles.infoContainerButton}>
                        <Icon2 name="people-outline" color="black" size={24} style={{alignSelf: 'center'}}></Icon2>
                        <User_Letter_Info_Title>친구 목록</User_Letter_Info_Title>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoContainerButton}>
                        <User_Letter_Info_Count>{sendLtCnt}</User_Letter_Info_Count>
                        <User_Letter_Info_Title>내가 쓴 편지</User_Letter_Info_Title>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoContainerButton}>
                        <User_Letter_Info_Count>{receiveCnt}</User_Letter_Info_Count>
                        <User_Letter_Info_Title>내가 받은 편지</User_Letter_Info_Title>
                    </TouchableOpacity>
                </User_Letter_Info_Container>

                <User_Setting_Container width={screenWidth - 32} height={screenHeight * 0.1} onPress={() => navigation.navigate('Setting')}>
                    <User_Setting_Title>나를 위한 설정</User_Setting_Title>
                </User_Setting_Container>

                <User_Letter_Choice_Container width={screenWidth - 32} height={Math.round(screenHeight * 0.075)}>
                    <User_Send_Letter_Button color={sendLt} onPress={() => { 
                        setSendLt(true)
                        setReceiveLt(false) 
                    }}>
                        <User_Send_Letter_Button_Title color={sendLt}>내가 쓴 편지</User_Send_Letter_Button_Title>
                    </User_Send_Letter_Button>
                    <User_Send_Letter_Button color={receiveLt} onPress={() => { 
                        navigation.navigate('Setting_Receive') 
                    }}>
                        <User_Send_Letter_Button_Title color={receiveLt}>내가 받은 편지</User_Send_Letter_Button_Title>
                    </User_Send_Letter_Button>
                </User_Letter_Choice_Container>

                <View>
                    <TouchableOpacity style={styles.nextButtoView} onPress={() => {
                        if (sendLt) 
                            navigation.navigate('Setting_Send', {letterInfo: letterInfo})
                        else if (receiveLt)
                            navigation.navigate('Setting_Receive')
                    }}>
                        <User_Letter_Add_Text>{'더보기 >'}</User_Letter_Add_Text>
                    </TouchableOpacity>
                    <User_Letter_Container>
                        {letterInfo.map((item, index) => (
                            <Main_Setting_Letter_Box key={index} item={item} style={{width: (screenWidth - 24) / 2  - 8, height: (screenWidth) / 2  - 8, margin: 4}}/>
                        ))}
                    </User_Letter_Container>
                </View>
                

            </ScrollView>
            
        </Wrapper>
    )
}

const Wrapper = styled(View)`
    width: 100%;
    height: 100%;

    background-color: white;
`

const User_Set_Container = styled(View)`
    width: 100%;
    height: ${props => props.height}px;

    flex-direction: column;
    justify-content: flex-end;
    
    background-color: wheat;
    overflow: hidden;
`

const User_Set_Image = styled(Image)`
   width: 100%;
   height: 100%;
   
   position: absolute;

   object-fit: cover;

   transform: perspective(10);
   
   background-color: white;
`

const User_Set_Image_Choice_Button = styled(TouchableOpacity)`
    top: ${props => -(props.height / 2)}px;
    left: 40%;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    border-radius: ${props => props.height / 2}px;
    justify-content: center;
    align-items: center;
    z-index: 10;

    background-color: black;

    ${Platform.OS === 'ios' ?
        `shadow-color: gray;
        shadow-offset: 0px 1px;
        shadow-opacity: 1;
        shadow-radius: 4px;`
    :
        `elevation: 7;`
    }
`

const User_Set_Title_Container = styled(View)`
    top: 0;
    width: 100%;
    height: 80%;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    position: absolute;

    background-color: transparent;
`

const User_Set_Title = styled(TextInput)`
    text-align: center;
    
    font-family: 'Cafe24Simplehae';
    font-size: 24px;

    color: #bbbdc0;
`

const User_Letter_Info_Container = styled(View)`
    width: 100%;
    height: ${props => props.height}px;
    
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const User_Letter_Info_Title = styled(Text)`
    top: 8px;
    text-align: center;
    
    font-family: 'Cafe24Simplehae';
    font-size: 14px;

    color: black;
`

const User_Letter_Info_Count = styled(Text)`
    font-family: 'Cafe24Simplehae';
    font-size: 14px;
    
    align-self: center;

    color: skyblue;
`

const User_Setting_Container = styled(TouchableOpacity)`
    margin-left: 16px;
    margin-right: 16px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    
    justify-content: center;
    align-items: center;

    border-width: 1px;
    border-color: #E2E2E2;
    border-radius: ${props => props.height / 5}px;
`

const User_Setting_Title = styled(Text)`
     text-align: center;
    
    font-family: 'Cafe24Simplehae';
    font-size: 18px;

    color: black;
`

const User_Letter_Choice_Container = styled(View)`
    margin: 16px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    border-bottom-color: #E2E2E2;
    border-bottom-width: 2px;

    flex-direction: row;
    justify-content: space-around;
`

const User_Send_Letter_Button = styled(TouchableOpacity)`
    width: 40%;
    height: 80%;

    border-radius: 16px;

    background-color: ${props => props.color ? '#C1D4F8' : 'transparent'};

    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const User_Send_Letter_Button_Title = styled(Text)`
    text-align: center;
    
    font-family: 'Cafe24Simplehae';
    font-size: 18px;

    color: ${props => props.color ? '#30487D' : 'black'};
`

const User_Letter_Container = styled(View)`
    padding: 0 12px;
    width: 100%;
    
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`

const User_Letter_Add_Text = styled(Text)`
    text-align: center;
    
    font-family: 'Cafe24Simplehae';
    font-size: 14px;

    color: #AAAAAA;
`

const styles = StyleSheet.create({
    gradientContainer: {
        width: '200%',
        height: '40%',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        transform: [{ perspective: 10 }, { rotateZ: '-15deg' }, { translateX: -50}],
        overflow: "visible",
        backgroundColor: 'white',
    },
    infoContainerButton: {
        height: '100%',
        alignContent: 'center',
        justifyContent: "center"
    },
    nextButtoView: {
        marginBottom: 8,
        paddingRight: 16,
        alignSelf: 'flex-end'
    }
})

export default Main_Setting_Page;