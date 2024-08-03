import { useLayoutEffect } from "react";
import { View } from "react-native";
import { styled } from "styled-components";
import Setting_Send_Carousel from "./setting_send_carousel";


const Setting_Send_Page = (props) => {
    const {navigation, route} = props;
    const data = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: '내가 보낸 편지',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae', color: '#6B7C96'},
            headerBackTitle: '',
            headerBackTitleVisible: false,
        })
    })

    return (
        <Wrapper>
            <Setting_Send_Carousel letterInfo={data.letterInfo}/>
        </Wrapper>
    )
}

const Wrapper = styled(View)`
    background-color: white;
`
export default Setting_Send_Page;



