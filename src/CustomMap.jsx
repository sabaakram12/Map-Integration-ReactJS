import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const locationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38],
});

function CustomMap() {
  const [markers, setMarkers] = useState([]); 
  const [circleRadius, setCircleRadius] = useState(100); 
  const [inputRadius, setInputRadius] = useState(''); 

  const handleInputChange = (e) => setInputRadius(e.target.value);

 
  const handleSetCircleSize = () => {
    const radius = parseInt(inputRadius);
    if (radius > 0) {
      setCircleRadius(radius);
    } else {
      alert('Please enter a valid radius');
    }
  };

 
  const handleAddLocation = () => {
    const newPosition = [
      51.505 + (Math.random() - 0.5) * 0.1,
      -0.09 + (Math.random() - 0.5) * 0.1
    ];
    setMarkers([...markers, { position: newPosition, visible: true }]);
  };

  
  const handleRemoveLocation = (index) => {
    setMarkers(markers.filter((_, i) => i !== index));
  };


  const handleMarkerDragEnd = (e, index) => {
    const { lat, lng } = e.target.getLatLng();
    setMarkers(markers.map((marker, i) =>
      i === index ? { ...marker, position: [lat, lng] } : marker
    ));
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2>Interactive Map with Multiple Markers and Circles</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Circle Radius (meters): </label>
        <input
          type="number"
          value={inputRadius}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <button
          onClick={handleSetCircleSize}
          style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Set Circle Size
        </button>
      </div>

      <button
        onClick={handleAddLocation}
        style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '10px' }}
      >
        Add Location
      </button>

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker, index) => (
          marker.visible && (
            <React.Fragment key={index}>
              <Marker
                position={marker.position}
                icon={locationIcon}
                draggable
                eventHandlers={{ dragend: (e) => handleMarkerDragEnd(e, index) }}
              >
               
                <Popup>
                  <button
                    onClick={() => handleRemoveLocation(index)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
                  >
                    Cancel Location
                  </button>
                </Popup>
              </Marker>
              <Circle center={marker.position} radius={circleRadius} color="blue" />
            </React.Fragment>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default CustomMap;
