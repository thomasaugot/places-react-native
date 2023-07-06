import PlaceForm from "../components/places/PlaceForm";

const AddPlaces = ({ navigation }) => {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", { place: place });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
