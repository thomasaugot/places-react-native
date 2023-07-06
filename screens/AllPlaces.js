import { StyleSheet } from "react-native";
import PlacesList from "../components/places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../constants/colors";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currentPlaces) => [...currentPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
