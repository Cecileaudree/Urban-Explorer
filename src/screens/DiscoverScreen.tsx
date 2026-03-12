import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from "react-native";
import { fetchPlaces, Place } from "../services/api";
import LieuCard from "../components/LieuCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";

export default function DiscoverScreen({ navigation }: any) {
  const { colors } = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPlaces = async (pageNumber = 0) => {
    try {
      const newPlaces = await fetchPlaces(pageNumber * 30);

      if (newPlaces.length === 0) {
        setHasMore(false);
        return;
      }

      if (pageNumber === 0) {
        setPlaces(newPlaces);
      } else {
        setPlaces((prev) => [...prev, ...newPlaces]);
      }
    } catch {
      setError("Impossible de charger les lieux.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPlaces(0);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setSearch("");
    setPage(0);
    await loadPlaces(0);
    setRefreshing(false);
  };

  const loadMore = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    const nextPage = page + 1;
    setPage(nextPage);

    loadPlaces(nextPage);
  };
  const filtered = places.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={[{ marginTop: 10 }, { color: colors.text }]}>
          Chargement des lieux...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="🔍 Rechercher un lieu..."
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LieuCard
              place={item}
              onPress={() =>
                navigation.navigate("PlaceDetail", { place: item })
              }
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#2563eb" />
            ) : null
          }
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.text }]}>
              Aucun lieu trouvé.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6f8",
  },
  searchBar: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 15,
  },
});
