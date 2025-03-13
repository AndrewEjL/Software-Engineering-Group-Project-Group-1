
import React, { useRef, useState } from "react";
import { Text,View, TextInput, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const GOOGLE_MAPS_API_KEY = "AIzaSyDqpBZYwzP8m_L8du5imDrLUQHYIUZFHtU";

const SelectLocation = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "",
  });
 //Convert address to coordinate
  const fetchCoordinates = async () => {
    if (!location.address.trim()) return;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location.address)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        updateLocation(lat, lng, location.address);
      } else {
        alert("Address not found");
      }
    } catch (error) {
      console.error("Geocoding error", error);
    }
  };
 //Convert coordinate to address
  const fetchAddress = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const formattedAddress = data.results[0]?.formatted_address || "Address not found";
        setLocation({ latitude, longitude, address: formattedAddress });
        onLocationSelect(formattedAddress);
      }
    } catch (error) {
      console.error("Geolocation error:", error);
    }
  };

  const updateLocation = (latitude, longitude, address = "") => {
    setLocation({ latitude, longitude, address });
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={styles.container}>
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
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          fetchAddress(latitude, longitude);
        }}
      >
        {location.latitude && location.longitude && (
          <Marker
            ref={markerRef}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Selected location"
            draggable
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              fetchAddress(latitude, longitude);
            }}
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          value={location.address}
          onChangeText={(text) => setLocation({ ...location, address: text })}
        />
        <Button title="Search" onPress={fetchCoordinates} />
      </View>
      <Text style={styles.confirmedText}>Confirmed Address:</Text>
      <Text style={styles.addressText}>{location.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
      flex: 1 ,
  },
  searchContainer: {
    position: "absolute",
    width: "95%",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  confirmedText: {
      color: "black",
      fontWeight: "bold",
      fontSize: 20,
      padding:5,
    },
    addressText: {
      fontSize: 16,
      color: "#2f20fa",
      padding:5,
    },

});

export default SelectLocation;