import React, { useState, useCallback, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import colors from '../constants/colors';


const MapScreen = props => {
    const intialLocation = props.navigation.getParam('intialLocation');
    const readonly = props.navigation.getParam('readonly');

    const [selectedLocation, setSelectedLocation] = useState(intialLocation);
    const mapRegion = {
        latitude: intialLocation ? intialLocation.lat : 37.78,
        longitude: intialLocation ? intialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = event => {
        if(readonly) {
            return;
        };
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    };

    const saveSelectedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            return;
        };
        props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ saveLocation: saveSelectedLocationHandler });
    }, [saveSelectedLocationHandler]);

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }


    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {
                markerCoordinates &&
                <Marker
                    title='Picked Location'
                    coordinate={markerCoordinates}
                ></Marker>
            }
        </MapView>
    );
};

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly');

    if(readonly) {
        return {};
    };

    return {
        headerRight: () => (
            <TouchableOpacity
                style={styles.headerBtn}
                onPress={saveFn}
            >
                <Text style={styles.headerBtnText}>Save</Text>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerBtn: {
        marginHorizontal: 20
    },
    headerBtnText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? colors.accent : colors.primary
    }
});

export default MapScreen;