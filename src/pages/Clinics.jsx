import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import data from '../data/clinics.json'
import { useLang } from '../context/LanguageContext.jsx'
import { labels } from '../i18n'

import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
const DefaultIcon = L.icon({ iconUrl, iconRetinaUrl, shadowUrl, iconSize:[25,41], iconAnchor:[12,41] })
L.Marker.prototype.options.icon = DefaultIcon

export default function Clinics(){
  const { lang } = useLang()
  const center = [-6.7924, 39.2083]
  return (
    <div className="container">
      <div className="card">
        <h2>{labels[lang].clinics.title}</h2>
        <div className="map-wrap">
          <MapContainer center={center} zoom={11} style={{height:'100%', width:'100%'}}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.features.map((f, i)=>{
              const [lng, lat] = f.geometry.coordinates
              const p = f.properties
              return (
                <Marker key={i} position={[lat, lng]}>
                  <Popup>
                    <b>{p.name}</b><br/>
                    {p.type} • {p.district}<br/>
                    {p.phone && <>📞 {p.phone}</>}
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
