import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";
import {
  removeStorageLocations,
  saveStorageLocation,
} from "../storage/locationStorage";

export const LOCATION_TASK_NAME = "location-tracking";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: any) => {
  try {
    if (error) {
      throw error;
    }

    if (data) {
      const { coords, timestamp } = data.locations[0];

      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp,
      };

      await saveStorageLocation(currentLocation);
    }
  } catch (error) {
    await stopLocationTask();
  }
});

export const startLocationTask = async () => {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

    if (hasStarted) {
      await stopLocationTask();
    }

    await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 10000,
    });
  } catch (error) {
    throw error;
  }
};

export const stopLocationTask = async () => {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
      await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      await removeStorageLocations();
    }
  } catch (error) {
    throw error;
  }
};
