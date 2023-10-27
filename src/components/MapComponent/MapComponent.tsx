import type { position_t } from '@/schema/shared-schema/utils/geojson';
import type { FeatureCollection } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

type MapComponentProps = {
  data: FeatureCollection;
  center: position_t;
  zoom?: number;
};

export function MapComponent({ data, center, zoom }: MapComponentProps) {
  return (
    <MapContainer center={center} zoom={zoom ?? 13} className="h-[300px]">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={data}
        onEachFeature={(feature, layer) => {
          layer.bindPopup(feature.properties.popup);
        }}
      />
    </MapContainer>
  );
}
