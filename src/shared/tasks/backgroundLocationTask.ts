import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";

export const LOCATION_TASK_NAME = "locatio-tracking";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: any) => {
  try {
    if (error) {
      throw error;
    }

    const { coords, timestamp } = data.locations[0];

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    };

    console.log({ currentLocation });
  } catch (error) {
    console.log(error);
  }
});

export const startLocationTast = async () => {
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
