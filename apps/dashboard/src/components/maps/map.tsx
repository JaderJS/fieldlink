'use client'

import { useEffect, useState } from 'react'
import { LatLngExpression, LatLngLiteral, LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
// import { Station } from '@/functions/stations'

interface MapProps {
    stations: any
}
function FitBounds({ sites }: { sites: { coordinates: LatLngTuple }[] }) {
    const map = useMap()

    useEffect(() => {
        if (sites.length > 0) {
            const bounds = sites.map(site => site.coordinates)
            map.fitBounds(bounds)
        }
    }, [sites, map])

    return null
}

export default function Map({ stations }: MapProps) {
    const [coordinates, setCoordinates] = useState<LatLngExpression>([51.505, -0.09])

    // const sites_ = stations.map((site) => ({
    //     ...site,
    //     coordinates: [site.latitude, site.longitude] as LatLngTuple
    // }))


    return (
        <></>
    )

    // return (
    //     <MapContainer
    //         center={coordinates}
    //         zoom={13}
    //         scrollWheelZoom={false}
    //         className='rounded-lg'
    //         style={{ height: '300px', width: '100%', zIndex: 0 }}
    //     // style={{ display: 'flex', height: '100%', flex: 1, minWidth: '400px', zIndex: 0 }}
    //     >
    //         <TileLayer
    //             attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />
    //         {sites_?.map((site, index) => (
    //             <Marker key={index} position={site.coordinates}>
    //                 <Popup>
    //                     <p className='text-muted-foreground'>RX:{site.rx}</p>
    //                     <p className='text-muted-foreground'>TX:{site.tx}</p>
    //                     <p className='text-muted-foreground'>{site.id}</p>
    //                 </Popup>
    //             </Marker>
    //         ))}

    //         <FitBounds sites={sites_} />
    //     </MapContainer>
    // )
}
