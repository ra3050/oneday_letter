import { styled } from "styled-components";
import { Dimensions, FlatList, View } from "react-native";
import Letter_Content from "./letter_content_container";

const screenWidth = Math.round(Dimensions.get('window').width);

const subscribeFalse = [{
    title: "같은 성향",
    descrypt: "나의 성격/취미가 같은\n누군가와 대화하기",
    imgValue: 1,
    id: 1,
}, {
    title: "비슷한 성향",
    descrypt: "나의 성격/취미가 비슷한\n누군가와 대화하기",
    imgValue: 2,
    id: 2,
}, {
    title: "다른 성향",
    descrypt: "나의 성격/취미가 다른\n누군가와 대화하기",
    imgValue: 3,
    id: 3,
},]

const subScribeTrue = [{
    title: "같은 성향",
    descrypt: "나의 성격/취미가 같은\n누군가와 대화하기",
    imgValue: 4,
    id: 4,
}, {
    title: "비슷한 성향",
    descrypt: "나의 성격/취미가 비슷한\n누군가와 대화하기",
    imgValue: 5,
    id: 5,
}, {
    title: "다른 성향",
    descrypt: "나의 성격/취미가 다른\n누군가와 대화하기",
    imgValue: 6,
    id: 6,
},]

const Letter_Content_Carousel = (props) => {
    const {subscribeOn} = props;
    const pageWidth = Math.round(screenWidth * (1080/1440)) //screenWidth - (16 + 36) * 2
    const gap = 16;
    const offset = (screenWidth - pageWidth - gap * 2) / 2;

    // const onScroll = (e) => {
    //     const newPage = Math.round(
    //         e.nativeEvent.contentOffset.x / (pageWidth + gap),
    //     )
    //     onPaging(newPage);
    // }


    const renderItem = ({item}) => {
        console.log(item)
        return (
            <Letter_Content item={item} info={subscribeOn ? subScribeTrue : subscribeFalse} style={{width: pageWidth, marginHorizontal: gap / 2, backgroundColor: 'red'}}/>
        )
    }

    return (
        <Container>
            <FlatList 
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{
                    paddingHorizontal: offset + gap / 2,
                }}
                data={subscribeOn ? subScribeTrue : subscribeFalse}
                decelerationRate="fast"
                horizontal
                keyExtractor={(item) => item.id}
                pagingEnabled
                renderItem={renderItem}
                snapToInterval={pageWidth + gap}
                snapToAlignment='start'
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    )
}

const Container = styled(View)`
    width: 100%;
    height: 60%;

    justify-content: center;
    align-items: center;
`

export default Letter_Content_Carousel;