import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import { colors, fonts } from "../constants"

const Profiles = ({ profiles }) => {
    return (
        <View style={styles.container}>
            {profiles.map((item, index) => {
                if (index <= 2) {
                    return (
                        <View
                            key={`profiles-${index}`}
                            style={{ marginLeft: -8 }}
                        >
                            <Image
                                source={item.picture}
                                resizeMode="cover"
                                style={styles.profileImage}
                            />
                        </View>
                    )
                }
            })}

            <Text style={{ marginLeft: 8, color: colors.white, ...fonts.h4 }}>+{profiles.length - 3}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        borderWidth: 0.1,
        borderColor: colors.black
    }
})

export default Profiles;