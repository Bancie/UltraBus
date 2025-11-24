import * as React from 'react';
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material';
import { GoogleMap, Marker, InfoWindow, Polyline, useJsApiLoader } from '@react-google-maps/api';

type MapMarker = {
  id: string | number;
  position: google.maps.LatLngLiteral;
  title?: string;
  description?: string;
  label?: string;
  icon?: google.maps.Icon | google.maps.Symbol;
  iconColor?: string;
  iconScale?: number;
  zIndex?: number;
};

type MapPolyline = {
  id: string | number;
  path: google.maps.LatLngLiteral[];
  options?: google.maps.PolylineOptions;
};

type GoogleMapCardProps = {
  title?: string;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  height?: number | string;
  markers?: MapMarker[];
  variant?: 'card' | 'embed';
  polylines?: MapPolyline[];
};

const FALLBACK_CENTER: google.maps.LatLngLiteral = {
  lat: 10.776889,
  lng: 106.700806,
};

export default function GoogleMapCard({
  title = 'Vị trí',
  center,
  zoom = 13,
  height = 400,
  markers = [],
  variant = 'card',
  polylines = [],
}: GoogleMapCardProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [defaultInfoOpen, setDefaultInfoOpen] = React.useState(false);
  const [activeMarkerId, setActiveMarkerId] = React.useState<string | number | null>(null);

  const hasMarkers = markers.length > 0;
  const resolvedCenter = center ?? (hasMarkers ? markers[0].position : FALLBACK_CENTER);

  const mapContent = (
    <Box sx={{ height, width: '100%' }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={resolvedCenter}
          zoom={zoom}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: true,
            gestureHandling: 'greedy',
          }}
        >
          {polylines.map((polyline) => (
            <Polyline key={polyline.id} path={polyline.path} options={polyline.options} />
          ))}
          {hasMarkers ? (
            markers.map((marker) => {
              const resolvedIcon =
                marker.icon ??
                (marker.iconColor && (window as typeof window & { google?: typeof google }).google
                  ? {
                      path: google.maps.SymbolPath.CIRCLE,
                      fillColor: marker.iconColor,
                      fillOpacity: 1,
                      strokeColor: '#ffffff',
                      strokeWeight: 2,
                      scale: marker.iconScale ?? 6,
                    }
                  : undefined);

              return (
                <React.Fragment key={marker.id}>
                  <Marker
                    position={marker.position}
                    onClick={() => setActiveMarkerId(marker.id)}
                    label={marker.label}
                    icon={resolvedIcon}
                    zIndex={marker.zIndex}
                  />
                  {activeMarkerId === marker.id && (
                    <InfoWindow
                      position={marker.position}
                      onCloseClick={() => setActiveMarkerId(null)}
                    >
                      <Box sx={{ p: 0.5 }}>
                        {marker.title && (
                          <Typography variant="subtitle2" fontWeight={600}>
                            {marker.title}
                          </Typography>
                        )}
                        {marker.description && (
                          <Typography variant="body2">{marker.description}</Typography>
                        )}
                      </Box>
                    </InfoWindow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <>
              <Marker position={resolvedCenter} onClick={() => setDefaultInfoOpen(true)} />
              {defaultInfoOpen && (
                <InfoWindow
                  position={resolvedCenter}
                  onCloseClick={() => setDefaultInfoOpen(false)}
                >
                  <Box sx={{ p: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Điểm trung tâm
                    </Typography>
                    <Typography variant="body2">
                      lat: {resolvedCenter.lat.toFixed(6)}, lng: {resolvedCenter.lng.toFixed(6)}
                    </Typography>
                  </Box>
                </InfoWindow>
              )}
            </>
          )}
        </GoogleMap>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography variant="body2">Đang tải bản đồ…</Typography>
        </Box>
      )}
    </Box>
  );

  if (variant === 'embed') {
    if (loadError) {
      return (
        <Box
          sx={{
            height,
            width: '100%',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Typography color="error" variant="body2">
            Không tải được Google Maps. Kiểm tra API key & billing.
          </Typography>
        </Box>
      );
    }

    return mapContent;
  }

  if (loadError) {
    return (
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <Typography color="error">
            Không tải được Google Maps. Kiểm tra API key & billing.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ overflow: 'hidden', borderRadius: 3 }}>
      <CardHeader title={title} />
      <CardContent sx={{ p: 0 }}>{mapContent}</CardContent>
    </Card>
  );
}
