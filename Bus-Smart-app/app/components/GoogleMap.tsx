import * as React from "react";
import { Card, CardHeader, CardContent, Box, Typography } from "@mui/material";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

type GoogleMapCardProps = {
  title?: string;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  height?: number | string;
};

export default function GoogleMapCard({
  title = "Vị trí",
  center = { lat: 10.776889, lng: 106.700806 },
  zoom = 13,
  height = 400,
}: GoogleMapCardProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [infoOpen, setInfoOpen] = React.useState(false);

  if (loadError) {
    return (
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <Typography color="error">Không tải được Google Maps. Kiểm tra API key & billing.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ overflow: "hidden", borderRadius: 3 }}>
      <CardHeader title={title} />
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ height, width: "100%" }}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={center}
              zoom={zoom}
              options={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: true,
                gestureHandling: "greedy",
              }}
            >
              <Marker position={center} onClick={() => setInfoOpen(true)} />
              {infoOpen && (
                <InfoWindow position={center} onCloseClick={() => setInfoOpen(false)}>
                  <Box sx={{ p: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Điểm trung tâm
                    </Typography>
                    <Typography variant="body2">
                      lat: {center.lat.toFixed(6)}, lng: {center.lng.toFixed(6)}
                    </Typography>
                  </Box>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography variant="body2">Đang tải bản đồ…</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}