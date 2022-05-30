import React from 'react';
import { useFonts } from 'expo-font';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";
import { Cinemas, ContinueWatching, Films, Nearby, Profile, Series, VideoPlayer } from "./screens";

const Stack = createStackNavigator();

const App = () => {

    const [loaded] = useFonts({
        "MuseoSansRounded1000" : require('./assets/fonts/MuseoSansRounded1000.otf'),
        "MuseoSansRounded900" : require('./assets/fonts/MuseoSansRounded900.otf'),
        "MuseoSansRounded700" : require('./assets/fonts/MuseoSansRounded700.otf'),
        "MuseoSansRounded500" : require('./assets/fonts/MuseoSansRounded500.otf'),
        "MuseoSansRounded300" : require('./assets/fonts/MuseoSansRounded300.otf')
    })
    
    if(!loaded){
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={ 'Home' }
                mode="modal"
            >
                <Stack.Screen
                    name="Home"
                    component={ Tabs }
                />
                <Stack.Screen
                    name="Cinemas"
                    component={ Cinemas }
                />
                <Stack.Screen
                    name="Continue Watching"
                    component={ ContinueWatching }
                />
                <Stack.Screen
                    name="Films"
                    component={ Films }
                />
                <Stack.Screen
                    name="Nearby"
                    component={ Nearby }
                />
                <Stack.Screen
                    name="Profile"
                    component={ Profile }
                />
                <Stack.Screen
                    name="Series"
                    component={ Series }
                />
                <Stack.Screen
                    name="Video Player"
                    component={ VideoPlayer }
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;