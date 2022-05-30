import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Share,
    FlatList,
    Platform,
    Animated,
    StatusBar,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { icons, colors, fonts } from '../constants';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 100 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Series extends Component {
    constructor(props) {
        super(props);

        this.state = { scrollY: new Animated.Value(0) };
    }

    renderSeasonsSection() {
        const { series } = this.props.route.params;

        return (
            <View style={{ marginTop: HEADER_MAX_HEIGHT }}>
                <View
                    style={{
                        paddingTop: 30,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 15
                    }}
                >
                    <Text style={{ ...fonts.h3, fontSize: 21, lineHeight: 21, color: colors.white, flex: 1 }}>Select Your Season</Text>

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
                    data={series.seasons}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {

                        const openBrowser = async () => {
                            WebBrowser.openBrowserAsync( item.website, {
                                controlsColor: "#fa2d48"
                            });
                        };

                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginLeft: index == 0 ? 15 : 30,
                                    marginRight: index == series.seasons.length - 1 ? 15 : 0
                                }}
                            >
                                <View>
                                    <ImageBackground
                                        source={item.image}
                                        resizeMode="cover"
                                        style={{
                                            width: 341,
                                            height: 191,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        imageStyle={{
                                            borderTopLeftRadius: 25,
                                            borderTopRightRadius: 25
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
                                            onPress={() => this.props.navigation.navigate("Video Player", {videoLink: item.video})}
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
                                            width: 341,
                                            height: 65,
                                            padding: 10,
                                            borderBottomLeftRadius: 25,
                                            borderBottomRightRadius: 25,
                                            backgroundColor: colors.darkgray
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ ...fonts.h4, fontSize: 17, lineHeight: 17, color: colors.white, flex: 1 }}>{series.name}: Season {item.name}</Text>

                                            <TouchableOpacity onPress={ openBrowser }>
                                                <Image
                                                    source={icons.compass}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: colors.white
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ paddingTop: 10, flexDirection: 'row' }}>
                                            <Text style={{ ...fonts.h5, fontSize: 14, lineHeight: 14, color: colors.gray }}>{item.episodes} Episodes</Text>
                                            <Text style={{ ...fonts.h5, fontSize: 14, lineHeight: 14, color: colors.gray, paddingLeft: 10 }}>PG-{item.age}</Text>
                                            <Text style={{ ...fonts.h5, fontSize: 14, lineHeight: 14, color: colors.gray, paddingLeft: 10 }}>{item.year}</Text>

                                            <Image
                                                source={icons.star}
                                                resizeMode="contain"
                                                style={{
                                                    left: 10,
                                                    width: 11,
                                                    height: 11
                                                }}
                                            />

                                            <Text style={{ ...fonts.h5, fontSize: 14, lineHeight: 14, color: colors.gray, paddingLeft: 12 }}>{item.ratings}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    renderCastSection() {
        const { series } = this.props.route.params;

        return (
            <View style={{ marginTop: 30 }}>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 15
                    }}
                >
                    <Text style={{ ...fonts.h3, fontSize: 21, lineHeight: 21, color: colors.white, flex: 1 }}>Cast {"&"} Crew</Text>

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
                    data={series.cast}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {

                        const openBrowser = async () => {
                            WebBrowser.openBrowserAsync( item.website, {
                                controlsColor: "#fa2d48"
                            });
                        };

                        return (
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    marginLeft: index == 0 ? 15 : 8,
                                    marginRight: index == series.cast.length - 1 ? 15 : 0
                                }}
                                onPress={ openBrowser }
                            >
                                <Image
                                    source={item.picture}
                                    resizeMode="cover"
                                    style={{
                                        width: 125,
                                        height: 125,
                                        borderRadius: 65
                                    }}
                                />

                                <View style={{ width: 140, alignItems: 'center' }}>
                                    <Text style={{ ...fonts.h4, fontSize: 15, lineHeight: 15, color: colors.white, marginTop: 10 }}>{item.stageName}</Text>
                                    <Text style={{ ...fonts.h5, fontSize: 14, lineHeight: 14, color: colors.gray, marginTop: 6 }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }

    renderAboutSection() {
        const { series } = this.props.route.params;

        return (
            <View style={{ marginTop: 30, marginBottom: 40, paddingHorizontal: 15 }}>
                <Text style={{ ...fonts.h3, fontSize: 21, lineHeight: 21, color: colors.white }}>About {series.name}</Text>
                <Text style={{ ...fonts.h4, lineHeight: 17, color: colors.gray, paddingTop: 10 }}>{series.about}</Text>
            </View>
        )
    }

    render() {
        const { series } = this.props.route.params;
    
        const openBrowser = async () => {
            WebBrowser.openBrowserAsync( series.website, {
                controlsColor: "#fa2d48"
            });
        };

        const share = async () => {
            Share.share({
                url: series.website
            });
        };

        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp'
        });

        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp'
        });

        const titleScale = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });

        const titleTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.container}>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />

                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true }
                    )}
                >
                    {this.renderSeasonsSection()}
                    {this.renderCastSection()}
                    {this.renderAboutSection()}
                </Animated.ScrollView>

                <Animated.View
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] }
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }]
                            }
                        ]}
                        source={series.thumbnail}
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate }
                            ]
                        }
                    ]}
                >
                    <Text style={styles.title}>{series.name}</Text>
                </Animated.View>

                <TouchableOpacity
                    style={ styles.close }
                    onPress={() => this.props.navigation.goBack()}
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

                <TouchableOpacity
                    style={ styles.browser }
                    onPress={ openBrowser }
                >
                    <Image
                        source={icons.compass}
                        resizeMode="contain"
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: colors.white
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={ styles.share }
                    onPress={ share }
                >
                    <Image
                        source={icons.share}
                        resizeMode="contain"
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: colors.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        position: 'absolute',
        height: HEADER_MAX_HEIGHT,
        backgroundColor: colors.darkgray
    },
    backgroundImage: {
        top: 0,
        left: 0,
        right: 0,
        width: null,
        resizeMode: 'cover',
        position: 'absolute',
        height: HEADER_MAX_HEIGHT
    },
    bar: {
        top: 0,
        left: 0,
        right: 0,
        height: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 55 : 38
    },
    title: {
        ...fonts.h3,
        fontSize: 21,
        lineHeight: 21,
        color: colors.white
    },
    close: {
        top: 60,
        left: 20,
        position: 'absolute'
    },
    browser: {
        top: 58,
        right: 58,
        position: 'absolute'
    },
    share: {
        top: 58,
        right: 20,
        position: 'absolute'
    }
});

export default Series;