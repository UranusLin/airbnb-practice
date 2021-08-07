import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {useState} from "react";
import getCenter from "geolib/es/getCenter";

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search results object into the 
    // {latitude: xxxxx, longitude: xxxxxx}
    const coordinates = searchResults.map( result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    // the latitude and longitude of the center of location coordinates
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState(
        {
            width: '100%', 
            height: '100%',
            latitude: center.latitude,
            longitude: center.longitude,
            zoom: 11,
        }
    );

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/morrislin/cks1hecsy3dzx17qwfj27fwq9"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >   
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p onClick={() => setSelectedLocation(result)}
                         className="cursor-pointer text-2xl animate-bounce"
                         aria-label="push-pin"
                         role="img"
                        >
                            📌
                        </p>
                    </Marker>

                    {/* The popup that should show if we click on a marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ): (false) }
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
