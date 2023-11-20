import { View, Text } from "react-native";
import MapView, { LatLng, MapViewProps } from "react-native-maps";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

const Map = ({ coordinates, ...rest }: Props) => {
  const lastCordinate = coordinates[coordinates.length - 1];

  return (
    <MapView
      style={{ width: "100%", height: 200 }}
      region={{
        latitude: lastCordinate.latitude,
        longitude: lastCordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      {...rest}
    />
  );
};

export default Map;
