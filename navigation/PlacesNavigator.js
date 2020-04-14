import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PlaceListScreen from '../screens/PlaceList';
import PlaceDetailsScreen from '../screens/PlaceDetails';
import NewPlaceScreen from '../screens/NewPlace';
import MapScreen from '../screens/Map';

import colors from '../constants/colors';

const PlacesNavigator = createStackNavigator({
    Places: PlaceListScreen,
    PlaceDetails: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'
                ? colors.primary
                : ''
        },
        headerTintColor: Platform.OS === 'android'
            ? colors.accent
            : colors.primary
    }
});

export default createAppContainer(PlacesNavigator);