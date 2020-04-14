import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    ScrollView,
    View,
    TextInput,
    StyleSheet,
    Text,
    Button
} from 'react-native';

import colors from '../constants/colors';

import { addPlace, loadPlaces } from '../store/places-actions';

import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlace = props => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);


    const titleChangeHandler = text => {
        setTitle(text);
    };

    const imageTakenHandler = path => {
        setImage(path);
    };

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        dispatch(addPlace(title, image, selectedLocation));
        props.navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={title}
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker 
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}
                    />
                <Button
                    title='Save Place'
                    color={colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
};

NewPlace.navigationOptions = {
    headerTitle: 'Add New Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
        color: colors.dark
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: colors.dark,
        borderBottomWidth: 2,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlace;