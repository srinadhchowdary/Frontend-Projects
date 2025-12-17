import React, { useRef, useState, memo } from "react";
import GoogleMapReact from "google-map-react";
import "./App.css";

/* ---------------- CONSTANT DATA ---------------- */

const LOCATIONS = [
  {
    id: 1,
    name: "Amaravathi",
    lat: 16.5131,
    lng: 80.5165,
    description: "Capital of Andhra Pradesh"
  },
  {
    id: 2,
    name: "Bangalore",
    lat: 12.9716,
    lng: 77.5946,
    description: "Silicon Valley of India"
  },
  {
    id: 3,
    name: "Hyderabad",
    lat: 17.385,
    lng: 78.4867,
    description: "City of Pearls"
  }
];

const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  }
];

/* ---------------- MARKER ---------------- */

const Marker = memo(({ label, description, isActive, onClick }) => (
  <div
    className="marker"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    <div className="marker-pin"></div>

    {isActive && (
      <div className="marker-popup">
        <strong>{label}</strong>
        <p>{description}</p>
      </div>
    )}
  </div>
));

/* ---------------- SIDEBAR ITEM ---------------- */

const SidebarItem = memo(({ place, active, onClick }) => (
  <div
    className={`sidebar-item ${active ? "active" : ""}`}
    onClick={onClick}
  >
    <strong>{place.name}</strong>
    <p>{place.description}</p>
  </div>
));

/* ---------------- MAIN COMPONENT ---------------- */

export default function SimpleMap() {
  const inputRef = useRef(null);

  const [activeMarker, setActiveMarker] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [mapCenter, setMapCenter] = useState({
    lat: 15.5937,
    lng: 78.9629
  });
  const [mapZoom, setMapZoom] = useState(5);

  /* ---------------- AUTOCOMPLETE ---------------- */

  const handleApiLoaded = ({ maps }) => {
    if (!inputRef.current) return;

    const autocomplete = new maps.places.Autocomplete(inputRef.current);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setMapCenter({ lat, lng });
      setMapZoom(10);

      setSearchMarker({
        id: "search",
        name: place.name,
        lat,
        lng,
        description: place.formatted_address || "Searched place"
      });

      setActiveMarker("search");
    });
  };

  /* ---------------- HANDLERS ---------------- */

  const focusLocation = (id, lat, lng) => {
    setActiveMarker(id);
    setSearchMarker(null);
    setMapCenter({ lat, lng });
    setMapZoom(8);
    setSidebarOpen(false);
  };

  const locateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setMapCenter({ lat, lng });
        setMapZoom(12);
        setUserLocation({ lat, lng });
        setActiveMarker("me");
      },
      () => alert("Unable to fetch location")
    );
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="layout">

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <h3>Places</h3>

          {LOCATIONS.map((place) => (
            <SidebarItem
              key={place.id}
              place={place}
              active={activeMarker === place.id}
              onClick={() =>
                focusLocation(place.id, place.lat, place.lng)
              }
            />
          ))}
        </div>

        {/* Map */}
        <div className="map-container">

          <button className="locate-btn" onClick={locateMe}>
            📍 My Location
          </button>

          <div className="map-header">
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <h3 className="map-title">My Google Maps App</h3>

            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <input
              ref={inputRef}
              className="map-search-input"
              type="text"
              placeholder="Search a place..."
            />
          </div>

          <GoogleMapReact
            bootstrapURLKeys={{
              key: "YOUR_GOOGLE_MAPS_API_KEY",
              libraries: ["places"]
            }}
            center={mapCenter}
            zoom={mapZoom}
            options={{ styles: darkMode ? DARK_MAP_STYLE : [] }}
            onClick={() => setActiveMarker(null)}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleApiLoaded}
          >
            {LOCATIONS.map((place) => (
              <Marker
                key={place.id}
                lat={place.lat}
                lng={place.lng}
                label={place.name}
                description={place.description}
                isActive={activeMarker === place.id}
                onClick={() =>
                  focusLocation(place.id, place.lat, place.lng)
                }
              />
            ))}

            {searchMarker && (
              <Marker
                lat={searchMarker.lat}
                lng={searchMarker.lng}
                label={searchMarker.name}
                description={searchMarker.description}
                isActive={activeMarker === "search"}
                onClick={() => setActiveMarker("search")}
              />
            )}

            {userLocation && (
              <Marker
                lat={userLocation.lat}
                lng={userLocation.lng}
                label="You are here"
                description="Current location"
                isActive={activeMarker === "me"}
                onClick={() => setActiveMarker("me")}
              />
            )}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
