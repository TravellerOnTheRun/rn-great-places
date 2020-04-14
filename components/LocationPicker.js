import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import colors from '../constants/colors';

import MapPreview from './MapPreview';

export default props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    const {onLocationPicked} = props;

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        };
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.LOCATION
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'In order to add the location you need to grant access to the location of your phone',
                [{ text: 'Alright!' }]
            );
            return false;
        };
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        };
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 10000 });
            console.log(location);
            setIsFetching(false);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            setIsFetching(false);
            Alert.alert(
                'Could not fetch location!',
                'Please, try again later or pick a location on the map',
                [{ text: 'Okay' }]
            );
        };
    };

    const pickOnTheMapHandler = () => {
        props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview
                style={styles.mapPreview}
                location={pickedLocation}
                onPress={pickOnTheMapHandler}
            >
                {
                    isFetching
                        ? <ActivityIndicator
                            size='large'
                            color={colors.lighter}
                        />
                        : <Text>No location chosen yet!</Text>
                }
            </MapPreview>
            <View style={styles.actions}>
                <Button
                    title='Get User Location'
                    color={colors.primary}
                    onPress={getLocationHandler}
                />
                 <Button
                    title='Pick on the map'
                    color={colors.primary}
                    onPress={pickOnTheMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: colors.dark,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

