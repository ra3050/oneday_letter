import { PermissionsAndroid, Platform } from "react-native";

const hasAndroidPermission = async () => {
    //외부 스토리지를 읽고 쓰는 권한 가져오기
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    };

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
};

/**
 * 안드로이드의 카메라, 앨범 접근 권한을 요청합니다
 * 해당 함수를 UseEffect에 호출하여 사용합니다
 * @returns 
 */
export const getPhotoWithPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
    };
};
