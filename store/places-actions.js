import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';

import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';


export const addPlace = (title, image, locationObj) => {
    return async dispatch => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            locationObj.lat
            },${locationObj.lng}&key=${ENV.googleApiKey}`
        );

        if (!response.ok) {
            throw new Error('The response is not ok!');
        };

        const resData = await response.json();
        if (!resData.results) {
            throw new Error('Did not find resData.results');
        };

        const address = resData.results[0].formatted_address;

        const filename = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + filename;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                locationObj.lat,
                locationObj.lng
            );
            console.log(dbResult);
            dispatch({
                type: ADD_PLACE, placeData: {
                    id: dbResult.insertId,
                    title,
                    image: newPath,
                    address,
                    coords: {
                        lat: locationObj.lat,
                        lng: locationObj.lng
                    }
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        };
    };

};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            console.log(dbResult);
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        };
    }
};