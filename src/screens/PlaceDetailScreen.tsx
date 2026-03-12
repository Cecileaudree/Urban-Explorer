import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avr.",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

export default function PlaceDetailScreen({ route }: any) {
  const { colors, isDarkMode } = useContext(ThemeContext);
  const { place } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    Alert.alert(
      "Visite planifiée ✅",
      `Visite au "${place.title}" planifiée le ${day.dateString}`,
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Image source={{ uri: place.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {place.title}
          </Text>
          <Text style={[styles.address, { color: colors.placeholder }]}>
            📍 {place.address}
          </Text>
          {place.description ? (
            <Text style={[styles.description, { color: colors.text }]}>
              {place.description}
            </Text>
          ) : null}

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📅 Planifier une visite
          </Text>

          <Calendar
            onDayPress={onDayPress}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: "#2563eb",
                    },
                  }
                : {}
            }
            theme={
              {
                backgroundColor: colors.card,
                calendarBackground: colors.card,

                textSectionTitleColor: colors.placeholder,
                dayTextColor: colors.text,
                monthTextColor: colors.text,

                todayTextColor: "#2563eb",
                arrowColor: "#2563eb",

                selectedDayBackgroundColor: "#2563eb",
                selectedDayTextColor: "#ffffff",

                textDisabledColor: "#555",

                /** correction dark mode */
                "stylesheet.calendar.main": {
                  container: {
                    backgroundColor: colors.card,
                  },
                },
              } as any
            }
          />

          {selectedDate && (
            <View
              style={[
                styles.confirmationBox,
                { backgroundColor: isDarkMode ? "#1f3d2b" : "#dcfce7" },
              ]}
            >
              <Text
                style={[
                  styles.confirmationText,
                  { color: isDarkMode ? "#86efac" : "#166534" },
                ]}
              >
                ✅ Visite au "{place.title}" planifiée le {selectedDate}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  image: {
    width: "100%",
    height: 220,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 10,
    marginTop: 10,
  },
  confirmationBox: {
    backgroundColor: "#dcfce7",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 30,
  },
  confirmationText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
