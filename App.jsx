/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Login_email_page from './source/Page/Login/login_email_page';
import Email_sign_Page from './source/Page/Login/email_sign_page';
import Forgot_email_page from './source/Page/Login/Forgot/forgot_email_page';
import Forgot_password_page from './source/Page/Login/Forgot/forgot_password_page';
import Authentication_email_page from './source/Page/Login/Forgot/authentication_email_page';
import Authentication_password_page from './source/Page/Login/Forgot/authentication_password_page';
import Change_password_page from './source/Page/Login/Forgot/change_password_page';
import Main_Page from './source/Page/Main/Main_Home/main_page';
import Login_page from './source/Page/Login/login_page';
import Main_Letter_Page from './source/Page/Main/Main_Letter/Letter_Choice/main_letter_page';
import Main_letter_Splash from './source/Page/Main/Main_Letter/Letter_Choice/letter_splash';
import Main_Letter_List_Page from './source/Page/Main/Main_Letter/Letter_List/main_letter_list_page';
import Main_Write_Page from './source/Page/Main/Main_Write/main_write_page';
import Main_Write_Splash from './source/Page/Main/Main_Write/main_write_splash';
import Main_Setting_Page from './source/Page/Main/Main_Setting/main_setting_page';
import Interest_Page from './source/Page/Login/Forgot/User_Choice/interest_page';
import Personality_Page from './source/Page/Login/Forgot/User_Choice/personality_page';
import Setting_Page from './source/Page/Main/Main_Setting/Setting_Page/setting_page';
import Setting_Interest_Page from './source/Page/Main/Main_Setting/Setting_Page/setting_interest_page';
import Setting_Personality_Page from './source/Page/Main/Main_Setting/Setting_Page/setting_personality_page';
import Setting_Send_Page from './source/Page/Main/Main_Setting/Setting_Letter/sender/setting_send_page';
import Setting_Receive_Page from './source/Page/Main/Main_Setting/Setting_Letter/receiver/setting_receive_page';
import Letter_Content_Page from './source/Page/Letter_Content/letter_content_page';
import Letter_Receive_Page from './source/Page/Main/Letter_Receive/letter_receive_page';
import Letter_Exchange_Content_page from './source/Page/Letter_Exchange_Content/letter_ex_content_page';

import Icons from "react-native-vector-icons/MaterialIcons"
import Icons3 from "react-native-vector-icons/FontAwesome"
import Icons4 from "react-native-vector-icons/Feather"
import Icons5 from "react-native-vector-icons/MaterialCommunityIcons"
import Letter_Exchange_Page from './source/Page/Main/Letter_Exchange/letter_exchange_page';
import Main_Receive_Collect_Page from './source/Page/Main/Main_Receive_Collect/main_receive_collect_page';

// import "./source/Controller/notification"
import messaging from "@react-native-firebase/messaging"
import pushNoti from './source/utils/pushNoti';
import Letter_Ba_Content_Page from './source/Page/Letter_Boast_Content/letter_ba_content_page';
import Social_Sign_Page from './source/Page/Login/social_sign_page';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = (props) => {
  const [fcmToken, setFcmToken] = useState('');
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide();
      console.log('스플레시 화면')
    },1500)
  },[])
  // useEffect(() => {
  //   requestUserPermission();
  // })

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(remoteMessage)
  //     pushNoti.displayNoti(remoteMessage);
  //   })

  //   return unsubscribe;
  // }, [])

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
      }
    }
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    if (enabled) {
      return getToken();
    }
  }
  
  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('디바이스 토큰값');
    console.log(fcmToken);
    setFcmToken(fcmToken);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Login_page} options={{ headerShown: false, headerTitleAlign: 'center' }} />
        <Stack.Screen name='Login_Email' component={Login_email_page} options={{ headerBackTitleVisible: false, title: '', headerShadowVisible: false}} />
        <Stack.Screen name='Login_Email_Sign' component={Email_sign_Page} />
        <Stack.Screen name='Login_Forgot_Eamil' component={Forgot_email_page} />
        <Stack.Screen name='Login_Forgot_Password' component={Forgot_password_page} />
        <Stack.Screen name='Login_Authentication_Email' component={Authentication_email_page} />
        <Stack.Screen name='Login_Authentication_Password' component={Authentication_password_page} />
        <Stack.Screen name='Login_Change_Password' component={Change_password_page} />
        <Stack.Screen name='Login_Find_Email' component={Change_password_page} />
        <Stack.Screen name='Login_Interest_Choice' component={Interest_Page}/>
        <Stack.Screen name='Login_Personality_Choice' component={Personality_Page}/>
        <Stack.Screen name='Login_Social_Sign' component={Social_Sign_Page} />
        
        <Stack.Screen name='Tab_Screen' component={MainTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name='Main_Letter_Choice' component={Main_Letter_Page} />
        <Stack.Screen name='Main_Letter_List' component={Main_Letter_List_Page}/>
        <Stack.Screen name='Main_Letter_Write' component={Main_Write_Page}/>
        <Stack.Screen name='Setting' component={Setting_Page} />
        <Stack.Screen name='Setting_Interest' component={Setting_Interest_Page} />
        <Stack.Screen name='Setting_Personality' component={Setting_Personality_Page} />
        <Stack.Screen name='Setting_Send' component={Setting_Send_Page}/>
        <Stack.Screen name='Setting_Receive' component={Setting_Receive_Page}/>
        <Stack.Screen name='Main_Letter_Content' component={Letter_Content_Page}/>
        <Stack.Screen name='Main_Letter_Receive' component={Letter_Receive_Page} />
        <Stack.Screen name='Main_Letter_Exchange' component={Letter_Exchange_Page}/>
        <Stack.Screen name='Main_Letter_Exchange_Content' component={Letter_Exchange_Content_page} />
        <Stack.Screen name='Main_Letter_Boast_Content' component={Letter_Ba_Content_Page} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Main'>
      <Tab.Screen name='Main' component={Main_Page} options={{
        tabBarIcon: ({focused}) => <Icons name="home" size={25} color={focused ? `#537BCC` : '#dfdfdf'}/>,
      }}/>
      <Tab.Screen name='Main_Letter' component={Main_letter_Splash} options={{ 
        title: '편지・이야기',
        tabBarStyle: { display: 'none'},
        tabBarIcon: ({focused}) => <Icons5 name='email-newsletter' size={22} color={focused ? `#537BCC` : '#dfdfdf'}/>
      }}/>
      <Tab.Screen name='Main_Write' component={Main_Write_Splash} options={{ 
        title: '글쓰기',
        tabBarStyle: { display: 'none'},
        tabBarIcon: ({focused}) => <Icons3 name='send' size={20} color={focused ? `#537BCC` : '#dfdfdf'}/>
      }}/>
      <Tab.Screen name='Main_Collect' component={Main_Receive_Collect_Page} options={{ 
        title: '다른이야기',
        tabBarIcon: ({focused}) => <Icons name='collections-bookmark' size={20} color={focused ? `#537BCC` : '#dfdfdf'}/>
      }}
      />
      <Tab.Screen name='Tab_My_Info' component={Main_Setting_Page} options={{
        title: 'MY',
        tabBarIcon: ({focused}) => <Icons4 name='user' size={20} color={focused ? `#537BCC` : '#dfdfdf'}/>
      }}/>
    </Tab.Navigator>
  )
}

export default App;
