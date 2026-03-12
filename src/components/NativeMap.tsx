import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

type Place = {
  id: string;
  title: string;
  address: string;
  lat: number;
  lon: number;
};

type Props = {
  places: Place[];
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  userLocation?: { latitude: number; longitude: number } | null;
};

export default function NativeMap({ places, region, userLocation }: Props) {
  return (
    <MapView style={styles.map} initialRegion={region} showsUserLocation={!!userLocation}>
      {places.map((place) => (
        <Marker
          key={place.id}
          coordinate={{ latitude: place.lat, longitude: place.lon }}
          title={place.title}
          description={place.address}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
