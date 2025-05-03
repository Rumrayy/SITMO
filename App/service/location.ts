// import { Alert, Platform } from "react-native";
// import * as Location from "expo-location";
// import * as TaskManager from "expo-task-manager";
// import * as Notifications from "expo-notifications";
// import { getBatteryLevelAsync } from "expo-battery";
// import NetInfo from "@react-native-community/netinfo";
// import * as Device from "expo-device";
// import { getEstadoRepartidor, crearRecorrido } from './usuarioService';
// export const LOCATION_TASK_NAME = "background-location-task";
// export let locationCount = 0;
// let notificationShown = false;
// let notificationId = null;

// const showExplanationAlert = (title, message, onConfirm) => {
//   Alert.alert(
//     title,
//     message,
//     [
//       {
//         text: "Cancelar",
//         onPress: () => console.log("Permiso denegado"),
//         style: "cancel"
//       },
//       { text: "Aceptar", onPress: onConfirm }
//     ],
//     { cancelable: false }
//   );
// };

// const getDeviceData = async () => {
//   const batteryLevel = await getBatteryLevelAsync();
//   const netInfo = await NetInfo.fetch();
//   const isWifiEnabled = netInfo.type === "wifi";
//   const isCellularEnabled = netInfo.type === "cellular";

//   const connectionQuality = (() => {
//     if (netInfo.type === "wifi") {
//       const strength = netInfo.details.strength;
//       if (strength >= -50) return "Excellent";
//       if (strength >= -60) return "Good";
//       if (strength >= -70) return "Fair";
//       return "Poor";
//     } else if (netInfo.type === "cellular") {
//         const { downlink } = netInfo.details as { downlink?: number };
//         if (downlink !== undefined) {
//           if (downlink >= 10) return "Excellent";
//           if (downlink >= 5) return "Good";
//           if (downlink >= 2) return "Fair";
//           return "Poor";
//         }
//     } else {
//       return "Unknown";
//     }
//   })();

//   const deviceInfo = {
//     modelName: Device.modelName,
//     osName: Device.osName,
//     osVersion: Device.osVersion,
//     isDevice: Device.isDevice,
//     deviceName: Device.deviceName,
//     designName: Device.designName,
//     productName: Device.productName,
//     deviceYearClass: Device.deviceYearClass,
//     supportedCpuArchitectures: Device.supportedCpuArchitectures,
//     osBuildId: Device.osBuildId,
//   };

//   return {
//     batteryLevel,
//     isWifiEnabled,
//     isCellularEnabled,
//     connectionQuality,
//     deviceInfo,
//   };
// };

// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error("TaskManager Error:", error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     const deviceData = await getDeviceData();
//     locationCount += locations.length;
//     console.log("Received new locations", locations);
//     console.log(`Location count: ${locationCount}`);

//     const user = await getEstadoRepartidor(user.idUsuario);

//     try {
//       await crearRecorrido(
//         user.idUsuario,
//         locations[0].coords.latitude,
//         locations[0].coords.longitude,
//         user.idEstadoCatalogo,
//         deviceData.batteryLevel,
//         deviceData.isWifiEnabled,
//         deviceData.isCellularEnabled,
//         deviceData.connectionQuality,
//         deviceData.deviceInfo
//       );
//     } catch (postError) {
//       console.error("Error posting location data:", postError);
//     }

//     if (!notificationShown) {
//       await showPersistentNotification();
//     }
//   }
// });

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// const createNotificationChannel = async () => {
//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       sound: "default",
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//       lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
//     });
//   }
// };

// const showPersistentNotification = async () => {
//   await createNotificationChannel();

//   if (!notificationShown) {
//     Notifications.dismissAllNotificationsAsync();

//     notificationId = await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Pedidos carosa",
//         body: "Esta corriendo en segundo plano",
//         sticky: true,
//         tag: "7ab94390-182d-47ab-9ddd-ba96e2f53179",
//         priority: Notifications.AndroidNotificationPriority.MAX,
//         android: {
//           channelId: "default",
//           clickAction: "",
//         },
//       },
//       trigger: null,
//     });
//     notificationShown = true;
//     console.log(`Notification shown with ID: ${notificationId}`);
//   }
// };

// let foregroundSubscription = null;

// export const requestNotificationPermission = async () => {
//   const { status } = await Notifications.getPermissionsAsync();
//   if (status === "granted") {
//     return true;
//   }

//   return new Promise((resolve) => {
//     showExplanationAlert(
//       "Permiso de Notificación",
//       "La aplicación necesita permisos de notificación para informarle sobre el estado de las entregas mientras está en segundo plano.",
//       async () => {
//         const { status } = await Notifications.requestPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permiso Denegado", "Permiso para enviar notificaciones fue denegado.");
//           resolve(false);
//         } else {
//           resolve(true);
//         }
//       }
//     );
//   });
// };

// export const requestLocationPermissions = async () => {
//   const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
//   const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();

//   if (foregroundStatus === "granted" && backgroundStatus === "granted") {
//     return true;
//   }

//   return new Promise((resolve) => {
//     showExplanationAlert(
//       "Permiso de Ubicación en Primer Plano",
//       "La aplicación necesita permisos de ubicación en primer plano para rastrear las rutas de entrega mientras está en uso.",
//       async () => {
//         const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
//         if (foregroundStatus !== "granted") {
//           Alert.alert("Permiso Denegado", "Permiso para acceder a la ubicación en primer plano fue denegado.");
//           resolve(false);
//           return;
//         }

//         showExplanationAlert(
//           "Permiso de Ubicación en Segundo Plano",
//           "La aplicación necesita permisos de ubicación en segundo plano para seguir rastreando las rutas de entrega incluso cuando la aplicación no está en uso.",
//           async () => {
//             const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
//             if (backgroundStatus !== "granted") {
//               Alert.alert("Permiso Denegado", "Permiso para acceder a la ubicación en segundo plano fue denegado.");
//               resolve(false);
//               return;
//             }
//             resolve(true);
//           }
//         );
//       }
//     );
//   });
// };

// export const startLocationUpdates = async () => {
//   const notificationPermission = await requestNotificationPermission();
//   const locationPermissions = await requestLocationPermissions();
//   const timeInterval = 30000;
//   const distanceInterval = 0;
  
//   console.log(`Soy los intervalos de distancia ${distanceInterval} y tiempo ${timeInterval}`);

//   if (!notificationPermission || !locationPermissions) {
//     return false;
//   }

//   const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
//   if (hasStarted) {
//     console.log("Location tracking is already active.");
//     return true;
//   }

//   if (!notificationShown) {
//     await showPersistentNotification();
//   }

//   try {
//     // Start background location updates
//     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//       accuracy: Location.Accuracy.High,
//       timeInterval: 30000,
//       distanceInterval: 0,
//       deferredUpdatesInterval: 1000,
//       deferredUpdatesDistance: 50,
//       pausesUpdatesAutomatically: false,
//       showsBackgroundLocationIndicator: true,
//     });

//     // Start foreground location updates
//     foregroundSubscription = await Location.watchPositionAsync(
//       {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 30000,
//         distanceInterval: 0,
//       },
//       async (location) => {
//         locationCount++;
//         console.log("Foreground location:", location);

//         const user = await getEstadoRepartidor(user.idUsuario);

//         const deviceData = await getDeviceData();

//         try {
//           sendCoords(
//             user.idUsuario,
//             location.coords.latitude,
//             location.coords.longitude,
//             user.idEstadoCatalogo,
//             deviceData.batteryLevel,
//             deviceData.isWifiEnabled,
//             deviceData.isCellularEnabled,
//             deviceData.connectionQuality,
//             deviceData.deviceInfo
//           );
//           console.log("Location data posted successfully");
//         } catch (postError) {
//           console.error("Error posting location data:", postError);
//         }

//         if (!notificationShown) {
//           await showPersistentNotification();
//         }
//       }
//     );

//     return true;
//   } catch (error) {
//     console.log("Error starting location updates:", error);
//     Alert.alert(
//       "Error",
//       "Failed to start location tracking. Please check permissions and location settings."
//     );
//     return false;
//   }
// };

// export const getCurreLocation = async () => {
//   const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
//   if (foregroundStatus !== "granted") {
//     console.log("Permission to access location in the foreground was denied");
//     Alert.alert(
//       "Error",
//       "Permission to access location in the foreground was denied."
//     );
//     return false;
//   }
//   const location = await Location.getCurrentPositionAsync({});
//   return location;
// };

// export const stopLocationTracking = async () => {
//   try {
//     if (foregroundSubscription) {
//       foregroundSubscription.remove();
//       foregroundSubscription = null;
//       console.log("Foreground location tracking has been stopped");
//     } else {
//       console.log("No foreground subscription to remove");
//     }

//     const hasStarted = await Location.hasStartedLocationUpdatesAsync(
//       LOCATION_TASK_NAME
//     );

//     if (hasStarted) {
//       await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
//       console.log("Background location tracking has been stopped");
//     } else {
//       console.log("Background location updates were not active");
//     }

//     notificationShown = false;

//     Notifications.dismissAllNotificationsAsync();
//     if (notificationId) {
//       await Notifications.cancelScheduledNotificationAsync(notificationId);
//       console.log("Persistent notification has been cancelled");
//       notificationId = null;
//     }

//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log("Completed stopping location tracking");
//   } catch (error) {
//     console.log("Error stopping location updates:", error);
//   }
// };

// function sendCoords(idUsuario: number, latitude: number, longitude: number, idEstadoCatalogo: number, batteryLevel: number, isWifiEnabled: boolean, isCellularEnabled: boolean, connectionQuality: string, deviceInfo: { modelName: string; osName: string; osVersion: string; isDevice: boolean; deviceName: string; designName: string; productName: string; deviceYearClass: number; supportedCpuArchitectures: string[]; osBuildId: string; }) {
//   throw new Error("Function not implemented.");
// }
