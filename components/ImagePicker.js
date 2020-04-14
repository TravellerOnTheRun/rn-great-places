import React, { useState } from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Persmissions from 'expo-permissions';
import colors from '../constants/colors';

export default props => {
    const [image, setImage] = useState();

    const verifyPermissions = async () => {
        const result = await Persmissions.askAsync(
            Persmissions.CAMERA,
            Persmissions.CAMERA_ROLL
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant permission to the camera of your phone, if you want to add a picture',
                [{ text: 'Alright!' }]
            );
            return false;
        };
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        };
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        
        setImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {
                    image
                        ? <Image style={styles.image} source={{ uri: image }} />
                        : <Text>No Image picked yet!</Text>
                }
            </View>
            <Button
                title='Create one!'
                color={colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.dark,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

