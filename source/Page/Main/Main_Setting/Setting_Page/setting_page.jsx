import { useLayoutEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View, Switch, Alert } from "react-native";
import { styled } from "styled-components"
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import { get_usreIdx } from "../../../../Controller/Storage";
import { req_signUserInfo, req_signout, req_userInfo } from "../../../../utils/requestApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNavigatorFactory, useNavigation } from "@react-navigation/native";

const Setting_Page = (props) => {
    const {navigation, route} = props;
    const [category, setCategory] = useState('');
    const [nick, setNick] = useState('');
    const [alert_push, setAlert_push] = useState(false);
    const [alert_sms, setAlert_sms] = useState(false);
    const [alert_email, setAlert_email] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '설정',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae'},
            headerBackTitle: '',
            headerBackTitleVisible: false,
        })
    }, [])

    useLayoutEffect(() => {
        get_usreIdx(mb_idx => {
            if (mb_idx) {
                const reqInfo = { mb_idx: mb_idx }
                req_userInfo(reqInfo, data => {
                    if (data?.result) {
                        setNick(data?.info[0].mb_nick)
                        setAlert_push(data?.info[0].alert_push && true)
                        setAlert_email(data?.info[0].alert_email && true)
                        setAlert_sms(data?.info[0].alert_sms && true)
                        const splitCategory = data?.info[0].category
                        setCategory(splitCategory)
                        console.log(data?.info[0])
                    }
                })
            }
        })
    }, [])

    const handleAlertPush = () => {
        get_usreIdx(mb_idx => {
            if (mb_idx) {
                const info = {mb_idx: mb_idx, alert: {name: 'alert_push', value: !alert_push}}
                req_signUserInfo(info, data => {
                    if (data?.result) {
                        setAlert_push(!alert_push)
                    } else {
                        setAlert_push(alert_push)
                    }
                })
            }
        })
    }

    const logout = () => {
        try {
            AsyncStorage.removeItem('userID', () => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home'}]
                })
            })
        } catch (error) {
            console.log('mb_idx 지우기 실패')
        }
    }


    const handleLogout = () => {
        Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
            {
                text: '예',
                onPress: () => logout(),
                style: 'destructive'
            },
            {
                text: '아니요',
                style: 'defalt'
            }
        ])
    }

    const handleSignOut = () => {
        Alert.alert('회원탈퇴', '지금까지 주고받은 편지가 모두 삭제됩니다\n정말로 탈퇴하시겠어요?', [
            {
                text: '예',
                onPress: () => signout(),
                style: 'destructive'
            },
            {
                text: '아니요',
                style: 'defalt'
            }
        ])
        const signout = () => {
            get_usreIdx(mb_idx => {
                if (mb_idx) {
                    const info = {mb_idx: mb_idx}
                    req_signout(info, data => {
                        if (data?.result) {
                            logout()
                        }
                    })
                }
            })
        }
        
    }

    return (
        <Wrapper>
            <Options_Container ratios={1}>
                <Option_Button ratios={1}>
                    <Option_Text>닉네임: {nick}</Option_Text>
                </Option_Button>
            </Options_Container>
            
            {/* <Options_Container ratios={2}>
                <Location_Container ratios={1} paddingLeft={16} alignSelf='flex-start'>
                    <Option_Text>지역 설정</Option_Text>
                </Location_Container>
                
                <Location_Container ratios={2}>
                    <Location_Button ratios={1} aspectRatio={4} alignSelf='center' color='skyblue'>
                        <Location_Button_In_Container>
                            <Location_Button_Text>편지 보낼 지역</Location_Button_Text>
                        </Location_Button_In_Container>
                        
                        <Location_Button_In_Container backgroundColor='white'>
                            <Icon2 name='location-pin' size={16}/>
                            <Location_Button_Text>서울</Location_Button_Text>
                        </Location_Button_In_Container>
                    </Location_Button>

                    <Location_Button ratios={1} aspectRatio={4} alignSelf='center' color='wheat'>
                        <Location_Button_In_Container>
                            <Location_Button_Text>{'편지 받지\n않을 지역'}</Location_Button_Text>
                        </Location_Button_In_Container>
                        
                        <Location_Button_In_Container backgroundColor='white'>
                            <Icon2 name='location-pin' size={16}/>
                            <Location_Button_Text>대구</Location_Button_Text>
                        </Location_Button_In_Container>
                    </Location_Button>

                </Location_Container>
            </Options_Container> */}
            
            <Options_Container ratios={1}>
                <Option_Button ratios={1} onPress={() => navigation.navigate('Login_Interest_Choice', {category: category})}>
                    <Option_Text>나의 관심사/고민</Option_Text>
                    <Icon name="swapright" size={22}/>
                </Option_Button>
                {/* <User_Info_Container ratios={1}>
                    <User_Interest_Content>
                        <User_Interset_Text>친구/연인</User_Interset_Text>
                    </User_Interest_Content>
                    <User_Interest_Content>
                        <User_Interset_Text>선배/후배</User_Interset_Text>
                    </User_Interest_Content>
                    <User_Interest_Content>
                        <User_Interset_Text>취미/여가</User_Interset_Text>
                    </User_Interest_Content>
                </User_Info_Container> */}
            </Options_Container>
            
            <Options_Container ratios={1}>
                <Option_Button ratios={1} onPress={() => navigation.navigate('Login_Personality_Choice', {category: category})}>
                    <Option_Text>나의 성격</Option_Text>
                    <Icon name="swapright" size={22}/>
                </Option_Button>
                {/* <User_Info_Container ratios={1}>
                    <User_Personality_Content>
                        <User_Personality_Text>활발한</User_Personality_Text>
                    </User_Personality_Content>
                    <User_Personality_Content>
                        <User_Personality_Text>털털한</User_Personality_Text>
                    </User_Personality_Content>
                    <User_Personality_Content>
                        <User_Personality_Text>직설적인</User_Personality_Text>
                    </User_Personality_Content>
                </User_Info_Container> */}
            </Options_Container>

            <Options_Container ratios={0.75}>
                <Option_Button ratios={1}>
                    <Option_Text>편지 알람 허용</Option_Text>
                    <Switch
                        marginLeft={12}
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => handleAlertPush()}
                        value={alert_push}
                    />
                </Option_Button>
            </Options_Container>

            <Options_Container ratios={0.75} paddingTop={16}>
                <Pressable paddingLeft={16} onPress={() => handleLogout()}>
                    <Option_Text>
                        <Icon2 name="log-out" size={16}/> 로그아웃
                    </Option_Text>
                </Pressable>
                <Pressable paddingLeft={16} onPress={() => handleSignOut()}>
                    <Option_Text>
                        <Icon3 name="user-slash" size={14}/> 회원탈퇴
                    </Option_Text>
                </Pressable>
            </Options_Container>

            

            {/* <Options_Container ratios={2}>
                <Option_Button ratios={1}>
                    <Option_Text>구독 여부</Option_Text>
                    <Icon name="swapright" size={22}/>
                </Option_Button>
            </Options_Container> */}
            <Options_Container ratios={3}/>
        </Wrapper>
    )
}

const Wrapper = styled(SafeAreaView)`
    flex: 1;
    
    background-color: white;
`

const Options_Container = styled(View)`
    flex: ${props => props.ratios}; 

    flex-direction: column;
    justify-content: space-around;
`

const Option_Button = styled(Pressable)`
    flex: ${props => props.ratios};
    padding: 0 16px;

    border-bottom-color: gray;
    border-bottom-width: 0.5px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Option_Text = styled(Text)`
    font-family: 'Cafe24Simplehae';
    
    font-size: 16px;
    font-weight: normal;

    /* color: ${props => props.color}; */
`

const Alert_Container = styled(View)`
    flex: ${props => props.ratios};
    padding: 0 16px;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
`

const Location_Container = styled(View)`
    flex: ${props => props.ratios};
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Location_Button = styled(Pressable)`
    flex: ${props => props.ratios};
    padding: 4px;

    background-color: ${props => props.color};

    border-radius: 5000px;

    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Location_Button_Text = styled(Text)`

    align-self: center;
    text-align: center;
`

const Location_Button_In_Container = styled(View)`
    width: 50%;
    height: 100%; 

    align-self: center;

    border-radius: 500px;

    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const User_Info_Container = styled(View)`
    flex: ${props => props.ratios};
    
    flex-direction: row;
`

const User_Interest_Content = styled(View)`
    flex: 1;
    margin: 8px;
    
    border-radius: 300px;

    justify-content: center;
    align-items: center;

    ${Platform.OS === 'ios' ?
        `shadow-color: gray;
        shadow-offset: 0px 2px;
        shadow-opacity: 1;
        shadow-radius: 4px;`
    :
        `elevation: 7;`
    }

    background-color: wheat;
`

const User_Interset_Text = styled(Text)`
    font-family: 'Cafe24Simplehae';
    
    font-size: 14px;
    font-weight: normal;
`

const User_Personality_Content = styled(View)`
    flex: 1;
    margin: 8px;
    
    border-radius: 8px;

    justify-content: center;
    align-items: center;

    background-color: #EEEEEE;
`

const User_Personality_Text = styled(Text)`
    font-family: 'Cafe24Simplehae';
    
    font-size: 14px;
    font-weight: normal;
`

export default Setting_Page;