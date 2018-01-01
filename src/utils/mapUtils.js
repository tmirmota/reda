export const addLayers = (map, src) => {
  const { source, sourceLayer, maxzoom, minzoom, filter } = src
  map.addLayer({
    id: `${source}-fill`,
    source,
    'source-layer': sourceLayer,
    minzoom,
    maxzoom,
    type: 'fill',
    paint: {
      'fill-opacity': 0.2,
      'fill-color': '#3f51b5'
    }
  })
  map.addLayer({
    id: `${source}-line`,
    source,
    'source-layer': sourceLayer,
    minzoom,
    maxzoom,
    type: 'line',
    paint: {
      'line-color': '#7986cb'
    }
  })
  map.addLayer({
    id: `${source}-fill-hover`,
    source,
    'source-layer': sourceLayer,
    type: 'fill',
    paint: {
      'fill-opacity': 0.5,
      'fill-color': '#1de9b6'
    },
    filter: ['==', filter, '']
  })
  map.addLayer({
    id: `${source}-line-hover`,
    source,
    'source-layer': sourceLayer,
    type: 'line',
    paint: {
      'line-color': '#1de9b6'
    },
    filter: ['==', filter, '']
  })
  map.addLayer({
    id: `${source}-fill-click`,
    source,
    'source-layer': sourceLayer,
    type: 'fill',
    paint: {
      'fill-color': '#e9291d'
    },
    filter: ['==', filter, '']
  })
}

export const addSources = map => {
  map
    .addSource('census-tracts', {
      type: 'vector',
      url: 'mapbox://tmirmota.3u8wgv7d'
    })
    .addSource('dissemination_area', {
      type: 'vector',
      url: 'mapbox://tmirmota.22vjwdw2'
    })
    .addSource('properties', {
      type: 'vector',
      url: 'mapbox://tmirmota.69r2qz2u'
    })
    .addSource('zoning', {
      type: 'vector',
      url: 'mapbox://tmirmota.5h7gkfwq'
    })
    .addSource('schools', {
      type: 'vector',
      url: 'mapbox://tmirmota.7qw6uywz'
    })
    .addSource('fire-hydrants', {
      type: 'vector',
      url: 'mapbox://tmirmota.1vk80tum'
    })
    .addSource('transit-lines', {
      type: 'vector',
      url: 'mapbox://tmirmota.26nf1ybn'
    })
    .addSource('transit-stations', {
      type: 'vector',
      url: 'mapbox://tmirmota.09jmh0eh'
    })
}
