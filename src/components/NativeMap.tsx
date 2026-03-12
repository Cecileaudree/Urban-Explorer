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
};

export default function NativeMap({ places, region }: Props) {
  return (
    <MapView style={styles.map} initialRegion={region}>
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
