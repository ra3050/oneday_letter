import messaging from "@react-native-firebase/messaging";
/**
 * firebase에서는 앱을 3가지 상태로 나누어서 구분을 한다
 * Foreground, Background, quit
 */

//Background, quit 상태에서 메세지 처리
messaging().setBackgroundMessageHandler(async messaging => {
    console.log(messaging)
})
