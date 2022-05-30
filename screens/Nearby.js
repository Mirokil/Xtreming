import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { data, icons, colors, fonts } from '../constants';

const Nearby = ({ navigation }) => {

    function renderMaps() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: '100%' }}
                customMapStyle={ data.mapDarkStyle }
                region={{
                    latitude: 51.485562,
                    longitude: -0.173160,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5
                }}
            >
                <Marker coordinate={{ latitude: 51.519619, longitude: -0.084609 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={icons.marker}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgb(255,0,0)'
                            }}
                        />
                        <Text style={{ ...fonts.h4, fontSize: 11, lineHeight: 11, color: colors.white, marginTop: 5 }}>Broadgate</Text>
                    </View>
                </Marker>

                <Marker coordinate={{ latitude: 51.485562, longitude: -0.173160 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={icons.marker}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgb(255,0,0)'
                            }}
                        />
                        <Text style={{ ...fonts.h4, fontSize: 11, lineHeight: 11, color: colors.white, marginTop: 5 }}>Chelsea</Text>
                    </View>
                </Marker>

                <Marker coordinate={{ latitude: 51.506108, longitude: -0.017844 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={icons.marker}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgb(255,0,0)'
                            }}
                        />
                        <Text style={{ ...fonts.h4, fontSize: 11, lineHeight: 11, color: colors.white, marginTop: 5 }}>Canary Wharf</Text>
                    </View>
                </Marker>

                <Marker coordinate={{ latitude: 51.419061, longitude: -0.079127 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={icons.marker}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgb(255,0,0)'
                            }}
                        />
                        <Text style={{ ...fonts.h4, fontSize: 11, lineHeight: 11, color: colors.white, marginTop: 5 }}>Crystal Palace</Text>
                    </View>
                </Marker>

                <Marker coordinate={{ latitude: 51.371040, longitude: -0.363972 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={icons.marker}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgb(255,0,0)'
                            }}
                        />
                        <Text style={{ ...fonts.h4, fontSize: 11, lineHeight: 11, color: colors.white, marginTop: 5 }}>Esher</Text>
                    </View>
                </Marker>
            </MapView>
        )
    }

    function renderCloseButton() {
        return (
            <TouchableOpacity
                style={{
                    top: 50,
                    left: 20,
                    position: 'absolute'
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.close}
                    resizeMode="contain"
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: colors.white
                    }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View>
            {renderMaps()}
            {renderCloseButton()}
        </View>
    )
}

export default Nearby;