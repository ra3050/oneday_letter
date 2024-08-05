import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Dimensions, FlatList, View } from 'react-native';
import Letter_box from '../../../Component/letter_box';

const screenWidth = Math.round(Dimensions.get('window').width);

const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Carousel = props => {
  const { letterInfo, onPaging } = props;
  const pageWidth = Math.round(screenWidth * (1080 / 1440)); //screenWidth - (16 + 36) * 2
  const gap = 16;
  const offset = (screenWidth - pageWidth - gap * 2) / 2;
  const pages = letterInfo;

  const [page, setPage] = useState(0);

  const onScroll = e => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    onPaging(newPage);
  };

  const renderitem = ({ item }) => {
    return (
      <Letter_box
        item={item}
        style={{
          width: pageWidth,
          marginHorizontal: gap / 2,
          backgroundColor: 'red',
        }}
      />
    );
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={item => item.id}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderitem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default Carousel;
