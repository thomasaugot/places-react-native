import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import Button from "./components/ui/Button";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import PlacesDetails from "./screens/PlacesDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [databaseInitialized, setDatabaseInitialized] = useState();

  useEffect(() => {
    init() // to launch the database
      .then(() => {
        setDatabaseInitialized(true);
      })
      .createPlaceHandler((error) => console.log(error));
  }, []);

  if (!databaseInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPLaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your favorite places",
              headerRight: ({ tintColor }) => (
                <Button
                  onPress={() => navigation.navigate("AddPLaces")}
                  icon="add"
                  size={24}
                  color={tintColor}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPLaces"
            component={AddPlaces}
            options={{ title: "Add a new place" }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="Placesdetails"
            component={PlacesDetails}
            options={{ title: "Loading Place..." }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
