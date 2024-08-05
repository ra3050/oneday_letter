import { useLayoutEffect } from 'react';

const Main_Write_Splash = props => {
  const { navigation, route } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarStyle: { display: 'none' },
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main_Letter_Write' }],
    });
  });
  return <></>;
};

export default Main_Write_Splash;
