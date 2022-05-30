import React from 'react';
import { View } from 'react-native';

import { colors } from "../constants"

const ProgressBar = ({ containerStyle, barStyle, barPercentage }) => {
    return (
        <View style={{ ...containerStyle }}>
            <View
                style={{
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    position: 'absolute',
                    marginTop: 10,
                    backgroundColor: colors.darkgray,
                    ...barStyle
                }}
            />

            <View
                style={{
                    left: 0,
                    bottom: 0,
                    width: barPercentage,
                    position: 'absolute',
                    marginTop: 10,
                    backgroundColor: colors.red,
                    ...barStyle
                }}
            />
        </View>
    )
}

export default ProgressBar;