import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { TOGGLE_LIKE } from "./Post";
import { useMutation} from "react-apollo-hooks";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles";


const Touchable = styled.TouchableOpacity``;

const IconContainer = styled.View`
  margin-right: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App({ isLikedProp, likeCountProp, id, user, likes }) {
  console.log(id);
  const [expoPushToken, setExpoPushToken] = useState(id);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);

  const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });
  const handleLike = async () => {
    await sendPushNotification(expoPushToken, user, isLiked, likes);
    if (isLiked === true) {
      setLikeCount(l => l - 1);
    } else {
      setLikeCount(l => l + 1);
    }
    setIsLiked(p => !p);
    try {
      await toggleLikeMutaton();
      
    } catch (e) { }
  };

  useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // 이 수신기는 앱이 포그라운드되는 동안 알림이 수신될 때마다 발생합니다.
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // 이 수신기는 사용자가 알림을 누르거나 알림과 상호 작용할 때마다 발생합니다(앱이 포그라운드, 백그라운드 또는 사망 시 작동).
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Touchable onPress={handleLike}>
            <IconContainer>
              <AntDesign
                size={24}
                color={isLiked ? styles.starColor : styles.blackColor}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "star"
                      : "staro"
                    : isLiked
                    ? "star"
                    : "staro"
                }
              />
      </IconContainer>
        <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
    </Touchable>
    
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken, user, isLiked, likes) {
  console.log('여기는 유저',user.fullName, user.username);
  if (isLiked === false) {
    for (var i = 0; i < likes.length; i++)
      if (user.username === likes[i].post.user.username) {
      const message = [{
      to: expoPushToken,
      sound: 'default',
      title: '좋아요 알림!',
      body: `${user.username} 님의 게시물에 좋아요를 눌렀습니다.`,
      data: { someData: 'goes here' }
      },
      {
      to: "ExponentPushToken[dVZ3vyD4JiIAkloOtxsEAF]",
      sound: 'default',
      title: '좋아요 알림 !',
      body: `${user.username} 님의 게시물에 좋아요를 눌렀습니다.`,
      data: {someData: 'goes here'}
      },
      {
      to: "ExponentPushToken[TgS29NGcohtTlT3INH1-lp]",
      sound: 'default',
      title: '좋아요 알림 !',
      body: `${user.username} 님의 게시물에 좋아요를 눌렀습니다.`,
      data: {someData: 'goes here'}
      }
      ];

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  
    }
  

  } else {
      const unlike = {
        to: expoPushToken,
        sound: 'default',
        title: '좋아요 취소알림!',
        body: `${user.username} 님의 게시물에 좋아요를 취소 했습니다.`,
        data: { someData: 'goes here' },
      };


      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unlike),
      });
  }

}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Push 알림에 대한 Push Token을 가져오지 못했습니다.!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
