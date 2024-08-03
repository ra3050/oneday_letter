import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { styled } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Ionicons"
import moment from "moment";
import bgImage from "../../../../resource/Letter/bg-diary-6-thumbnail.png"
import collectImg from "../../../../resource/Letter/ic-collect-bg.png"

const Receive_Collect_Box = (props) => {
    const {item, style, special} = props;
    const width = style.width;
    const height = style.height;
    const margin = style.margin;
    
    const title = item.content;
    const like_cnt = item.like_cnt;
    const modifyDate =  moment(item.created_date_time).format('YYYY.MM.DD');
    const view = item.view;

    const navigation = useNavigation();
    return (
        <Wrapper width={width} height={height} margin={margin} special={special} onPress={() => navigation.navigate('Main_Letter_Boast_Content', {letterInfo: item})}>
            <Bg_Image source={!special ? bgImage : collectImg}/>
            <Letter_Title numberOfLines={1} ellipsizeMode="tail">{title}</Letter_Title>
            <Sub_Container >
                <View style={{flexDirection: "row", marginRight: 16,}}>
                    <Icon name="heart" size={16} color="white"/>
                    <Letter_Text>{like_cnt}</Letter_Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Icon2 name="book-outline" size={16} color="white"/>
                    <Letter_Text>{view}</Letter_Text>
                </View>
            </Sub_Container>
            <Letter_Date>{modifyDate}</Letter_Date>
        </Wrapper>
    )
}

const Wrapper = styled(Pressable)`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin: ${props => props.margin}px;

    flex-direction: column;
    justify-content: center;
    align-items: center ;

    overflow: hidden;

    align-self: center;
`

const Bg_Image = styled(Image)`
    width: 100%;
    height: 100%;

    object-fit: ${props => props.special ? 'cover' : 'contain'};

    position: absolute;
    z-index: 10;
`

const Letter_Title = styled(Text)`
    width: 75%;

    align-self: center;

    position: relative;
    font-family: 'Cafe24Simplehae';
    font-size: 16px;
    text-align: center;

    color: white;

    z-index: 20;
`

const Letter_Date = styled(Text)`
    top: 16px;
    font-family: 'Cafe24Simplehae';
    font-size: 12px;

    position: relative;

    color: white;

    z-index: 20;
`

const Sub_Container = styled(View)`
    margin-top: 16px;
    width: 100%;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    z-index: 20;
`

const Letter_Text = styled(Text)`
    margin-left: 8px;
    font-family: 'Cafe24Simplehae';
    font-size: 12px;
    color: white;
`

export default Receive_Collect_Box;