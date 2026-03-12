import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlaceDetailScreen({ route }: any) {
  const { place } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>

      <View style={styles.card}>
        <Text style={styles.description}>{place.description}</Text>
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

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },

  description: {
    fontSize: 16,
    color: "#555",
  },
});