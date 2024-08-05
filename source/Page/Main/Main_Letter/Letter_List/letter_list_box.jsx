/**
 * 편지 리스트 컴포넌트
 */
import { useState, useLayoutEffect } from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { styled } from 'styled-components/native';
import moment from 'moment';
import bgImage from '../../../../../resource/Letter/bg-diary-1-thumbnail.png';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getTemplateImage } from '../../Main_Write/main_write_page';

const Letter_List_Box = props => {
  const { item, style } = props;
  const height = style.height;

  const marginVertical = style.marginVertical;
  const currencyTagView = make_Tag(item.keywords);
  const title = item.content;
  const modifyDate = moment(item.created_date_time).format('YYYY.MM.DD');
  const like_cnt = item.like_cnt;
  const receive_lt_cnt = item.receive_lt_cnt;
  const bg_idx = item.bg_idx;
  const navigation = useNavigation();

  return (
    <Wrapper
      height={height}
      marginVertical={marginVertical}
      onPress={() => navigation.navigate('Main_Letter_Content', item)}>
      <Bg_Image source={getTemplateImage(bg_idx)} />
      <Letter_Title numberOfLines={1}>{title}</Letter_Title>
      <Sub_Container>
        <View style={styles.nowrap}>
          <Icon name="heart" size={16} color="white" />
          <Letter_Text>{like_cnt}</Letter_Text>
        </View>
        <View style={styles.nowrap}>
          <Icon2 name="email-open-outline" size={16} color="white" />
          <Letter_Text>{receive_lt_cnt}</Letter_Text>
        </View>
        <View style={[styles.nowrap, { marginRight: 0 }]}>
          <Icon name="clock" size={16} color="white" />
          <Letter_Text>{modifyDate}</Letter_Text>
        </View>
      </Sub_Container>
      <KeyWord_Container>{currencyTagView}</KeyWord_Container>
    </Wrapper>
  );
};

const make_Tag = tag => {
  if (!tag) return '';

  const arrTag = tag.split(', ');
  var newTag = [];
  arrTag.forEach((element, index) => {
    if (index !== arrTag.length - 1) {
      newTag.push(
        <View style={styles.textBorder}>
          <Letter_Tag>{'#' + element}</Letter_Tag>
        </View>,
      );
    } else {
      newTag.push(
        <View style={[styles.textBorder, { marginRight: 0 }]}>
          <Letter_Tag>{'#' + element}</Letter_Tag>
        </View>,
      );
    }
  });
  return newTag;
};

const Wrapper = styled(Pressable)`
  width: ${props => props.height - 16}px;
  height: ${props => (props.height * 3) / 4 - 16}px;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 8px;
  margin-right: 8px;

  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: center;
`;

const Bg_Image = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 16px;

  object-fit: cover;

  position: absolute;
`;

const Letter_Title = styled(Text)`
  width: 85%;
  margin-bottom: 16px;

  align-self: center;

  text-align: center;
  font-family: 'Cafe24Simplehae';
  font-size: 18px;
  color: white;

  z-index: 20;
`;

const Sub_Container = styled(View)`
  width: 100%;
  height: 24px;
  margin-bottom: 8px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const KeyWord_Container = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Letter_Text = styled(Text)`
  margin-left: 8px;
  font-family: 'Cafe24Simplehae';
  font-size: 12px;
  color: white;
`;

const Letter_Tag = styled(Text)`
  padding: 4px;

  flex-wrap: wrap;
  font-family: 'Cafe24Simplehae';
  font-size: 12px;
  color: white;
`;

const styles = StyleSheet.create({
  nowrap: {
    flexDirection: 'row',
    marginRight: 16,
  },
  textBorder: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 16,
  },
});
export default Letter_List_Box;
