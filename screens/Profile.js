import React from "react";
import {
    View,
    Text,
    Image,
    Modal,
    Alert,
    FlatList,
    Platform,
    TextInput,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from "react-native"

import * as AppleAuthentication from 'expo-apple-authentication';
import { icons, colors, fonts } from "../constants"

const Profile = () => {

    const [areas, setAreas] = React.useState([]);
    const [showPassword, setShowPassword] = React.useState(false);
    const [selectedArea, setSelectedArea] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [number, setNumber] = React.useState();
    const [password, setPassword] = React.useState();

    const createAlert = () =>
    Alert.alert(
        "Congratulations",
        "Your account has been created!",
        [{ text: "OK" }]
    )

    React.useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(response => response.json())
            .then(data => {
                let areaData = data.map(item => {
                    return {
                        code: item.cca2.toLowerCase(),
                        name: item.name.common,
                        callingCode: item.idd.root+item.idd.suffixes,
                        flag: `https://flagcdn.com/w320/${item.cca2.toLowerCase()}.png`
                    }
                })

                setAreas(areaData)

                if (areaData.length > 0) {
                    let defaultData = areaData.filter(a => a.code == "gb")

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])

    function renderHeader() {
        return (
            <View style={{ height: 80, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10, backgroundColor: colors.darkgray }}>
                    <Text style={{ ...fonts.h3, fontSize: 20, lineHeight: 20, color: colors.white }}>Welcome to Xtreming</Text>
            </View>
        )
    }

    function AppleSignIn() {
        return (
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                cornerRadius={10}
                style={{ margin: 20, marginTop: 25, height: 65 }}
                onPress={async () => {
                    try {
                        const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                        });
                    } catch (e) {
                        if (e.code === 'ERR_CANCELED') {
                            console.log("Apple Sign In Canceled")
                        } else {
                            console.log("Apple Sign In Error")
                        }
                    }
                }}
            />
        );
    }

    function renderForm() {
        return (
            <View style={{ margin: 20 }}>
                <View style={{ alignItems: 'center', marginTop: -15 }}>
                    <Text style={{ ...fonts.h5, color: colors.white }}>— or sign up with your email —</Text>
                </View>

                <View style={{ marginTop: 25 }}>
                    <Text style={{ ...fonts.h3, fontSize: 16, lineHeight: 16, color: colors.white }}>Name</Text>

                    <TextInput
                        style={{
                            marginVertical: 10,
                            paddingLeft: 10,
                            borderBottomColor: colors.gray,
                            borderBottomWidth: 1,
                            height: 40,
                            color: colors.white,
                            ...fonts.h5,
                            fontSize: 18,
                            lineHeight: 18
                        }}
                        onChangeText={setName}
                        placeholder="What's your name?"
                        placeholderTextColor={colors.gray}
                        selectionColor={colors.white}
                        keyboardAppearance = 'dark'
                        textContentType = 'name'
                        spellCheck={false}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ ...fonts.h3, fontSize: 16, lineHeight: 16, color: colors.white }}>Email Address</Text>

                    <TextInput
                        style={{
                            marginVertical: 10,
                            paddingLeft: 10,
                            borderBottomColor: colors.gray,
                            borderBottomWidth: 1,
                            height: 40,
                            color: colors.white,
                            ...fonts.h5,
                            fontSize: 18,
                            lineHeight: 18
                        }}
                        onChangeText={setEmail}
                        placeholder="What's your email?"
                        placeholderTextColor={colors.gray}
                        selectionColor={colors.white}
                        keyboardAppearance = 'dark'
                        textContentType = 'emailAddress'
                        keyboardType = 'email-address'
                        spellCheck={false}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ ...fonts.h3, fontSize: 16, lineHeight: 16, color: colors.white }}>Phone Number</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                width: 110,
                                height: 40,
                                marginVertical: 10,
                                paddingLeft: 10,
                                borderBottomColor: colors.gray,
                                borderBottomWidth: 1,
                                flexDirection: 'row'
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Image
                                source={icons.down_arrow}
                                style={{
                                    top: 11,
                                    width: 12,
                                    height: 12,
                                    tintColor: colors.white
                                }}
                            />

                            <View style={{ marginLeft: 8, top: 4, flex: 1 }}>
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            </View>

                                <Text style={{ color: colors.white, ...fonts.h5, fontSize: 18, lineHeight: 18, top: 9 }}>{selectedArea?.callingCode}</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: 10,
                                marginLeft: 10,
                                borderBottomColor: colors.gray,
                                borderBottomWidth: 1,
                                height: 40,
                                color: colors.white,
                                ...fonts.h5,
                                fontSize: 18,
                                lineHeight: 18
                            }}
                            onChangeText={setNumber}
                            placeholder="What's your number?"
                            placeholderTextColor={colors.gray}
                            selectionColor={colors.white}
                            keyboardAppearance = 'dark'
                            textContentType = 'telephoneNumber'
                            keyboardType = 'phone-pad'
                        />
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ ...fonts.h3, fontSize: 16, lineHeight: 16, color: colors.white }}>Password</Text>

                    <TextInput
                        style={{
                            marginVertical: 10,
                            paddingLeft: 10,
                            borderBottomColor: colors.gray,
                            borderBottomWidth: 1,
                            height: 40,
                            color: colors.white,
                            ...fonts.h5,
                            fontSize: 18,
                            lineHeight: 18
                        }}
                        onChangeText={setPassword}
                        placeholder="Choose a password"
                        placeholderTextColor={colors.gray}
                        selectionColor={colors.white}
                        secureTextEntry={!showPassword}
                        keyboardAppearance = 'dark'
                        textContentType = 'password'
                        maxLength = {18}
  
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 13,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.invisible : icons.visible}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: colors.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: 20, marginTop: 5 }}>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: 65,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.white
                    }}
                    onPress={ createAlert }
                >
                    <Text style={{ ...fonts.h3, fontSize: 26, lineHeight: 26, color: colors.black }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderAreaCodesModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                width: 290,
                                height: 390,
                                borderRadius: 30,
                                backgroundColor: colors.white
                            }}
                        >
                            <FlatList
                                contentContainerStyle={{
                                    padding: 15,
                                    paddingTop: 10,
                                    paddingRight: 20,
                                    paddingBottom: 10
                                }}
                                data={areas}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ padding: 10, alignItems: 'center', flexDirection: 'row' }}
                                            onPress={() => {
                                                setSelectedArea(item)
                                                setModalVisible(false)
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.flag }}
                                                resizeMode="contain"
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    marginRight: 10
                                                }}
                                            />
                                            <Text style={{ ...fonts.h5, fontSize: 16, lineHeight: 16, color: colors.black }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            {renderHeader()}

            <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
                <ScrollView>
                    {AppleSignIn()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </SafeAreaView>

            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

export default Profile;