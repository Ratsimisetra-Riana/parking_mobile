import React, { useRef, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { parkingMapPickerStyles as styles } from './ParkingMapPicker.styles';
import { colors } from '../../../theme';

/**
 * Carte interactive pour sélectionner une localisation
 * Le marqueur est déplaçable (draggable)
 */
const ParkingMapPicker = ({ latitude, longitude, onLocationChange }) => {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Coordonnées par défaut (Antananarivo)
  const defaultLat = latitude || -18.9137;
  const defaultLng = longitude || 47.506;

  // HTML de la carte avec Leaflet.js et marqueur draggable
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
    .info-box {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      font-family: Arial, sans-serif;
      text-align: center;
      max-width: 90%;
    }
    .info-title {
      font-weight: bold;
      margin-bottom: 4px;
      color: #007AFF;
    }
    .info-coords {
      font-size: 12px;
      color: #666;
    }
  </style>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
<body>
  <div class="info-box">
    <div class="info-title">📍 Déplacez le marqueur</div>
    <div class="info-coords" id="coords">Lat: ${defaultLat.toFixed(6)}, Lng: ${defaultLng.toFixed(6)}</div>
  </div>
  <div id="map"></div>
  
  <script>
    // Initialiser la carte
    const map = L.map('map').setView([${defaultLat}, ${defaultLng}], 15);
    
    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    
    // Icône personnalisée pour le marqueur
    const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCAzMCA0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUgMEMxMC4wMjk0IDAgNiA0LjAyOTQzIDYgOUM2IDEzLjk3MDYgMTUgMzAgMTUgMzBDMTUgMzAgMjQgMTMuOTcwNiAyNCA5QzI0IDQuMDI5NDMgMTkuOTcwNiAwIDE1IDBaIiBmaWxsPSIjMDA3QUZGII8+PGNpcmNsZSBjeD0iMTUiIGN5PSI5IiByPSI1IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
      iconSize: [30, 45],
      iconAnchor: [15, 45],
      popupAnchor: [0, -45]
    });
    
    // Créer le marqueur DRAGGABLE
    const marker = L.marker([${defaultLat}, ${defaultLng}], {
      icon: customIcon,
      draggable: true,
      autoPan: true
    }).addTo(map);
    
    marker.bindPopup('🎯 Position du parking').openPopup();
    
    // Fonction pour envoyer les coordonnées à React Native
    function sendCoordinates(lat, lng) {
      const coords = {
        latitude: lat,
        longitude: lng
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(coords));
      
      // Mettre à jour l'affichage
      document.getElementById('coords').textContent = 
        'Lat: ' + lat.toFixed(6) + ', Lng: ' + lng.toFixed(6);
    }
    
    // Événement quand le marqueur est déplacé
    marker.on('dragend', function(event) {
      const position = marker.getLatLng();
      sendCoordinates(position.lat, position.lng);
    });
    
    // Événement au clic sur la carte (déplacer le marqueur)
    map.on('click', function(e) {
      marker.setLatLng(e.latlng);
      sendCoordinates(e.latlng.lat, e.latlng.lng);
      marker.openPopup();
    });
    
    // Charger les tuiles
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  </script>
</body>
</html>
  `;

  // Gérer les messages de la WebView
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.latitude && data.longitude) {
        onLocationChange(data.latitude, data.longitude);
      }
    } catch (error) {
      console.error('Erreur parsing message WebView:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.info.main} />
          <Text style={styles.loadingText}>Chargement de la carte...</Text>
        </View>
      )}
      
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        onMessage={handleMessage}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
      />
      
      <View style={styles.helpBox}>
        <Ionicons name="information-circle-outline" size={20} color={colors.info.main} />
        <Text style={styles.helpText}>
          Déplacez le marqueur ou cliquez sur la carte pour choisir la position
        </Text>
      </View>
    </View>
  );
};

export default ParkingMapPicker;
