import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";

const GOOGLE_MAPS_API_KEY = "AIzaSyDqpBZYwzP8m_L8du5imDrLUQHYIUZFHtU";

const NavigationMap = () => {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  // Encode an address to coordinates
  const getCoordinatesFromAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_MAPS_API_KEY}`;

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
// Request route data
  const fetchRoute = async (originCoords, destinationCoords) => {
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    const body = {
      origin: {
        location: {latLng: { latitude: originCoords.lat, longitude: originCoords.lng } },
      },
      destination: {
        location: { latLng: { latitude: destinationCoords.lat, longitude: destinationCoords.lng } },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: "en-US",
      units: "IMPERIAL",
    };

    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify(body),
      });

      let data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];

        const decodedPolyline = polyline.decode(route.polyline.encodedPolyline).map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setRouteCoords(decodedPolyline);
        setRouteInfo({
          distance: (route.distanceMeters / 1000).toFixed(2),
          duration: Math.round(parseInt(route.duration.replace("s", ""), 10) / 60),
        });

        if (mapRef.current) {
          mapRef.current.fitToCoordinates(decodedPolyline, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
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
        await fetchRoute(originCoords, destinationCoords);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: 1.482,
            longitude: 103.6283,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {origin && <Marker coordinate={origin} title="Current Location" />}
          {destination && <Marker coordinate={destination} title="Destination" />}
          {routeCoords.length > 0 && (
            <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Current Location" value={originText} onChangeText={setOriginText} />
        <TextInput style={styles.input} placeholder="Destination" value={destinationText} onChangeText={setDestinationText} />
        {routeInfo && (
          <View style={styles.routeInfo}>
            <Text style={styles.text}>Estimated Time: {routeInfo.duration} mins</Text>
            <Text style={styles.text}>Distance: {routeInfo.distance} km</Text>
          </View>
        )}
        <Button title="Route" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  inputContainer: {
    position: "absolute",
    top:40,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
  input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 8
  },
  routeInfo: {
      marginBottom: 10,
      backgroundColor: "#f0f0f0",
      padding: 10,
      borderRadius: 5
  },
  text:{
      color: "black",
  }
});

export default NavigationMap;





