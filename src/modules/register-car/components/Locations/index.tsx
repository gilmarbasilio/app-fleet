import { Container, Line } from "./styles";
import LocationInfo, { LocationInfoProps } from "../LocationInfo";

type Props = {
  departure: LocationInfoProps;
  arrival?: LocationInfoProps | null;
};

export function Locations({ arrival = null, departure }: Props) {
  return (
    <Container>
      <LocationInfo
        icon={{
          iconName: "FontAwesome5",
          name: "car",
        }}
        label={departure.label}
        description={departure.description}
      />

      {arrival && (
        <>
          <Line />

          <LocationInfo
            icon={{
              iconName: "FontAwesome5",
              name: "flag-checkered",
            }}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </Container>
  );
}
