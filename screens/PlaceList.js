import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import PlaceItem from '../components/PlaceItem';
import HeaderButton from '../components/HeaderButton';

import { loadPlaces } from '../store/places-actions';


const PlaceList = props => {
    const places = useSelector(state => state.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPlaces());
    }, [loadPlaces, dispatch])
    return (
        <FlatList
            data={places}
            // keyExtractor={item => item.id}
            renderItem={itemData => <PlaceItem
                image={itemData.item.imageURI}
                onSelect={() => {
                    console.log(itemData.item);
                    props.navigation.navigate('PlaceDetails', {
                        placeTitle: itemData.item.title,
                        placeid: itemData.item.id
                    });
                }}
                title={itemData.item.title}
                address={itemData.item.address}
            />}
        />
    );
};

PlaceList.navigationOptions = navData => {
    return {
        headerTitle: 'All places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default PlaceList;

