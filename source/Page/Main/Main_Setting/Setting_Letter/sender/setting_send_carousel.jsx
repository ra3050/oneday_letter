import { styled } from 'styled-components';
import { View, FlatList, Dimensions, Platform, Text } from 'react-native';
import Setting_Send_Box from './setting_send_box';
import Back_Button from '../../../../../Component/back_button';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

/**
 * 내가 보낸 편지 리스트를 letterInfo로 받습니다
 * @param {letterInfo} props
 * @returns
 */
const Setting_Send_Carousel = props => {
  const { letterInfo } = props;
  const gap = 16;

  const renderItem = ({ item, index }) => {
    return (
      <>
        {index == 0 ? (
          <>
            <Header_Container width={screenWidth} key={index}>
              <Setting_Send_Box
                item={item}
                style={{ height: screenWidth, marginVertical: gap }}
              />
            </Header_Container>
          </>
        ) : (
          <Setting_Send_Box
            item={item}
            style={{ height: screenWidth, marginVertical: gap }}
            key={index}
          />
        )}
      </>
    );
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={letterInfo}
        contentContainerStyle={{
          width: screenWidth,
        }}
        decelerationRate="fast"
        keyExtractor={item => item.id}
        renderItem={renderItem}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: ${Platform.OS === 'ios' ? 100 : 100}%;

  justify-content: center;
  align-items: center;
`;

const Header_Container = styled(View)`
  width: ${props => props.width}px;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export default Setting_Send_Carousel;
