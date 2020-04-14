import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import ENV from '../env';

export default props => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.location.lat
            }, ${props.location.lng
            }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7label:A%${
            props.location.lat
            },${props.location.lng}&key=${ENV.googleApiKey}`;
    };

    return (
        <TouchableOpacity
            style={{ ...styles.mapPreview, ...props.style }}
            onPress={props.onPress}
        >
            {
                props.location
                    ? <Image
                        style={styles.mapImage}
                        source={{ uri: imagePreviewUrl }}
                    />
                    : props.children
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});