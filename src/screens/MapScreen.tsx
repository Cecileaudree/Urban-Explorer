import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MapScreen() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("https://example.com/api/places")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carte des lieux</Text>

      <View style={styles.map}>
        <Text>{places.length} lieux trouvés</Text>
        <Text>Carte interactive ici</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  map: {
    flex: 1,
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});