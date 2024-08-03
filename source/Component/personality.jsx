import { useLayoutEffect, useState } from "react";
import { styled } from "styled-components";
import { Pressable, View, Text } from "react-native";

const personality_info = [
    {
        text: '활발한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '침착한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '낮가리는',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '다정한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '꼼꼼한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '털털한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '엉뚱한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '소심한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '현실적인',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '이상적인',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '순수한',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '직설직인',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '즉흥적인',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '계획적인',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '외향적인',
        backgroundColor: '#EEEEEE'
    },
    {
        text: '내향적인',
        backgroundColor: '#EEEEEE'
    },
]

const Personality = (props) => {
    const { personality, setPersonality, click, setClick, style } = props;
    const [info, setInfo] = useState(personality_info)
    const width = style.width - 32;
    const height = style.height;
    const buttonWidth = (width - 48) / 3;
    const buttonHeight = (height - 24 * 7) / 7;

    useLayoutEffect(() => {
        const newInfo = [...info]
        const newClick = []
        info.map((item, index) => {
            
            personality.forEach((element) => {
                if (element === item.text) {
                    // 배경색 변경
                    const newItem = {
                        uri: item.uri,
                        text: item.text,
                        backgroundColor: 'skyblue'
                    }
                    newInfo[index] = newItem
                    newClick.push(item.text)
                }
            });
            
        })
        setInfo(newInfo)
        setClick(newClick)
    }, [])

    const handle_personality_button = (index) => {
        if ([...click].indexOf(info[index].text) === -1 && [...click].length >= 3) {
            //3개를 선택했을 떄, 선택한 단어가 아닐때,
            //toast로 다른 단어를 선택해야 함을 알려줍니다    ++ 아래에 toast추가
            return
        }
        
        const currentColor = info[index].backgroundColor
        //선택 데이터 추가/제거
        if (currentColor === '#EEEEEE' && click.length < 3) {
            setPersonality([...personality, info[index].text])
            setClick([...click, info[index].text])
        } else {
            const spliceIndex = [...personality].indexOf(info[index].text)
            if (index !== -1) {
                var oldPersonality = [...personality];
                oldPersonality.splice(spliceIndex, 1)
                setPersonality(oldPersonality)
            }

            const c_spliceIndex = [...click].indexOf(info[index].text)
            if (index !== -1) {
                var oldPersonality = [...click];
                oldPersonality.splice(c_spliceIndex, 1)
                setClick(oldPersonality)
            }
        }

        //배경색 변경
        const newItem = {
            text: info[index].text,
            backgroundColor: currentColor === '#EEEEEE' ? 'skyblue' : '#EEEEEE'
        }
        const newInfo = [...info]
        newInfo[index] = newItem
        setInfo(newInfo)
    }

    return (
        <Wrapper width={width} height={height}>

            <Personality_Container>
                <Personality_Button backgroundColor={info[0].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(0)}>
                    <Personality_Text>{info[0].text}</Personality_Text>
                </Personality_Button>
            </Personality_Container>
            
            <Personality_Container>
                <Personality_Button backgroundColor={info[1].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(1)}>
                    <Personality_Text>{info[1].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[2].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() =>  handle_personality_button(2)}>
                    <Personality_Text>{info[2].text}</Personality_Text>
                </Personality_Button>
            </Personality_Container>
                
            <Personality_Container>
                <Personality_Button backgroundColor={info[3].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() =>  handle_personality_button(3)}>
                    <Personality_Text>{info[3].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[4].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() =>  handle_personality_button(4)}>
                    <Personality_Text>{info[4].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[5].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() =>  handle_personality_button(5)}>
                    <Personality_Text>{info[5].text}</Personality_Text>
                </Personality_Button>

            </Personality_Container>

            <Personality_Container>
                <Personality_Button backgroundColor={info[6].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() =>  handle_personality_button(6)}>
                    <Personality_Text>{info[6].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[7].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() =>  handle_personality_button(7)}>
                    <Personality_Text>{info[7].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[8].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(8)}>
                    <Personality_Text>{info[8].text}</Personality_Text>
                </Personality_Button>

            </Personality_Container>

            <Personality_Container>
                <Personality_Button backgroundColor={info[9].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(9)}>
                    <Personality_Text>{info[9].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[10].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(10)}> 
                    <Personality_Text>{info[10].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[11].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(11)}>
                    <Personality_Text>{info[11].text}</Personality_Text>
                </Personality_Button>
            </Personality_Container>

            <Personality_Container>
                <Personality_Button backgroundColor={info[12].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(12)}>
                    <Personality_Text>{info[12].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[13].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(13)}>
                    <Personality_Text>{info[13].text}</Personality_Text>
                </Personality_Button>
            </Personality_Container>

            <Personality_Container>
                <Personality_Button backgroundColor={info[14].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(14)}>
                    <Personality_Text>{info[14].text}</Personality_Text>
                </Personality_Button>
                <Personality_Button backgroundColor={info[15].backgroundColor} width={buttonWidth} height={buttonHeight} onPress={() => handle_personality_button(15)}>
                    <Personality_Text>{info[15].text}</Personality_Text>
                </Personality_Button>
            </Personality_Container>
        </Wrapper>
    )
}

const Wrapper = styled(View)`
    margin: 0 16px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
`

const Personality_Container = styled(View)`
    width: 100%;
    margin-top: 16px; 

    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Personality_Button = styled(Pressable)`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin: 0 8px;

    border-radius: 6px;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.backgroundColor}; 
`

const Personality_Text = styled(Text)`
    text-align: center;
    
    font-family: 'Cafe24Simplehae';
    font-size: 12px;
`

export default Personality;