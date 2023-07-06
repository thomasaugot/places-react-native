import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Button from "../components/ui/Button";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    longitudeDelta: 0.0421,
    latitudeDelta: 0.922,
  };
  function selectLocationHandler(event) {
    if (initialLocation) {
      // to avoid enabling moving the market if it was already set // read only
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked!", "You have to tap a location on the map to proceed");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Button icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView initialRegion={region} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
