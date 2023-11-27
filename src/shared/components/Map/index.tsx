import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  Polyline,
} from "react-native-maps";
import IconBox from "../../../modules/register/components/IconBox";
import { useRef } from "react";
import { useTheme } from "styled-components/native";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

const Map = ({ coordinates, ...rest }: Props) => {
  const { colors } = useTheme();
  const mapRef = useRef<MapView>(null);
  const lastCordinate = coordinates[coordinates.length - 1];

  const onMapLoaded = async () => {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        edgePadding: { top: 100, right: 50, bottom: 50, left: 50 },
      });
    }
  };

  return (
    <MapView
      ref={mapRef}
      style={{ width: "100%", height: 200 }}
      region={{
        latitude: lastCordinate.latitude,
        longitude: lastCordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox
          icon={{ iconName: "FontAwesome5", name: "car" }}
          size="small"
        />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCordinate}>
            <IconBox
              icon={{ iconName: "FontAwesome5", name: "flag-checkered" }}
              size="small"
            />
          </Marker>

          <Polyline
            coordinates={[...coordinates]}
            strokeColor={colors.gray_700}
            strokeWidth={5}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
