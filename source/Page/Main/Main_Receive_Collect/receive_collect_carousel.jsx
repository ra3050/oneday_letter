import { styled } from 'styled-components';
import { Dimensions, FlatList, View } from 'react-native';
import Receive_Collect_Box from './receive_collect_box';

const screenWidth = Math.round(Dimensions.get('window').width);

const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Receive_Collect_Carousel = props => {
  const { letterInfo, onPaging } = props;
  const pageWidth = Math.round(screenWidth - 32);
  const gap = 16;
  const pages = letterInfo;

  const onScroll = e => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap * 2),
    );
    onPaging(newPage);
  };

  const renderitem = ({ item }) => {
    return (
      < Receive_Collect_Box
        item={item}
        style={{ width: pageWidth, height: pageWidth, margin: gap / 2 }
        }
        special={true}
      />
    );
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: gap / 2,
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

export default Receive_Collect_Carousel;
