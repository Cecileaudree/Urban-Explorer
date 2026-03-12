import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Place = {
  id: string;
  title: string;
  address: string;
  lat: number;
  lon: number;
};

type Props = {
  places: Place[];
  region: any;
};

export default function NativeMap({ places }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🗺️</Text>
      <Text style={styles.text}>La carte n'est pas disponible sur le web.</Text>
      <Text style={styles.subtext}>Testez sur un appareil mobile avec Expo Go.</Text>
      <Text style={styles.count}>{places.length} lieux chargés depuis l'API</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  icon: {
    fontSize: 50,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
  subtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  count: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563eb",
  },
});
