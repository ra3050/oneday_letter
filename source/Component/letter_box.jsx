/**
 * 편지 기본 정보를 화면에 출력하는 역할
 * 편지 정보를 JSON형태로 받습니다.
 */

import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { styled } from 'styled-components/native';
import Icons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import bgImage from '../../resource/Letter/bg-diary-6-thumbnail.png';
import { getTemplateImage } from '../Page/Main/Main_Write/main_write_page';

const Letter_box = props => {
  const { item, style } = props;
  const width = style.width;
  const marginHorizontal = style.marginHorizontal;
  const currencyTag = make_Tag(item.keywords);
  const title = item.content;
  const bg_idx = item.bg_idx;
  const modifyDate = moment(item.created_date_time).format('YYYY.MM.DD');
  const navigation = useNavigation();

  return (
    <Wrapper
      width={width}
      marginHorizontal={marginHorizontal}
      onPress={() => navigation.navigate('Main_Letter_Content', item)}>
      <Bg_Image source={getTemplateImage(bg_idx)} />
      <Letter_Tag numberOfLines={2}>{currencyTag}</Letter_Tag>
      <Letter_Title numberOfLines={1}>{title.replace('\n', ' ')}</Letter_Title>
      <Letter_Bottom_Box>
        <Letter_Date>{modifyDate}</Letter_Date>
        <Icons name="arrowright" size={16} color="white" position="relative" />
      </Letter_Bottom_Box>
    </Wrapper>
  );
};

const make_Tag = tag => {
  if (!tag) {
    return '';
  }

  const arrTag = tag.split(', ');
  var newTag = '';
  arrTag.forEach(element => {
    newTag = newTag + '#' + element + ' ';
  });
  return newTag;
};

const Wrapper = styled(Pressable)`
  height: 100%;
  width: ${props => props.width}px;
  margin-left: ${props => props.marginHorizontal}px;
  margin-right: ${props => props.marginHorizontal}px;
  border-radius: 16px;

  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  align-self: center;
`;

const Bg_Image = styled(Image)`
  width: 100%;
  height: 100%;

  object-fit: contain;

  position: absolute;
  z-index: 10;
`;

const Letter_Tag = styled(Text)`
  width: ${100 - 2 * ((88 / 1440) * 100)}%;
  margin-top: ${(88 / 1440) * 100}%;
  margin-left: ${(88 / 1440) * 100}%;

  position: relative;
  flex-wrap: wrap;
  font-family: 'Cafe24Simplehae';
  font-size: 12px;
  z-index: 20;
`;

const Letter_Title = styled(Text)`
  width: 85%;

  align-self: center;

  position: relative;
  font-family: 'Cafe24Simplehae';
  font-size: 16px;
  text-align: center;
  z-index: 20;
`;

const Letter_Bottom_Box = styled(View)`
  width: ${100 - 2 * ((88 / 1440) * 100)}%;
  margin-left: ${(88 / 1440) * 100}%;
  margin-bottom: ${(88 / 1440) * 100}%;

  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
`;

const Letter_Date = styled(Text)`
  font-family: 'Cafe24Simplehae';
  font-size: 12px;
`;

export default Letter_box;
