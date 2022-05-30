import React from 'react';
import {
    View,
    Text,
    Alert,
    Image,
    Share,
    Linking,
    FlatList,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { data, icons, colors, fonts } from "../constants"

const Cinemas = ({ navigation }) => {

    function renderHeader() {
        return (
            <View
                style={{
                    height: 40,
                    flexDirection: 'row'
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            width: "88%",
                            height: "100%",
                            borderRadius: 12,
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: colors.darkgray
                        }}
                    >
                        <Image
                            source={icons.loupe_1}
                            resizeMode="contain"
                            style={{
                                width: 12.5,
                                height: 12.5,
                                marginLeft: 20,
                                marginBottom: 4,
                                tintColor: colors.gray
                            }}
                        />

                        <Text style={{ ...fonts.h5, fontSize: 14, lineHeight: 14, color: colors.gray, marginLeft: 10 }}>Search Cinemas</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: 20,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("Nearby")}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: colors.red
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderVenuesSection() {
        return (
            <View style={{ marginTop: 30 }}>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 15
                    }}
                >
                    <Text style={{ ...fonts.h3, fontSize: 21, lineHeight: 21, color: colors.white, flex: 1 }}>What's near me?</Text>

                    <Image
                        source={icons.right_arrow}
                        resizeMode="contain"
                        style={{
                            width: 15,
                            height: 15,
                            bottom: 2.5,
                            tintColor: colors.red
                        }}
                    />
                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 15 }}
                    data={data.venues}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {

                        const createAlert = () =>
                        Alert.alert(
                            item.name,
                            null,
                            [
                                {
                                    text: "Call Venue",
                                    onPress: callVenue
                                },
                                {
                                    text: "Share Venue",
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
                            WebBrowser.openBrowserAsync( item.website, {
                                controlsColor: "#fa2d48"
                            });
                        };
                    
                        const callVenue = async () => {
                            Linking.openURL(`tel:${+448724369060}`)
                        };
                    
                        const share = async () => {
                            Share.share({
                                url: item.website
                            });
                        };

                        return (
                            <View
                                style={{
                                    marginLeft: index == 0 ? 15 : 30,
                                    marginRight: index == data.venues.length - 1 ? 15 : 0
                                }}
                            >
                                <View>
                                    <Image
                                        source={item.thumbnail}
                                        resizeMode="cover"
                                        style={{
                                            width: 341,
                                            height: 191,
                                            borderTopLeftRadius: 25,
                                            borderTopRightRadius: 25
                                        }}
                                    />

                                    <View
                                        style={{
                                            width: 341,
                                            height: 65,
                                            padding: 10,
                                            borderBottomLeftRadius: 25,
                                            borderBottomRightRadius: 25,
                                            backgroundColor: colors.darkgray
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>{item.name}</Text>

                                            <TouchableOpacity onPress={ createAlert }>
                                                <Image
                                                    source={icons.more}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: colors.white
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={{ ...fonts.h5, fontSize: 14, lineHeight: 14, color: colors.gray, paddingTop: 10 }}>{item.address}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    function renderFilmsSection() {
        return (
            <View style={{ marginTop: 30 }}>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 15
                    }}
                >
                    <Text style={{ ...fonts.h3, fontSize: 21, lineHeight: 21, color: colors.white, flex: 1 }}>What's playing now?</Text>

                    <Image
                        source={icons.right_arrow}
                        resizeMode="contain"
                        style={{
                            width: 15,
                            height: 15,
                            bottom: 2.5,
                            tintColor: colors.red
                        }}
                    />
                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 15 }}
                    data={data.films}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    marginLeft: index == 0 ? 15 : 15,
                                    marginRight: index == data.films.length - 1 ? 15 : 0
                                }}
                                onPress={() => navigation.navigate("Films", {film: item})}
                            >
                                <Image
                                    source={item.thumbnail}
                                    resizeMode="cover"
                                    style={{
                                        width: 140,
                                        height: 210,
                                        borderRadius: 25
                                    }}
                                />

                                <Text style={{ ...fonts.h4, fontSize: 14, lineHeight: 14, color: colors.white, marginTop: 10, alignSelf: 'center' }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.black
            }}
        >
            {renderHeader()}

            <ScrollView>
                {renderVenuesSection()}
                {renderFilmsSection()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Cinemas;