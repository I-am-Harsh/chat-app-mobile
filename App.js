import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Components/MainComponent';


// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={navigation.openDrawer}
//         title="Open navigation drawer"
//       />
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={navigation.openDrawer}
//         title="Open navigation drawer"
//       />
//       <Button
//         onPress={() => navigation.goBack()}
//         title="Go back home"
//       />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator> */}
      <Main/>
    </NavigationContainer>
  );
}