import { styled } from "styled-components";
import { useLayoutEffect, useState } from "react";
import { Dimensions, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import Interest from "../../../../Component/interest";
import Icon from "react-native-vector-icons/Octicons";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Setting_Interest_Page = (props) => {
    const {navigation, route} = props;
    const [userInterest, setInterest] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: true,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae'},
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="check" size={24} color="black"/>            
            </TouchableOpacity>)
        })
    }, [])

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
                <Interest userInterest={userInterest} setInterest={setInterest} style={{width: screenWidth, height: Math.round(screenHeight * 0.5)}} />
                <Line_Conainer width={screenWidth}>
                    <Line_View />
                    <Descrypt_Sub>{'적어도 3개 이상'}</Descrypt_Sub>
                </Line_Conainer>
            </Wrapper_Safe>
            
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
    font-style: oblique;

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

export default Setting_Interest_Page;