import React, { useState, useEffect, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Platform, StatusBar,
  SafeAreaView, Alert } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  
  const [cameraType, setCameraType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const [galleryItems, setGalleryItems] = useState([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      // Request all required permissions
      await requestCameraPermission();
      await requestMicrophonePermission();
      await requestMediaPermission();
      
      if (mediaPermission?.granted) {
        loadGalleryImages();
      }
    })();
  }, []);

  const loadGalleryImages = async () => {
    setIsGalleryLoading(true);
    
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'photo',
        sortBy: ['creationTime'],
        first: 20,
      });
      
      setGalleryItems(media.assets);
    } catch (error) {
      console.error('Error loading gallery images:', error);
      Alert.alert('Error', 'Failed to load gallery images');
    } finally {
      setIsGalleryLoading(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        // Save to media library
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        // Reload gallery to show new image
        loadGalleryImages();
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  const handleGalleryItemPress = (item) => {
    setSelectedImage(item.uri);
  };

  if (!cameraPermission) {
    return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
  }
  
  if (!cameraPermission.granted || !mediaPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>We need your permission to use the camera and gallery</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={() => {
            requestCameraPermission();
            requestMediaPermission();
          }}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerOptions}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleFlash}>
            <Ionicons 
              name={flashMode === 'on' ? "flash" : "flash-off"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={cameraType}
          flash={flashMode}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
          <Ionicons name="images" size={28} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
          <Ionicons name="camera-reverse" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Gallery Preview */}
      <View style={styles.galleryContainer}>
        {isGalleryLoading ? (
          <View style={styles.galleryLoading}>
            <Text style={styles.galleryLoadingText}>Loading gallery...</Text>
          </View>
        ) : (
          <FlatList
            data={galleryItems}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.galleryItem}
                onPress={() => handleGalleryItemPress(item)}
              >
                <Image source={{ uri: item.uri }} style={styles.galleryImage} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  galleryContainer: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  galleryImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  // Add other styles as needed
});

export default CameraScreen;