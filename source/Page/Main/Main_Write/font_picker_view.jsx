import { useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Font_Picker_View = props => {
  const { style, state, setState } = props;
  const pickerRef = useRef();

  return (
    <View style={styles.Wrapper}>
      <Picker
        ref={pickerRef}
        selectedValue={state.font}
        style={style}
        // useNativeAndroidPickerStyle={false}
        // mode='dropdown'
        onValueChange={(value, index) => {
          console.log(value);
          setState({
            hidden: !state.hidden,
            font: value,
          });
        }}>
        <Picker.Item label="기본" value="default" />
        <Picker.Item label="네이버나눔바탕" value="a" />
        <Picker.Item label="네이버나눔고딕" value="b" />
        <Picker.Item label="네이버나눔명조" value="c" />
        <Picker.Item label="카페24심플해" value="d" />
        <Picker.Item label="경기바탕채" value="e" />
        <Picker.Item label="나눔스웨어" value="f" />
        <Picker.Item label="네이버클로바" value="g" />
        <Picker.Item label="나눔손글씨" value="h" />
        <Picker.Item label="트러블" value="i" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default Font_Picker_View;
