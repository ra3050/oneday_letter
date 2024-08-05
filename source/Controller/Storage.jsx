import AsyncStorage from '@react-native-async-storage/async-storage';

export const set_userIdx = async mb_idx => {
  try {
    await AsyncStorage.setItem('userID', mb_idx);
    return true;
  } catch (error) {
    console.log('mb_idx 저장 실패');
    return false;
  }
};

/**
 * callback을 통해 데이터를 전달받아 사용합니다
 * @param {*} callback
 */
export const get_usreIdx = async callback => {
  try {
    const value = await AsyncStorage.getItem('userID');

    callback(value);
  } catch (error) {
    console.log('mb_idx 불러오기 실패');
    callback(false);
  }
};
