import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchPlaces, Place } from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import NativeMap from "../components/NativeMap";

const PARIS_REGION = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function MapScreen() {
  const { colors } = useContext(ThemeContext);

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces()
      .then(setPlaces)
      .catch((err) => console.log("Erreur carte :", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10, color: colors.text }}>
          Chargement de la carte...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NativeMap places={places} region={PARIS_REGION} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
