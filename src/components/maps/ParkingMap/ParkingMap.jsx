import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { parkingMapStyles as styles } from './ParkingMap.styles';
import { colors } from '../../../theme';

const ParkingMap = ({ parkings, onMarkerPress, scrollEnabled }) => {
  const webViewRef = useRef(null);
  const [isMapTouched, setIsMapTouched] = useState(false);

  // Parse les coordonnées POINT au format "POINT(longitude latitude)"
  const parseCoordinates = (pointString) => {
    if (!pointString) return null;
    
    // Format: "POINT(47.506 -18.9137)"
    const match = pointString.match(/POINT\(([0-9.-]+)\s+([0-9.-]+)\)/);
    if (match) {
      return {
        latitude: parseFloat(match[2]),
        longitude: parseFloat(match[1])
      };
    }
    return null;
  };

  // Convertir les parkings en format JSON pour la carte
  const parkingsData = parkings.map((parking, index) => {
    // Utiliser directement latitude/longitude si disponibles (depuis les getters backend)
    let coords;
    if (parking.latitude && parking.longitude) {
      coords = {
        latitude: parking.latitude,
        longitude: parking.longitude
      };
    } else {
      // Sinon parser le champ localisation (fallback)
      coords = parseCoordinates(parking.localisation);
    }
    
    if (!coords) {
      return null;
    }

    const parkingId = parking.id_Parking || parking.Id_Parking || parking.id_parking || parking.id || parking.parkingId;
    
    return {
      id: parkingId || index,
      label: parking.label || 'Parking',
      description: parking.description || '',
      price: parking.hourlyRate || parking.hourly_rate || 0,
      latitude: coords.latitude,
      longitude: coords.longitude
    };
  }).filter(p => p !== null);

  // Calculer le centre et le zoom
  const getMapCenter = () => {
    if (parkingsData.length === 0) {
      return { lat: -18.9137, lng: 47.506, zoom: 13 };
    }

    const latitudes = parkingsData.map(p => p.latitude);
    const longitudes = parkingsData.map(p => p.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Calculer un zoom approprié en fonction de la dispersion des points
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);

    let zoom = 13;
    if (maxDiff > 0.5) zoom = 10;
    else if (maxDiff > 0.1) zoom = 12;
    else if (maxDiff > 0.05) zoom = 13;
    else zoom = 14;

    return { lat: centerLat, lng: centerLng, zoom };
  };

  const mapCenter = getMapCenter();

  // HTML de la carte avec Leaflet.js
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    #map {
      width: 100%;
      height: 100vh;
    }
    .custom-marker {
      background-color: #007AFF;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      border: 3px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }
    .leaflet-popup-content-wrapper {
      border-radius: 8px;
    }
    .leaflet-popup-content {
      margin: 10px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .parking-popup h3 {
      margin: 0 0 5px 0;
      font-size: 16px;
      color: #2D3436;
    }
    .parking-popup p {
      margin: 3px 0;
      font-size: 13px;
      color: #636E72;
    }
    .parking-popup .price {
      color: #6BBF47;
      font-weight: bold;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    // Initialiser la carte
    const map = L.map('map').setView([${mapCenter.lat}, ${mapCenter.lng}], ${mapCenter.zoom});

    // Ajouter le fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Données des parkings
    const parkings = ${JSON.stringify(parkingsData)};

    // Créer une icône personnalisée
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });

    // Ajouter les marqueurs
    parkings.forEach(parking => {
      const marker = L.marker([parking.latitude, parking.longitude], { icon: customIcon })
        .addTo(map);
      
      // Contenu du popup
      const popupContent = \`
        <div class="parking-popup">
          <h3>\${parking.label}</h3>
          <p>\${parking.description}</p>
          <p class="price">\${parking.price}Ar/heure</p>
        </div>
      \`;
      
      marker.bindPopup(popupContent);
      
      // Gérer le clic sur le marqueur
      marker.on('click', () => {
        // Envoyer un message à React Native
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'markerClick',
          parkingId: parking.id
        }));
      });
    });

    // Ajuster la vue pour inclure tous les marqueurs
    if (parkings.length > 0) {
      const bounds = L.latLngBounds(parkings.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  </script>
</body>
</html>
  `;

  // Gérer les messages de la WebView
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'markerClick' && onMarkerPress) {
        // Trouver le parking correspondant
        const parking = parkings.find(p => {
          const parkingId = p.id_Parking || p.Id_Parking || p.id_parking || p.id || p.parkingId;
          return parkingId === data.parkingId;
        });
        
        if (parking) {
          onMarkerPress(parking);
        }
      }
    } catch (error) {
      console.error('Erreur lors du traitement du message WebView:', error);
    }
  };

  if (parkingsData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="map-outline" size={50} color={colors.border.light} />
        <Text style={styles.emptyText}>Aucun parking à afficher</Text>
      </View>
    );
  }

  return (
    <View 
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {
        // Désactiver le scroll du parent quand on touche la carte
        if (scrollEnabled) {
          scrollEnabled(false);
        }
        setIsMapTouched(true);
      }}
      onResponderRelease={() => {
        // Réactiver le scroll du parent quand on relâche
        if (scrollEnabled) {
          scrollEnabled(true);
        }
        setIsMapTouched(false);
      }}
    >
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleMessage}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text style={styles.loadingText}>Chargement de la carte...</Text>
          </View>
        )}
        // Permettre les gestes tactiles dans la WebView
        nestedScrollEnabled={true}
        onTouchStart={() => {
          if (scrollEnabled) scrollEnabled(false);
        }}
        onTouchEnd={() => {
          if (scrollEnabled) scrollEnabled(true);
        }}
      />
    </View>
  );
};

export default ParkingMap;
