/**
 * 편지 기본 정보를 화면에 출력하는 역할
 * 편지 정보를 JSON형태로 받습니다.
 */

import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { styled } from 'styled-components/native';
import Icons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import bgImage from '../../../../resource/Letter/bg-diary-6-thumbnail.png';
import { useNavigation } from '@react-navigation/native';
import { getTemplateImage } from '../Main_Write/main_write_page';

const Main_Setting_Letter_Box = props => {
  const { item, style } = props;
  const width = style.width;
  const height = style.height;
  const margin = style.margin;
  const title = item.content;
  const bg_idx = item.bg_idx;
  const modifyDate = moment(item.created_date_time).format('YYYY.MM.DD');
  const navigation = useNavigation();

  const handlePress = () => {
    const letterInfo = item;
    navigation.navigate('Main_Letter_Content', letterInfo);
  };

  return (
    <Wrapper
      width={width}
      height={height}
      margin={margin}
      onPress={() => handlePress()}>
      <Bg_Image source={getTemplateImage(bg_idx)} />
      <Letter_Title numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Letter_Title>
      <Letter_Date>{modifyDate}</Letter_Date>
    </Wrapper>
  );
};

const Wrapper = styled(Pressable)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin: ${props => props.margin}px;
  border-radius: 4px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  align-self: center;
`;

const Bg_Image = styled(Image)`
  width: 100%;
  height: 100%;

  object-fit: contain;

  position: absolute;
  z-index: 10;
`;

const Letter_Title = styled(Text)`
  width: 75%;

  align-self: center;

  position: relative;
  font-family: 'Cafe24Simplehae';
  font-size: 16px;
  text-align: center;

  color: white;

  z-index: 20;
`;

const Letter_Date = styled(Text)`
  top: 16px;
  font-family: 'Cafe24Simplehae';
  font-size: 12px;

  position: relative;

  color: white;

  z-index: 20;
`;

export default Main_Setting_Letter_Box;
