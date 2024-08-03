import { useLayoutEffect } from "react";

const Main_letter_Splash = (props) => {
    const {navigation, route} = props;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            title: '편지・이야기',
            tabBarStyle: { display: 'none'}
        })
    })

    
    navigation.reset({
        index: 0,
        routes: [{ name: "Main_Letter_Choice" }],
    })

    return ( <></> )
}

export default Main_letter_Splash;