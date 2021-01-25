import { createStackNavigator } from 'react-navigation-stack';
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import styles from "../styles";

export default createStackNavigator({
      Messages: {
        screen: Messages,
        navigationOptions: {
            headerTintColor: styles.blackColor,
            headerBackTitle: " ",
            title: "Messages"
        }
    },
        Message: {
        screen: Message,
        navigationOptions: {
            headerTintColor: styles.blackColor,
            headerBackTitle: " ",
            title: "Message"
        }
    },
});