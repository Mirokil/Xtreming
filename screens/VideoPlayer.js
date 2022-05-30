import React from 'react';
import {
    View,
    Image,
    Modal,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { Video } from 'expo-av';

import { icons, colors } from "../constants"

const VideoPlayer = ({ route, navigation }) => {

    const video = React.useRef(null);
    const [ videoLink, setVideoLink ] = React.useState(null)

    React.useEffect(() => {
        let { videoLink } = route.params;
        setVideoLink(videoLink)
    }, [])

    function renderCloseButton() {
        return (
            <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.darkgray
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.close}
                    resizeMode="contain"
                    style={{
                        width: 16,
                        height: 16,
                        tintColor: colors.red
                    }}
                />
            </TouchableOpacity>
        )
    }

    function renderVideoPlayer() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <Video
                    ref={video}
                    style={{
                        height: 300,
                        width: '100%'
                    }}
                    source={{ uri: videoLink }}
                    useNativeControls="true"
                    resizeMode="contain"
                    shouldPlay="true"
                />
            </View>
        )
    }

    return (
        <Modal animationType="none">
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: colors.black
                }}
            >
                {renderCloseButton()}
                {renderVideoPlayer()}
            </SafeAreaView>
        </Modal>
    )
}

export default VideoPlayer;