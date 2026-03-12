import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import * as ExpoCalendar from "expo-calendar";

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

async function getOrCreateCalendarId(): Promise<string | null> {
  const calendars = await ExpoCalendar.getCalendarsAsync(
    ExpoCalendar.EntityTypes.EVENT,
  );
  const defaultCal = calendars.find((c) => c.allowsModifications && c.source);
  if (defaultCal) return defaultCal.id;

  // Créer un calendrier si aucun n'est dispo
  const newCalId = await ExpoCalendar.createCalendarAsync({
    title: "Urban Explorer",
    color: "#2563eb",
    entityType: ExpoCalendar.EntityTypes.EVENT,
    source: calendars[0]?.source || {
      name: "Urban Explorer",
      type: "LOCAL" as any,
    },
    name: "urbanexplorer",
    ownerAccount: "personal",
    accessLevel: ExpoCalendar.CalendarAccessLevel.OWNER,
  });
  return newCalId;
}

export default function PlaceDetailScreen({ route }: any) {
  const { colors, isDarkMode } = useContext(ThemeContext);
  const { place } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarPermission, setCalendarPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
      setCalendarPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert(
          "Permission requise",
          "L'accès au calendrier est nécessaire pour planifier vos visites.",
        );
      }
    })();
  }, []);

  const onDayPress = async (day: any) => {
    setSelectedDate(day.dateString);

    if (!calendarPermission) {
      Alert.alert(
        "Permission refusée",
        "Impossible d'ajouter au calendrier sans permission.",
      );
      return;
    }

    try {
      const calendarId = await getOrCreateCalendarId();
      if (!calendarId) {
        Alert.alert("Erreur", "Aucun calendrier disponible sur cet appareil.");
        return;
      }

      const startDate = new Date(day.dateString + "T10:00:00");
      const endDate = new Date(day.dateString + "T18:00:00");

      await ExpoCalendar.createEventAsync(calendarId, {
        title: `Visite : ${place.title}`,
        location: place.address,
        startDate,
        endDate,
        notes: `Visite planifiée via Urban Explorer`,
      });

      Alert.alert(
        "Visite planifiée ✅",
        `Visite au "${place.title}" ajoutée à votre calendrier le ${day.dateString}`,
      );
    } catch (error) {
      console.log("Erreur calendrier :", error);
      Alert.alert("Erreur", "Impossible d'ajouter l'événement au calendrier.");
    }
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
