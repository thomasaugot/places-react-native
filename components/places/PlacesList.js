import { FlatList } from "react-native";

const PlacesList = ({ places }) => {
  return <FlatList data={places} keyExtractor={(item) => item.id} 
  renderItem={}/>;
};

export default PlacesList;