import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

const mapUrl = '';


const MapComponent = compose(
    withProps({
        googleMapURL: mapUrl,
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `400px` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(({ isMarkerShown, onMarkerClick, onMapClick, markers }) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        onClick={onMapClick}
    >
        { isMarkerShown &&
            markers.map((marker) => {
                return (
                    <Marker
                        key={marker.key}
                        position={{ lat: marker.coordinates.lat, lng:  marker.coordinates.lng }}
                        onClick={() => onMarkerClick(marker.key)}
                    />
                )
            })
        }
    </GoogleMap>
);


class Map extends React.PureComponent {
    state = {
        markers: [
            {
                coordinates: {
                    lat: -34.397,
                    lng: 150.644
                },
                key: Date.now()
            },
        ],
    };

    onMapClick = (e) => {
        const coordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        this.setState(prevState => ({
            markers: [...prevState.markers, { coordinates, key: Date.now() }],
        }));
    };

    onMarkerClick = (key) => {
        this.setState(prevState => ({
            markers: [...prevState.markers.filter(marker => marker.key !== key)],
        }));
    };

    render () {
        return (
            <MapComponent
                isMarkerShown
                onMarkerClick={this.onMarkerClick}
                onMapClick={this.onMapClick}
                markers={this.state.markers}
            />
        )
    }
}


export default Map;



