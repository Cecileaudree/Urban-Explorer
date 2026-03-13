# 🏙️ Urban Explorer

**Urban Explorer** est une application mobile développée avec **React Native** et **Expo**.  
Elle permet aux utilisateurs de découvrir des **lieux culturels et activités à Paris** en temps réel, en utilisant les données de l’**API Open Data Paris** ("Que faire à Paris").

---

## 🏗️ 1. Architecture Globale

Urban Explorer adopte une **architecture modulaire** et **séparée par responsabilités** pour faciliter la maintenance et l’évolution du projet.

### **Navigation**

- **Root (Tab Navigator)** : Organise l’application en trois onglets principaux :  
  - **Découverte**  
  - **Carte**  
  - **Profil**  
- **Stack Navigator** : Imbriqué dans l’onglet "Découverte", il gère la navigation entre la liste des lieux et les détails d’un lieu.  
- **UX Dynamique** : Les icônes des onglets (via **Ionicons**) changent de style (plein vs contour) selon l’état actif pour une meilleure lisibilité.

### **Découpage des Composants**

- **Screens** : Composants de haut niveau gérant la logique métier, les permissions et les états (`DiscoverScreen.tsx`, `PlaceDetailScreen.tsx`, `ProfileScreen.tsx`).  
- **Components** : Éléments d’interface réutilisables (cartes de lieux, listes, carte abstraite).  
- **Types & Services** :  
  - Interfaces TypeScript   
  - Service API via **Axios** pour récupérer et normaliser les données

---

## 🌐 2. Intégration de l’API et gestion des données

L’application consomme l’**API Open Data Paris** ("Que faire à Paris").

### **Gestion des Requêtes**

- **Récupération** : Les 30 premiers lieux sont récupérés via **Axios**. Lorsque l’utilisateur fait défiler la liste, de nouveaux résultats sont chargés automatiquement grâce à un **scroll infini**.
- **Nettoyage des données** :
  - Exclusion des lieux sans coordonnées valides  
  - Images de secours générées via **Picsum Photos** si aucune image fournie  
  - Valeurs par défaut pour les descriptions ou adresses manquantes

### **Gestion de l’état**

- **Hooks React** : `useState` et `useEffect` pour gérer le cycle de vie des données.  
- **UI** :  
  - `ActivityIndicator` pour indiquer le chargement  
  - Messages d’erreur explicites en cas de défaillance réseau

---

## 📲 3. Composants natifs et permissions

### **A. Calendrier (`expo-calendar`)**

- **Fonctionnalité** : Ajouter un événement de visite directement depuis la fiche d’un lieu  
- **Permissions** : `requestCalendarPermissionsAsync`  
- **Optimisation** : Création automatique d’un calendrier dédié "**Urban Explorer**" si inexistant

### **B. Carte Interactive (`react-native-maps`)**

- **Fonctionnalité** : Visualiser les lieux sur une carte avec des marqueurs personnalisés  
- **Support multi-plateforme** :
  - Mobile : `MapView` + `Marker`  
  - Web : `NativeMap.web.tsx` pour message d’information alternatif (évite les crashs)

### **C. Caméra et Galerie (`expo-image-picker`)**

- **Fonctionnalité** : Personnaliser l’avatar du profil utilisateur  
- **Permissions** : Accès à la caméra et à la bibliothèque d’images  
- **Optimisation** : `allowsEditing` + ratio 1:1 pour uniformité des photos

---

## 🌟 4. Bonus et finitions

- **Recherche en temps réel** : Filtrage dynamique des lieux dans l’écran de découverte  
- **Localisation** : Calendrier en français via `react-native-calendars`  
- **Typage TypeScript** : Sécurisation complète des routes et paramètres de navigation
- **Dark Mode** : Gestion globale du thème via un `contexte React`
- **Scroll Infini** : Chargement de nouveaux lieux en scrollant
- **Animations** : Animation progressives des cartes de lieux, transition animée entre la liste et la page détail.
- **Actualisation des données** : Rechargement automatique des données de l'API.
- **UI/UX Polie** :  
  - Cartes avec ombres et arrondis  
  - Retours visuels après chaque action réussie (ajout calendrier, mise à jour photo)  
  - Icônes de barre d’onglets animées et adaptées à l’état actif

---

