import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Back_Button = props => {
  const { path, style } = props;
  const navigation = useNavigation();

  const onPress = e => {
    navigation.reset({
      index: 0,
      routes: [{ name: path }],
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon name="keyboard-arrow-left" size={36} color="white" />
    </TouchableOpacity>
  );
};

export default Back_Button;
