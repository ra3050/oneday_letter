import notifee, { AndroidImportance, AndroidColor } from '@notifee/react-native';

const displayNotification = async message => {
  console.log('메세지 잘 들어왔어요', message);
  const channelId = await notifee.createChannel({
    id: 'default',
    name: '카테고리 이름', // 알림의 종류를 나타낸다
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: message?.data?.title,
    body: message?.data?.body,
    android: {
      channelId,
    },
  });
};

export default {
  displayNoti: remoteMessage => displayNotification(remoteMessage),
};
