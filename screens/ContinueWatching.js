import React from 'react';
import {
    Text,
    View,
    Image,
    Share,
    Platform,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ProgressBar } from "../components"
import { icons, colors, sizes, fonts } from "../constants"

const ContinueWatching = ({ route, navigation }) => {

    const [ series, setSeries ] = React.useState(null)

    React.useEffect(() => {
        let { series } = route.params;
        setSeries(series)
    }, [])

    const share = async () => {
        Share.share({
            url: series?.details?.website
        });
    };

    function renderHeaderBar() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                    marginTop: Platform.OS === 'ios' ? 45 : 20
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.transparentBlack
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.close}
                        resizeMode="contain"
                        style={{
                            width: 16,
                            height: 16,
                            tintColor: colors.white
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.transparentBlack
                    }}
                    onPress={ share }
                >
                    <Image
                        source={icons.share}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: colors.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderHeaderSection() {
        return (
            <ImageBackground
                source={series?.thumbnail}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: sizes.height < 700 ? sizes.height * 0.6 : sizes.height * 0.7
                }}
            >
                <View style={{ flex: 1 }}>
                    {renderHeaderBar()}

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end'
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={[ 'transparent', '#000' ]}
                            style={{
                                width: "100%",
                                height: 150,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Text style={{ ...fonts.h4, fontSize: 14, lineHeight: 14, color: colors.gray }}>NEW • {series?.details?.season}</Text>
                            <Text style={{ ...fonts.h3, fontSize: 23, lineHeight: 23, color: colors.white, marginTop: 8 }}>{series?.name}</Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    function renderCategories() {
        return (
            <View
                style={{
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={[
                        { marginLeft: 0 },
                        styles.categoryContainer
                    ]}
                >
                    <Text style={{ ...fonts.h4, fontSize: 14, lineHeight: 14, color: colors.white }}>{series?.details?.age}</Text>
                </View>

                <View
                    style={[
                        { paddingHorizontal: 24 },
                        styles.categoryContainer
                    ]}
                >
                    <Text style={{ ...fonts.h4, fontSize: 14, lineHeight: 14, color: colors.white }}>{series?.details?.genre}</Text>
                </View>

                <View
                    style={
                        styles.categoryContainer
                    }
                >
                    <Image
                        source={icons.star}
                        resizeMode= "contain"
                        style={{
                            width: 12,
                            height: 12,
                            bottom: 1.5
                        }}
                    />
                    <Text style={{ ...fonts.h4, fontSize: 14, lineHeight: 14, color: colors.white, marginLeft: 4 }}>{(series?.details?.ratings.toFixed(1))}</Text>
                </View>
            </View>
        )
    }

    function renderSeriesDetails() {
        return (
            <View
                style={{
                    marginTop: 30,
                    paddingHorizontal: 25
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...fonts.h4, fontSize: 15, lineHeight: 15, color: colors.white, flex: 1 }}>{series?.details?.currentEpisode}</Text>
                    <Text style={{ ...fonts.h4, fontSize: 15, lineHeight: 15, color: colors.gray }}>{series?.details?.runningTime}</Text>
                </View>

                <ProgressBar
                    containerStyle={{ marginTop: 15 }}
                    barPercentage={series?.details?.progress}
                    barStyle={{
                        height: 5,
                        borderRadius: 3
                    }}
                />

                <TouchableOpacity
                    style={{
                        height: 60,
                        marginTop: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.red
                    }}
                    onPress={() => navigation.navigate("Video Player", {videoLink: series?.details?.video})}
                >
                    <Text style={{ ...fonts.h3, fontSize: 18, lineHeight: 18, color: colors.white }}>{series?.details?.progress == "0%" ? "WATCH NOW" : "CONTINUE WATCHING"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.black
            }}
        >
            {renderHeaderSection()}
            {renderCategories()}
            {renderSeriesDetails()}
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginLeft: 8,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#343434'
    }
})

export default ContinueWatching;