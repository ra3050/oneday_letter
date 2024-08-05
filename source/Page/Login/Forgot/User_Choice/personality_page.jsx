import { useLayoutEffect, useRef, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { styled } from 'styled-components';
import Personality from '../../../../Component/personality';
import Icon from 'react-native-vector-icons/Octicons';
import { req_signCategory } from '../../../../utils/requestApi';
import { get_usreIdx, set_userIdx } from '../../../../Controller/Storage';
import Toast from 'react-native-easy-toast';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Personality_Page = props => {
  const { navigation, route } = props;
  const signup = route.params?.signup;
  const category = route.params?.category;
  const mb_idx = route.params?.mb_idx;
  const [personality, setPersonality] = useState(category.split(','));
  const [click, setClick] = useState([]);
  const toastRef = useRef();

  console.log('personality: params:', personality);

  const signCategory = () => {
    if (click.length !== 3) {
      toastRef.current.show('성격 3개를 선택해주세요');
    } else {
      const current = personality.sort();
      const sCurrent = current.join(',');

      const newCategory = sCurrent;

      console.log(newCategory);

      get_usreIdx(data => {
        req_signCategory(
          { mb_idx: signup ? mb_idx : data, new_category: newCategory },
          data => {
            if (data?.result) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Tab_Screen' }],
              });
            } else {
              console.log('error');
            }
          },
        );
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
      title: '',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'Cafe24Simplehae' },
      headerRight: () => (
        <TouchableOpacity onPress={() => signCategory()}>
          <Icon name="check" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
      title: '',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'Cafe24Simplehae' },
      headerRight: () => (
        <TouchableOpacity onPress={() => signCategory()}>
          <Icon name="check" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [personality]);

  return (
    <Wrapper>
      <Wrapper_Safe>
        <Title_Container>
          <Title>
            {'난 '}
            <Title_Sub>이런 사람</Title_Sub>
            {'이야'}
          </Title>
          <Title_Button_Container>
            <Title_Button>
              <Title_Button_Text>{click[0] ? click[0] : ''}</Title_Button_Text>
            </Title_Button>
            <Title_Button>
              <Title_Button_Text>{click[1] ? click[1] : ''}</Title_Button_Text>
            </Title_Button>
            <Title_Button>
              <Title_Button_Text>{click[2] ? click[2] : ''}</Title_Button_Text>
            </Title_Button>
          </Title_Button_Container>
          <Line_View width={screenWidth} />
          <Descrypt>{'나의 성격을 선택해주세요'}</Descrypt>
        </Title_Container>
        <Personality
          personality={personality}
          setPersonality={setPersonality}
          click={click}
          setClick={setClick}
          style={{ width: screenWidth, height: Math.round(screenHeight * 0.6) }}
        />
      </Wrapper_Safe>
      <Toast
        ref={toastRef}
        positionValue={screenHeight * 0.35}
        fadeInDuration={200}
        fadeOutDuration={1000}
        style={{ backgroundColor: '#537BCC' }}
      />
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  flex: 1;

  background-color: white;
`;

const Wrapper_Safe = styled(SafeAreaView)`
  flex: 1;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Title_Container = styled(View)`
  width: 100%;
  height: 25%;

  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const Title = styled(Text)`
  margin-left: 16px;
  font-family: 'Cafe24Simplehae';

  font-size: 24px;
  font-weight: bold;
`;

const Title_Sub = styled(Text)`
  font-family: 'Cafe24Simplehae';

  font-size: 24px;
  font-weight: bold;
`;

const Title_Button_Container = styled(View)`
  padding: 0 8px;
  width: 100%;
  height: 30%;

  flex-direction: row;
  align-items: center;
  /* flex-wrap: wrap; */
`;

const Title_Button = styled(Pressable)`
  flex: 1;
  height: 60%;
  margin: 0 8px;

  border-radius: 12px;
  border-color: #5563a8;
  border-width: 0.5px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title_Button_Text = styled(Text)`
  font-family: 'Cafe24Simplehae';

  font-size: 12px;
  font-weight: normal;

  align-self: center;
`;

const Descrypt = styled(Text)`
  top: 8px;
  left: 16px;
  font-family: 'Cafe24Simplehae';

  font-size: 20px;
  font-weight: normal;
  /* font-style: oblique; */
`;
const Line_View = styled(View)`
  width: ${props => props.width - 32}px;
  margin: 0 16px;
  height: 1px;
  border-color: gray;
  border-width: 1px;
  opacity: 0.35;
  align-self: flex-end;
`;

export default Personality_Page;
