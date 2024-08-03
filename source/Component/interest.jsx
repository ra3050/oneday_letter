import { useLayoutEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styled } from "styled-components";

const icon_path = [
    {
        uri: require('../../resource/Login/icon/ic_friend.png'),
        text: '친구/인연',
        backgroundColor: '#EEEEEE'
    }, 
    {
        uri: require('../../resource/Login/icon/ic_senior.png'),
        text: '선/후배',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_travel.png'),
        text: '여행/캠핑',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_romance.png'),
        text: '썸/짝사랑',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_exam.png'),
        text: '시험/자격증',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_economic.png'),
        text: '경제/재테크',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_employment.png'),
        text: '취업/창업',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_social_life.png'),
        text: '사회생활',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_self_improvement.png'),
        text: '자기개발',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_hobby.png'),
        text: '취미/여가',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_sports.png'),
        text: '운동/스포츠',
        backgroundColor: '#EEEEEE'
    },
    {
        uri: require('../../resource/Login/icon/ic_theater.png'),
        text: '연극/공연',
        backgroundColor: '#EEEEEE'
    },
]

const Interest = (props) => {
    const { userInterest ,setInterest, style } = props;
    const [info, setInfo] = useState(icon_path);
    const width = style.width - 24;
    const height = style.height;
    const offset = 16;

    useLayoutEffect(() => {
        const newInfo = [...info]
        info.map((item, index) => {
            
            userInterest.forEach((element) => {
                if (element === item.text) {
                    // 배경색 변경
                    const newItem = {
                        uri: item.uri,
                        text: item.text,
                        backgroundColor: 'skyblue'
                    }
                    newInfo[index] = newItem

                    console.log(element)
                }
            });
            
        })
        setInfo(newInfo)
    }, [])

    return (
        <Wrapper width={width} height={height}>
            {info.map((item, index) => (
                <Interest_Button key={index} width={width} offset={offset} onPress={(e) => {
                    const currentColor = item.backgroundColor;
                    // 선택데이터 추가/제거
                    if (currentColor === '#EEEEEE') {
                        setInterest([...userInterest, item.text])
                    } else {
                        const spliceIndex = [...userInterest].indexOf(item.text)
                        if (index !== -1) {
                            var oldInterest = [...userInterest];
                            oldInterest.splice(spliceIndex, 1)
                            setInterest(oldInterest)
                        }
                    }

                    // 배경색 변경
                    const newItem = {
                        uri: item.uri,
                        text: item.text,
                        backgroundColor: currentColor === '#EEEEEE' ? 'skyblue' : '#EEEEEE'
                    }
                    const newInfo = [...info]
                    newInfo[index] = newItem
                    setInfo(newInfo)

                    console.log(userInterest);
                }}>
                    <Interest_Icon backgroundColor={item.backgroundColor} width={width} source={item.uri}/>
                    <Interest_Text>{`${item.text}`}</Interest_Text>
                </Interest_Button>
            ))}
        </Wrapper>
    )
}

const Wrapper = styled(View)`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin: 12px;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`

const Interest_Button = styled(Pressable)`
    width: ${props => (props.width - 64) / 4}px;
    margin: ${props => props.offset}px ${props => props.offset / 2}px;
`

const Interest_Icon = styled(Image)`
    width: ${props => (props.width - 64) / 4}px;
    height: ${props => (props.width - 64) / 4}px;
    border-radius: ${props => (props.width - 64) / 8}px;
    
    object-fit: contain;

    background-color: ${props => props.backgroundColor}
`

const Interest_Text = styled(Text)`
    margin-top: 4px;
    text-align: center;
    
    font-family: 'Cafe24Simplehae';
    font-size: 12px;
`

export default Interest;