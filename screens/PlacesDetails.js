import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

const PlacesDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({ title: place.title });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return <View style={styles.fallback}>Loading data...</View>;
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.image }} />
      <View style={styles.locationContainer}>
        <View style={styles.locationContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlacesDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
