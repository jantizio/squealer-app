import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import type { FeatureCollection, Feature, GeoJsonObject } from 'geojson';

import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

const test: GeoJsonObject = {
  type: 'Feature',
  bbox: [11.1209201, 46.0676632, 11.1220355, 46.0686443],
};

// customize the marker icon
// const pointToLayer = (feature, latlng) => {
//   return L.marker(latlng, {
//     icon: L.divIcon({
//       className: 'custom-icon',
//       html: ReactDOMServer.renderToString(<MapPin />), // Use the MapPin SVG
//     }),
//   });
// };

export function MapComponent() {
  return (
    <MapContainer center={[50.879, 4.6997]} zoom={13} className="h-[300px]">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={testJson}
        onEachFeature={(feature, layer) => {
          console.log('feature', feature);
          console.log('layer', layer);
          layer.bindPopup(feature.properties.name);
        }}
        style={(feature) => {
          if (feature?.geometry.type === 'Point')
            return {
              fillColor: 'red',
            };
          return {
            color: 'blue',
          };
        }}
      />
    </MapContainer>
  );
}

const testJson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [11.1215698, 46.0677293],
      },
      properties: {
        name: "Fontana dell'Aquila",
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [11.1214686, 46.0677385],
          [11.121466, 46.0677511],
          [11.1213806, 46.0681452],
          [11.1213548, 46.0682642],
          [11.1213115, 46.0684385],
          [11.1212897, 46.0685261],
          [11.1212678, 46.0686443],
        ],
      },
      properties: {
        lanes: 1,
        name: 'Via Rodolfo Belenzani',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [11.1209262, 46.0676632],
            [11.1209201, 46.0676444],
            [11.1209473, 46.0675811],
            [11.1210082, 46.0674396],
            [11.1209909, 46.0674359],
            [11.1209669, 46.0674306],
            [11.120973, 46.067375],
            [11.1209798, 46.067318],
            [11.1209906, 46.067313],
            [11.1210021, 46.0673079],
            [11.1210102, 46.0672175],
            [11.1210154, 46.0670829],
            [11.1209979, 46.0670731],
            [11.1209861, 46.0670671],
            [11.121003, 46.0670034],
            [11.1210228, 46.0670051],
            [11.1210484, 46.0670073],
            [11.1216367, 46.0670503],
            [11.1216304, 46.0670981],
            [11.1217471, 46.0671064],
            [11.1218604, 46.0671144],
            [11.1218662, 46.0670763],
            [11.1218916, 46.0670783],
            [11.1218655, 46.0672963],
            [11.1218347, 46.0675014],
            [11.1218793, 46.0675034],
            [11.1219202, 46.0675053],
            [11.121918, 46.067554],
            [11.1220355, 46.0675565],
            [11.1220264, 46.067619],
            [11.1220237, 46.0676378],
            [11.1219858, 46.0676408],
            [11.121853, 46.0676517],
            [11.1217408, 46.0676621],
            [11.1215635, 46.0677421],
            [11.1214686, 46.0677385],
            [11.1213621, 46.0677348],
            [11.121226, 46.067723],
            [11.1210982, 46.067711],
            [11.1210937, 46.0677159],
            [11.1209933, 46.0677017],
            [11.1209337, 46.0676859],
            [11.1209262, 46.0676632],
          ],
        ],
      },
      properties: {
        name: 'Piazza del Duomo',
        surface: 'cobblestone',
      },
    },
  ],
};