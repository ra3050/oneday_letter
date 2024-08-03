import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";

/**
 * 스토리지에 업로드할 정보를 ImagePicker를 통해 가져온 asset을 전달 받습니다
 */
export const upload_storage = (props) => {
    const { lt_idx, pathArr } = props;      // 이미지 파일 asset을 전달받는다

    pathArr.assets.map(async(item, index) => {
        const reference = storage().ref(`/${lt_idx}/${index}`);
        
        if (Platform.OS === 'android') { // Android
            await reference.putString(item.base64, "base64", {
                contentType: item.type
            })
        } else { // iOS
            await reference.putFile(item.uri);
        }
    })

}

