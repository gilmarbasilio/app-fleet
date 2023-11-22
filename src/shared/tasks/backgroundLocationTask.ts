import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useLocationStore } from "../store/uselocationStorage";

export const LOCATION_TASK_NAME = "location-tracking";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: any) => {
  const setLocation = useLocationStore((state) => state.setLocation);

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

      setLocation(currentLocation);
    }
  } catch (error) {
    console.log(error);
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
      timeInterval: 1000,
    });
  } catch (error) {
    console.log(error);
  }
};

export const stopLocationTask = async () => {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
      await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
  } catch (error) {
    console.log(error);
  }
};
