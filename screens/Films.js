import React from "react";
import {
    View,
    Text,
    Alert,
    Image,
    Share,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from "react-native"
import * as WebBrowser from 'expo-web-browser';
import { SimpleStepper } from 'react-native-simple-stepper';

import { icons, colors, fonts } from '../constants';

const Films = ({ route, navigation }) => {

    const [qty, setQty] = React.useState(1);
    const [ film, setFilm ] = React.useState(null)

    React.useEffect(() => {
        let { film } = route.params;
        setFilm(film)
    }, [])

    const createAlert = () =>
    Alert.alert(
        film?.name,
        null,
        [
            {
                text: "Share Film",
                onPress: share
            },
            {
                text: "View Website",
                onPress: openBrowser
            },
            {
                text: "Cancel",
                style: "cancel"
            }
        ]
    )

    const openBrowser = async () => {
        WebBrowser.openBrowserAsync( film?.details?.website, {
            controlsColor: "#fa2d48"
        });
    };

    const share = async () => {
        Share.share({
            url: film?.details?.website
        });
    };

    qtyChanged = value => {
        const nextValue = Number(value);
        setQty(nextValue);
    }

    function subtotal() {
        let subtotal = film?.details?.price * qty
        return subtotal.toFixed(2)
    }

    function renderHeader() {
        return (
            <View
                style={{
                    height: 80,
                    paddingTop: 50,
                    flexDirection: 'row',
                    backgroundColor: colors.darkgray
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: 20,
                        paddingRight: 54
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

                <Text style={{ ...fonts.h3, fontSize: 20, lineHeight: 20, color: colors.white }}>Complete your Order</Text>

                <TouchableOpacity
                    style={{
                        bottom: 3,
                        paddingLeft: 50
                    }}
                    onPress={ createAlert }
                >
                    <Image
                        source={icons.more}
                        resizeMode="contain"
                        style={{
                            width: 19,
                            height: 19,
                            tintColor: colors.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderBody() {
        return (
            <ScrollView
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground
                    source={film?.details?.image}
                    resizeMode="cover"
                    style={{
                        height: 180,
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    imageStyle={{
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.transparentBlack
                        }}
                        onPress={() => navigation.navigate("Video Player", {videoLink: film?.details?.video})}
                    >
                        <Image
                            source={icons.play}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: colors.red
                            }}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                
                <View
                    style={{
                        padding: 15,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        backgroundColor: colors.darkgray
                    }}
                >
                    <Text style={{ ...fonts.h3, fontSize: 20, lineHeight: 20, color: colors.white, alignSelf: 'center' }}>{film?.name}</Text>
                    
                    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                        <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>PG</Text>
                        <Text style={{ ...fonts.h3, fontSize: 17, lineHeight: 17, color: colors.white }}>{film?.details?.age}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>Time</Text>
                        <Text style={{ ...fonts.h3, fontSize: 17, lineHeight: 17, color: colors.white }}>{film?.details?.time}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>Length</Text>
                        <Text style={{ ...fonts.h3, fontSize: 17, lineHeight: 17, color: colors.white }}>{film?.details?.runningTime}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>Showing at</Text>

                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => navigation.navigate("Nearby")}
                        >
                            <Text style={{ ...fonts.h3, fontSize: 17, lineHeight: 17, color: colors.white }}>{film?.details?.venue}</Text>
                            <Text style={{ ...fonts.h3, fontSize: 23, lineHeight: 23, color: colors.white, bottom: 4 }}> {"›"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, paddingTop: 9, paddingRight: 152 }}>Quantity</Text>

                        <SimpleStepper
                            valueChanged={value => qtyChanged(value)}
                            initialValue={1}
                            minimumValue={1}
                            maximumValue={9}
                            incrementImage={icons.plus}
                            decrementImage={icons.minus}
                            showText={true}
                            textStyle={styles.text}
                            containerStyle={styles.box}
                            separatorStyle={styles.separator}
                            incrementImageStyle={styles.signs}
                            decrementImageStyle={styles.signs}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 7 }}>
                        <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>Subtotal</Text>
                        <Text style={{ ...fonts.h3, fontSize: 17, lineHeight: 17, color: colors.white }}>£{subtotal()}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                        <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>Booking fee</Text>
                        <Text style={{ ...fonts.h3, fontSize: 17, lineHeight: 17, color: colors.white }}>£1.90</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    paddingBottom: 55,
                    alignItems: 'center',
                    backgroundColor: colors.darkgray
                }}
            >
                <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 15, paddingHorizontal: 30 }}>
                    <Text style={{ ...fonts.h4, fontSize: 21, lineHeight: 21, color: colors.white, flex: 1 }}>Total to Pay</Text>
                    <Text style={{ ...fonts.h3, fontSize: 21, lineHeight: 21, color: colors.white }}>£{((film?.details?.price * qty) + 1.9).toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                    style={{
                        width: 320,
                        height: 55,
                        borderRadius: 12,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: colors.black
                    }}
                >
                    <Text style={{ ...fonts.h4, fontSize: 25, lineHeight: 25, color: colors.white }}>Order with </Text>

                    <Image
                        source={icons.apple}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            bottom: 3.5,
                            tintColor: colors.white
                        }}
                    />

                    <Text style={{ ...fonts.h4, fontSize: 25, lineHeight: 25, color: colors.white }}> Pay</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginTop: 15,
                        flexDirection: 'row'
                    }}
                >
                    <Text style={{ ...fonts.h3, fontSize: 16, lineHeight: 16, color: colors.white }}>Other Payment Methods</Text>
                    <Text style={{ ...fonts.h3, fontSize: 22, lineHeight: 22, color: colors.white, bottom: 3 }}> {"›"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    separator: {
        backgroundColor: 'transparent'
    },
    signs: {
        width: 18,
        height: 18,
        tintColor: colors.red
    },
    box: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    text: {
        ...fonts.h3,
        fontSize: 18,
        lineHeight: 18,
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        color: colors.white
    }
})

export default Films;