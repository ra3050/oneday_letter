import { Keyboard, KeyboardEvent } from "react-native";

export const KeyboardWillShowAndHideCallbackHeight = (callback) => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        (event) => {
            callback(event.endCoordinates.height, keyboardDidShowListener)
        }
    )

    const KeyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        (event) => {
            callback(0, KeyboardDidHideListener);
        }
    )
}