import PlaceForm from "../components/places/PlaceForm";

const AddPlaces = ({ navigation }) => {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
