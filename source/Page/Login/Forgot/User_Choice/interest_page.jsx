import { styled } from "styled-components";
import { useLayoutEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import Interest from "../../../../Component/interest";
import Icon from "react-native-vector-icons/Octicons";
import Toast from "react-native-easy-toast";
import { req_signCategory } from "../../../../utils/requestApi";
import { get_usreIdx } from "../../../../Controller/Storage";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Interest_Page = (props) => {
    const {navigation, route} = props;
    const signValue = route.params?.signup;      //true: back_Button disable, false: back_button enable
    const mb_idx = route.params?.mb_idx;
    const category = route.params?.category;     // 설멍페이지 -> 설정 으로 접근한 경우에만 사용됩니다
    const [userInterest, setInterest] = useState(signValue ? [] : category.split(','));
    const toastRef = useRef();

    const sortCategory = () => {
        // setInterest 함수를 사용하여 userInterest 상태를 업데이트
        if (userInterest.length < 3) {
            toastRef.current.show('최소 3개이상 선택해주세요')
        } else {
            if (signValue) {    // 회원가입 -> 설정
                const sortedInterest = userInterest.sort();
                const newCategory = sortedInterest.join(',');

                console.log(newCategory);

                navigation.navigate('Login_Personality_Choice', { signup: true, category: newCategory, mb_idx: mb_idx });    
            } else {            // 설정페이지 -> 설정
                // 설정페이지 코드작성
                const current = userInterest.sort();
                const sCurrent = current.join(',');
                
                const newCategory = sCurrent;

                console.log(newCategory);
                get_usreIdx(mb_idx => {
                    req_signCategory({mb_idx: mb_idx, new_category: newCategory}, (data) => {
                        if (data?.result) {
                            navigation.reset({
                                index: 0,
                                routes: [{ name:'Tab_Screen' }],
                            });
                        } else {
                            console.log('error')
                        }
                        
                    })
                })
            }
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: true,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae'},
            headerBackVisible: signValue ? false : true,
            headerRight: () => (
            <TouchableOpacity onPress={() => sortCategory()}>
                <Icon name="check" size={24} color="black"/>            
            </TouchableOpacity>)
        })
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: true,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae'},
            headerBackVisible: signValue ? false : true,
            headerRight: () => (
            <TouchableOpacity onPress={() => sortCategory()}>
                <Icon name="check" size={24} color="black"/>            
            </TouchableOpacity>)
        })
    }, [userInterest])

    return (
        <Wrapper>
            <Wrapper_Safe>
                <Title_container>
                    <View>
                        <Title color='black'>{'난 요즘에'}</Title>
                        <Title color='#5563A8'>{'이렇게 지내'}</Title>
                    </View>
                    <Descrypt>{'나의 관심사.고민\n선택해 주세요'}</Descrypt>
                </Title_container>
                <Interest 
                    userInterest={userInterest} 
                    setInterest={setInterest}
                    signValue={signValue} 
                    style={{width: screenWidth, height: Math.round(screenHeight * 0.5)}} 
                />
                <Line_Conainer width={screenWidth}>
                    <Line_View />
                    <Descrypt_Sub>{'적어도 3개 이상'}</Descrypt_Sub>
                </Line_Conainer>
            </Wrapper_Safe>
            <Toast ref={toastRef}
                positionValue={screenHeight * 0.35}
                fadeInDuration={200}
                fadeOutDuration={1000}
                style={{backgroundColor:'#537BCC'}}
            />
        </Wrapper>
    )
}

const Wrapper = styled(View)`
    flex: 1;
    background-color: white;
`

const Wrapper_Safe = styled(SafeAreaView)`
    flex: 1;

    justify-content: space-around;
`

const Title_container = styled(View)`
    padding: 0 16px;
    width: 100%;
    height: 25%;

    justify-content: space-between;
    align-items: flex-start;
`

const Title = styled(Text)`
    margin-top: 8px;
    font-family: 'Cafe24Simplehae';
    
    font-size: 28px;
    font-weight: bold;

    color: ${props => props.color};
`

const Descrypt = styled(Text)`
    font-family: 'Cafe24Simplehae';
    
    font-size: 20px;
    font-weight: normal;
`

const Line_Conainer = styled(View)`
    width: ${props => props.width - 32}px;

    align-self: center;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

const Line_View = styled(View)`
    width: 100%;
    height: 2px;
    opacity: 0.3;

    background-color: #717171;
`

const Descrypt_Sub = styled(Text)`
    margin-top: 16px;
    font-family: 'Cafe24Simplehae';
    
    font-size: 18px;
    font-weight: normal;

    opacity: 0.5;

    color: #717171;
`

export default Interest_Page;