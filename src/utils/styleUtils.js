import { data } from '../constants/shelter-costs'

export const getColor = feature => {
  const { id } = feature.properties
  const dm = data.find(({ GeoUID }) => GeoUID === Number(id))
  const rent =
    dm['v_CA16_4901: Average monthly shelter costs for rented dwellings ($)']

  return  rent > 2000 ? '#4527a0' :
          rent > 1750 ? '#512da8' :
          rent > 1500 ? '#5e35b1' :
          rent > 1250 ? '#673ab7' :
          rent > 1000 ? '#7e57c2' :
          rent !== 0 ? '#9575cd' : '#b39ddb'
}
