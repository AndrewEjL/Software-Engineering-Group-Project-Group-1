import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MapViewRoute } from 'react-native-maps-routes';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDqpBZYwzP8m_L8du5imDrLUQHYIUZFHtU';

const NavigationMap = () => {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);

  const getCoordinatesFromAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      if (data.status === "OK") {
        return data.results[0].geometry.location;
      }
    } catch (error) {
      console.log("Error:", error);
    }
    return null;
  };

  const handleSearch = async () => {
    if (originText && destinationText) {
      let originCoords = await getCoordinatesFromAddress(originText);
      let destinationCoords = await getCoordinatesFromAddress(destinationText);

      if (originCoords && destinationCoords) {
        const newOrigin = { latitude: originCoords.lat, longitude: originCoords.lng };
        const newDestination = { latitude: destinationCoords.lat, longitude: destinationCoords.lng };

        setOrigin(newOrigin);
        setDestination(newDestination);

        if (mapRef.current) {
          mapRef.current.fitToCoordinates([newOrigin, newDestination], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (origin && destination && mapRef.current) {
      mapRef.current.fitToCoordinates([origin, destination], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: 1.4820,
            longitude: 103.6283,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {origin && <Marker coordinate={origin} title="Current Location" />}
          {destination && <Marker coordinate={destination} title="Destination" />}
          {origin && destination &&
            <MapViewRoute
              origin={origin}
              destination={destination}
              apiKey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor="blue"
              mode="DRIVE"
              onReady={(data) => {
                 console.log('Full route data:', JSON.stringify(data, null, 2));
                 alert(JSON.stringify(data));
                setRouteInfo({
                  distance: data.distance,
                  duration: data.duration,
                });
              }}
              onError={(error) => console.error('Routing error:', error)}
            />

          }
        </MapView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Location"
          value={originText}
          onChangeText={setOriginText}
        />
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destinationText}
          onChangeText={setDestinationText}
        />
            {routeInfo && (
             <View style={styles.routeInfo}>
               <Text>Estimated Time: {routeInfo.duration} mins</Text>
               <Text>Distance: {routeInfo.distance} km</Text>
             </View>
           )}
        <Button title="Route" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 100,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  routeInfo: {
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
});

export default NavigationMap;




