import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Switch } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "L'accès à la caméra est nécessaire pour prendre une photo.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "L'accès à la galerie est nécessaire.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Mon Profil</Text>

        <View style={styles.avatarContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>📷</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>📸 Prendre un selfie</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={pickFromGallery}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            🖼️ Choisir depuis la galerie
          </Text>
        </TouchableOpacity>

        {photo && (
          <Text style={styles.success}>Photo de profil mise à jour !</Text>
        )}
        <View style={[styles.settingsRow, { backgroundColor: colors.card }]}>
          <Ionicons
            name={isDarkMode ? "moon" : "sunny"}
            size={22}
            color={colors.text}
          />

          <Text style={[styles.settingsText, { color: colors.text }]}>
            Mode sombre
          </Text>

          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1a1a2e",
  },
  avatarContainer: {
    marginBottom: 30,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: "#2563eb",
  },
  avatarPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 50,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 12,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#2563eb",
  },
  secondaryButtonText: {
    color: "#2563eb",
  },
  success: {
    marginTop: 20,
    fontSize: 15,
    color: "#16a34a",
    fontWeight: "600",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 30,
    borderRadius: 12,
    width: "80%",
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});
