import { useLayoutEffect, useState } from "react"
import { ScrollView, TouchableOpacity, Dimensions} from "react-native"
import { styled } from "styled-components"
import Letter_Exchange_Container from "../../../Letter_Exchange/letter_exchange_Container";

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

const Setting_Receive_Carousel = (props) => {
    const { letterInfo } = props;
    
    console.log(letterInfo, '여기야 여기');
    useLayoutEffect(() => {
       
    })


    useLayoutEffect(() => {
        
    }, [])


    return (
        <Wrapper>
            <Letter_Exchange_Container letterInfo={letterInfo?.data}/>
        </Wrapper>
    )
}

const Wrapper = styled(ScrollView)`
    flex: 1;

    background-color: white;
`

export default Setting_Receive_Carousel;