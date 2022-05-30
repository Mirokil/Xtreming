import React from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    FlatList,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { Profiles, ProgressBar } from "../components"
import { data, icons, images, colors, sizes, fonts } from "../constants"

const Home = ({ navigation }) => {

    const seriesScrollX = React.useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                    paddingHorizontal: 15
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30
                    }}
                >
                    <Image
                        source={images.profile_photo}
                        resizeMode="cover"
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30
                    }}
                >
                    <Image
                        source={icons.airplay}
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

    function renderSeriesSection() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={sizes.width}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{ marginTop: 10 }}
                data={data.series}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: seriesScrollX}}}], {useNativeDriver: false})}
                renderItem={({ item, idex }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                width: sizes.width,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => navigation.navigate("Series", {series: item})}
                        >
                            <ImageBackground
                                source={item.thumbnail}
                                resizeMode="cover"
                                style={{
                                    width: sizes.width * 0.85,
                                    height: sizes.width * 0.85,
                                    justifyContent: 'flex-end'
                                }}
                                imageStyle={{ borderRadius: 40 }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: 60,
                                        width: "100%",
                                        marginBottom: 10,
                                        paddingHorizontal: 10
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => navigation.navigate("Video Player", {videoLink: item.video})}
                                    >
                                        <View
                                            style={{
                                                top: 15,
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: colors.transparentWhite
                                            }}
                                        >
                                            <Image
                                                source={icons.play}
                                                resizeMode="contain"
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    tintColor: colors.white
                                                }}
                                            />
                                        </View>

                                        <Text style={{ top: 28.5, marginLeft: 8, color: colors.white, ...fonts.h4, fontSize: 16, lineHeight: 16 }}>Play Now</Text>
                                    </TouchableOpacity>

                                    <View style={{ top: 19 }}>
                                        <Profiles profiles={item.cast}/>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide( seriesScrollX, sizes.width )

        return (
            <View
                style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {data.series.map(( item, index ) => {
                    
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })

                    const dotWidth = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [6, 20, 6],
                        extrapolate: "clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [colors.gray, colors.red, colors.gray],
                        extrapolate: "clamp"
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                width: dotWidth,
                                height: 6,
                                borderRadius: 10,
                                marginHorizontal: 3,
                                backgroundColor: dotColor
                            }}
                        />
                    )
                })}
            </View>
        )
    }

    function renderContinueWatchingSection() {
        return (
            <View style={{ marginTop: 20 }}>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 20
                    }}
                >
                    <Text style={{ ...fonts.h3, fontSize: 18, lineHeight: 18, color: colors.white, flex: 1 }}>Continue Watching</Text>

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
                    data={data.continueWatching}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    marginLeft: index == 0 ? 20 : 15,
                                    marginRight: index == data.continueWatching.length - 1 ? 20 : 0
                                }}
                                onPress={() => navigation.navigate("Continue Watching", {series: item})}
                            >
                                <Image
                                    source={item.thumbnail}
                                    resizeMode="cover"
                                    style={{
                                        width: sizes.width / 3,
                                        height: (sizes.width / 3) + 60,
                                        borderRadius: 20
                                    }}
                                />

                                <Text style={{ ...fonts.h4, fontSize: 14, lineHeight: 14, color: colors.white, marginTop: 10 }}>{item.name}</Text>

                                <ProgressBar
                                    containerStyle={{ marginTop: 10 }}
                                    barStyle={{ height: 3, borderRadius: 3 }}
                                    barPercentage={ item.overallProgress }
                                />
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
                {renderSeriesSection()}
                {renderDots()}
                {renderContinueWatchingSection()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;