import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import api from '../config/api';

const imageService = {
  /**
   * Demander permission caméra (Android)
   */
  requestCameraPermission: async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permission Caméra',
            message: "L'application a besoin d'accéder à la caméra pour prendre des photos",
            buttonNeutral: 'Plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'Autoriser',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Erreur permission caméra:', err);
        return false;
      }
    }
    return true;
  },

  /**
   * Ouvrir la galerie photo
   * @param {number} maxPhotos - Nombre maximum de photos à sélectionner (0 = illimité)
   */
  pickFromGallery: async (maxPhotos = 5) => {
    return new Promise((resolve, reject) => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.8,
          maxWidth: 1920,
          maxHeight: 1920,
          selectionLimit: maxPhotos,
        },
        (response) => {
          if (response.didCancel) {
            console.log('Sélection annulée');
            resolve(null);
          } else if (response.errorCode) {
            console.error('Erreur galerie:', response.errorMessage);
            reject(new Error(response.errorMessage));
          } else if (response.assets && response.assets.length > 0) {
            resolve(response.assets);
          } else {
            resolve(null);
          }
        }
      );
    });
  },

  /**
   * Prendre une photo avec la caméra
   */
  takePhoto: async () => {
    const hasPermission = await imageService.requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission refusée',
        "L'accès à la caméra est nécessaire pour prendre des photos"
      );
      throw new Error('Permission caméra refusée');
    }

    return new Promise((resolve, reject) => {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.8,
          maxWidth: 1920,
          maxHeight: 1920,
          saveToPhotos: true,
          cameraType: 'back',
        },
        (response) => {
          if (response.didCancel) {
            console.log('Photo annulée');
            resolve(null);
          } else if (response.errorCode) {
            console.error('Erreur caméra:', response.errorMessage);
            reject(new Error(response.errorMessage));
          } else if (response.assets && response.assets.length > 0) {
            resolve(response.assets[0]);
          } else {
            resolve(null);
          }
        }
      );
    });
  },

  /**
   * Upload une image vers le backend (qui uploade vers Supabase)
   * @param {Object} imageAsset - Asset image de react-native-image-picker
   * @param {number} parkingId - ID du parking
   * @param {number} userId - ID de l'utilisateur
   * @param {boolean} isPrimary - Image principale ou non
   */
  uploadParkingImage: async (imageAsset, parkingId, userId, isPrimary = false) => {
    try {
      const fileUri = imageAsset.uri;
      const fileName = imageAsset.fileName || `image_${Date.now()}.jpg`;

      console.log('📤 Conversion image en base64:', fileName);

      // Convertir l'image en base64
      const response = await fetch(fileUri);
      const blob = await response.blob();
      
      // Lire le blob comme base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1]; // Enlever le préfixe data:image/...
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      console.log('📤 Envoi au backend - Taille base64:', base64.length, 'caractères');

      // Envoyer au backend
      const uploadResponse = await api.post(`/parking-images/${parkingId}/upload`, {
        imageBase64: base64,
        fileName: fileName,
        userId: userId,
        isPrimary: isPrimary
      });

      console.log('✅ Image uploadée avec succès:', uploadResponse.data);

      return {
        filePath: uploadResponse.data.filePath,
        fileUrl: uploadResponse.data.fileUrl,
        fileSize: uploadResponse.data.fileSize,
      };
    } catch (error) {
      console.error('❌ Erreur upload image:', error);
      console.error('❌ Détails:', error.response?.data);
      throw error;
    }
  },

  /**
   * Sauvegarder metadata dans PostgreSQL via Spring Boot
   * @param {number} parkingId - ID du parking
   * @param {Object} imageData - Données de l'image (filePath, fileUrl, fileSize)
   * @param {boolean} isPrimary - Image principale ou non
   */
  saveParkingImageMetadata: async (parkingId, imageData, isPrimary = false) => {
    try {
      const response = await api.post(`/parking-images/${parkingId}`, {
        filePath: imageData.filePath,
        fileUrl: imageData.fileUrl,
        fileSize: imageData.fileSize,
        isPrimary: isPrimary,
      });
      console.log('Metadata sauvegardée:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur sauvegarde metadata:', error);
      throw error;
    }
  },

  /**
   * Récupérer les images d'un parking
   * @param {number} parkingId - ID du parking
   */
  getParkingImages: async (parkingId) => {
    try {
      const response = await api.get(`/parking-images/${parkingId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération images:', error);
      throw error;
    }
  },

  /**
   * Supprimer une image (Storage + metadata)
   * @param {number} parkingId - ID du parking
   * @param {string} filePath - Chemin du fichier dans Supabase
   */
  deleteParkingImage: async (parkingId, filePath) => {
    try {
      // Supprimer de Supabase Storage
      const { error: storageError } = await supabase.storage
        .from('parking-images')
        .remove([filePath]);

      if (storageError) {
        console.error('Erreur suppression Storage:', storageError);
        throw storageError;
      }

      // Supprimer metadata de PostgreSQL
      await api.delete(`/parking-images/${parkingId}/file?filePath=${encodeURIComponent(filePath)}`);
      
      console.log('Image supprimée avec succès');
      return { success: true };
    } catch (error) {
      console.error('Erreur suppression image:', error);
      throw error;
    }
  },

  /**
   * Afficher un menu pour choisir entre galerie et caméra
   */
  showImagePickerOptions: () => {
    return new Promise((resolve) => {
      Alert.alert(
        'Ajouter une photo',
        'Choisissez une source',
        [
          {
            text: 'Galerie',
            onPress: async () => {
              try {
                const images = await imageService.pickFromGallery(5);
                resolve({ source: 'gallery', images });
              } catch (error) {
                resolve({ source: 'gallery', images: null, error });
              }
            },
          },
          {
            text: 'Caméra',
            onPress: async () => {
              try {
                const image = await imageService.takePhoto();
                resolve({ source: 'camera', images: image ? [image] : null });
              } catch (error) {
                resolve({ source: 'camera', images: null, error });
              }
            },
          },
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: () => resolve({ source: null, images: null }),
          },
        ],
        { cancelable: true }
      );
    });
  },
};

export default imageService;
