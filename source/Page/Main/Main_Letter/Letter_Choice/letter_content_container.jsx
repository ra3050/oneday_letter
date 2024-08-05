import { styled } from 'styled-components/native';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Letter_Content = props => {
  const { item, info, style } = props;
  const width = style.width;
  const marginHorizontal = style.marginHorizontal;
  const title = item.title;
  const descrypt = item.descrypt;
  const navigation = useNavigation();

  const imgSource = imgValue => {
    switch (imgValue) {
      case 1:
        return require('../../../../../resource/Main/Main_Letter/Ic_normal_same.png');
      case 2:
        return require('../../../../../resource/Main/Main_Letter/Ic_normal_similar.png');
      case 3:
        return require('../../../../../resource/Main/Main_Letter/Ic_normal_none.png');
      case 4:
        return require('../../../../../resource/Main/Main_Letter/Ic_sub_same.png');
      case 5:
        return require('../../../../../resource/Main/Main_Letter/Ic_sub_similar.png');
      case 6:
        return require('../../../../../resource/Main/Main_Letter/Ic_sub_none.png');
      default:
        return require('../../../../../resource/Main/Main_Letter/Ic_normal_similar.png');
    }
  };

  return (
    <Wrapper
      width={width}
      marginHorizontal={marginHorizontal}
      onPress={() =>
        navigation.navigate('Main_Letter_List', { item: item, info: info })
      }>
      <Logo source={imgSource(item.imgValue)} />
      <Title>{title}</Title>
      <Descryption>{descrypt}</Descryption>
    </Wrapper>
  );
};

const Wrapper = styled(TouchableOpacity)`
  width: ${props => props.width}px;
  height: 100%;
  margin-left: ${props => props.marginHorizontal}px;
  margin-right: ${props => props.marginHorizontal}px;
  border-radius: 32px;

  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  align-self: center;

  background-color: white;

  ${Platform.OS === 'ios'
    ? `shadow-color: black;
        shadow-offset: 0px 2px;
        shadow-opacity: 0.3;
        shadow-radius: 4px;`
    : `elevation: 5;`}
`;

const Logo = styled(Image)`
  width: 60%;
  height: 60%;

  object-fit: cover;
`;

const Title = styled(Text)`
  width: 100%;

  font-family: 'Cafe24Simplehae';
  font-size: 24px;
  font-weight: bold;

  text-align: center;
  color: #294980;
`;

const Descryption = styled(Text)`
  width: 100%;

  font-family: 'Cafe24Simplehae';
  font-size: 18px;

  text-align: center;
  color: black;
`;

export default Letter_Content;
