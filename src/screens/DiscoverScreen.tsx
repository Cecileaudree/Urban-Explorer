import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

type Place = {
  id: number;
  name: string;
  description: string;
};

export default function DiscoverScreen({ navigation }: any) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      const response = await fetch("https://example.com/api/places");
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.log("Erreur API :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Chargement des lieux...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Découvrir la ville</Text>

      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("PlaceDetail", { place: item })
            }
          >
            <Text style={styles.placeTitle}>{item.name}</Text>
            <Text style={styles.placeDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  placeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  placeDescription: {
    marginTop: 5,
    color: "#555",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});