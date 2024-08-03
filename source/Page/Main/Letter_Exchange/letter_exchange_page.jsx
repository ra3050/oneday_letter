import { useLayoutEffect, useState } from "react"
import { Pressable, ScrollView, TouchableOpacity, SafeAreaView, Platform, Image, Text, Dimensions, View } from "react-native"
import { styled } from "styled-components"
import Icon2 from "react-native-vector-icons/Ionicons";
import Letter_Exchange_Container from "./letter_exchange_Container";
import { req_exchangeInfo } from "../../../utils/requestApi";

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const Letter_Exchange_Page = (props) => {
    const {navigation, route} = props
    const letterInfo = route.params;
    const [ex_letterInfo, setEx_letterInfo] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: true,
            title: '답장 확인하기',
            headerBackTitle: '',
            headerTitleAlign: 'center',
            headerShadowVisible: true,
            headerTitleStyle: {fontFamily: 'Cafe24Simplehae', fontSize: 22, color: 'black'},
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon2 name="chevron-back" size={24}/>
                </TouchableOpacity>
            )
        })
    })

    useLayoutEffect(() => {
        req_exchangeInfo(letterInfo, data => {
            if (data.result) {
                console.log(data.letter_info)
                setEx_letterInfo(data?.letter_info);
            }
        })
    }, [])

    return (
        <Wrapper>
            <Letter_Exchange_Container letterInfo={ex_letterInfo}/>
        </Wrapper>
    )
}

const Wrapper = styled(ScrollView)`
    flex: 1;

    background-color: white;
`

export default Letter_Exchange_Page;