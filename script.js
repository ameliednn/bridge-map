// Initialiser la carte
var map = L.map('map').setView([54, 15], 4);

// Ajouter une couche de fond
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Données des projets par pays
const projectData = {
  "Germany": [
    "Rader Hichbrücke (A7)",
    "Uttrichhausen viaduct (A7, Hesse)",
    "A40 Rhine bridge (Duisburg)",
    "Sechshelden viaduct (A45)",
    "Mainflingen bridge (A45)"
  ],
  "Norway": [
    "Langenuen Bridge (Hordfast)"
  ],
  "Croatia": [
    "New Krk bridge",
    "New Split Bridge / Bridge over Kaštela Bay",
    "Western Jarun Bridge",
    "Eastern Jarun Bridge",
    "Savska Opatovinova Bridge"
  ],
  "Belgium": [
    "Vilvorde viaduct"
  ],
  "France": [
    "Paris metro line 17 viaduct"
  ],
  "Austria": [
    "Lueg Bridge"
  ],
  "Bulgaria": [
    "Third Danube bridge (Roussé–Giurgiu)",
    "Viaducts on the Roussé-Veliko Tarnovo freeway",
    "Railway viaducts on the Vidin-Sofia line"
  ],
  "Netherlands": [
    "Suurhoffbrug (A15, Rotterdam)",
    "Oostbrug (Amsterdam)",
    "A27 Everdingen-Hooipolder"
  ],
  "Spain": [
    "Viaduc SE-40 sur SE-40 viaduct over the Guadalquivir (Seville)",
    "Viaduct over the Peña embankment (Aragon)"
  ],
  "UK": [
    "Colne Valley Viaduct",
    "M6 Lune Gorge Bridge"
  ],
  "Czechia": [
    "Bridges on the D3 Motorway (Section: Kaplice-nádraží – Nažidla)"
  ],
  "Estonia": [
    "Rail Baltica Viaduct, comté de Rapla",
    "Viaduct over the Vaskjala-Ülemiste canal (Rail Baltica, Soodevahe-Kangru)"
  ],
  "Italy": [
    "Strait of Messina Bridge",
    "Pedemontana Lombarda Viaduct",
    "Gronda di Genova"
  ],
  "Ireland": [
    "Narrow Water Bridge",
    "N5 Ballaghaderreen to Scramoge Road Project (County Roscommon, Ireland) : Road bridges"
  ],
  "Latvia": [
    "Phase 4 of the Riga South Bridge (Jāņa Čakstes gatve)",
    "Rail Baltica's combined road-rail bridge over the Daugava (near Iecava)"
  ],
  "Luxembourg": [
    "Pont ferroviaire CFL sur l'A3 (Luxembourg-Bettembourg)",
    "Passerelle et ascenseur Cents-Neudorf-Weimershof"
  ],
  "Slovakia": [
    "D1 Turany–Hubová"
  ],
  "Greece": [
    "Kipi–Ipsala Friendship Bridge"
  ],
  "Hungary": [
    "Mohács Bridge"
  ]
};

// Charger le fichier GeoJSON Europe
fetch("custom.geo.json")
  .then(res => res.json())
  .then(geoData => {
    L.geoJSON(geoData, {
      style: {
        color: "#444",
        weight: 1,
        fillColor: "#cce",
        fillOpacity: 0.6
      },
      onEachFeature: function(feature, layer) {
        const country = feature.properties.name_en;

        layer.on('click', function(e) {
          const projects = projectData[country] || ["Aucun projet"];
          const dropdown = `
            <select>
              ${projects.map(p => `<option>${p}</option>`).join("")}
            </select>
          `;
          const popupContent = `<div class="popup-content"><strong>${country}</strong><br>${dropdown}</div>`;

          L.popup()
            .setLatLng(e.latlng)
            .setContent(popupContent)
            .openOn(map);
        });
      }
    }).addTo(map);
  })
  .catch(err => {
    console.error("Erreur chargement GeoJSON :", err);
  });
