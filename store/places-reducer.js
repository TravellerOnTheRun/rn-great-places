import Place from '../models/place';
import { ADD_PLACE, SET_PLACES } from "./places-actions";

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng
            );
            return {
                places: state.places.concat(newPlace)
            };
        case SET_PLACES:
            return {
                places: action.places.map(
                    pl => new Place(
                        pl.id.toString(),
                        pl.title,
                        pl.imageURI,
                        pl.address,
                        pl.lat,
                        pl.lng
                    )
                )
            };
        default:
            return state;
    };
}