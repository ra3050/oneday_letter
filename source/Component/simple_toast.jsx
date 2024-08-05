import { useRef, useCallback } from 'react';
import { Dimensions, View } from 'react-native';
import Toast from 'react-native-easy-toast';

/**
 * style값을 유일하게 받습니다
 * style이 없을 경우 {backgroundColor: '#537BCC'} 입니다
 * toastRef: toast를 show하기 위한 ref값, 부모에서 전달해줌
 * @param {*} props
 * @returns
 */
const Simple_Toast = props => {
  const { style, toastRef } = props;
  const windowHeight = Dimensions.get('window').height;

  const showCopyToast = useCallback(() => {
    toastRef.current.show('주소가 복사되었습니다.');
  }, []);

  return (
    <View>
      <Toast
        ref={toastRef}
        positionValue={Math.round(windowHeight * 0.85)}
        fadeInDuration={250}
        fadeOutDuration={1000}
        style={style ? style : { backgroundColor: '#537BCC' }}
      />
    </View>
  );
};

export default Simple_Toast;
