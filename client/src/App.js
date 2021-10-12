import { useState, useEffect } from 'react'
import { useFetch } from './hooks/custom'
import axios from 'axios'
import './App.css'

const App = () => {
  const [senderProv, setSenderProv] = useState(1)
  const [receiverProv, setReceiverProv] = useState(1)
  const [senderCity, setSenderCity] = useState(1)
  const [receiverCity, setReceiverCity] = useState(1)
  const [courier, setCourier] = useState('jne')
  const [weight, setWeight] = useState(1000)
  const [result, setResult] = useState([])

  const province = useFetch(
    'https://ongkir-tritera-erlangga.herokuapp.com/province'
  )
  const city = useFetch(
    `https://ongkir-tritera-erlangga.herokuapp.com/city?province=${senderProv}`
  )
  const destCity = useFetch(
    `https://ongkir-tritera-erlangga.herokuapp.com/city?province=${receiverProv}`
  )

  useEffect(() => {
    console.log(
      senderProv,
      receiverProv,
      senderCity,
      receiverCity,
      courier,
      weight
    )
  }, [senderProv, receiverProv, senderCity, receiverCity, courier, weight])

  const getCost = () => {
    axios
      .post('https://ongkir-tritera-erlangga.herokuapp.com/cost', {
        origin: senderCity,
        destination: receiverCity,
        weight: weight,
        courier: courier,
      })
      .then((res) => {
        setResult(res.data.result[0].costs)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      {province.isLoading || city.isLoading || destCity.isLoading ? (
        <h3>Loading</h3>
      ) : province.isError || city.isError || destCity.isError ? (
        <h3>Error</h3>
      ) : (
        <>
          <h1>Origin</h1>
          <label htmlFor='sender-province'>Province</label>
          <select
            name='sender-province'
            id='sender-province'
            value={senderProv}
            onChange={(e) => setSenderProv(e.target.value)}
          >
            {province.data.map((value) => {
              const { province_id, province } = value
              return (
                <option value={province_id} key={province_id}>
                  {province}
                </option>
              )
            })}
          </select>
          <label htmlFor='sender-city'>City</label>
          <select
            name='sender-city'
            id='sender-city'
            value={senderCity}
            onChange={(e) => setSenderCity(Number(e.target.value))}
          >
            <option value={1}>- city -</option>
            {city.data.map((value) => {
              const { city_id, city_name } = value
              return (
                <option value={city_id} key={city_id}>
                  {city_name}
                </option>
              )
            })}
          </select>
          <label htmlFor='courier'>Courier</label>
          <select
            name='courier'
            id='courier'
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
          >
            <option value='jne'>JNE</option>
            <option value='tiki'>TIKI</option>
            <option value='pos'>POS</option>
          </select>
          <label htmlFor='weight'>Weight(g)</label>
          <input
            type='number'
            id='weight'
            min='1'
            max='30000'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <h1>Destination</h1>
          <label htmlFor='receiver-province'>Province</label>
          <select
            name='receiver-province'
            id='receiver-province'
            value={receiverProv}
            onChange={(e) => setReceiverProv(e.target.value)}
          >
            {province.data.map((value) => {
              const { province_id, province } = value
              return (
                <option value={province_id} key={province_id}>
                  {province}
                </option>
              )
            })}
          </select>
          <label htmlFor='receiver-city'>City</label>
          <select
            name='receiver-city'
            id='receiver-city'
            value={receiverCity}
            onChange={(e) => setReceiverCity(Number(e.target.value))}
          >
            <option value={1}>- city -</option>
            {destCity.data.map((value) => {
              const { city_id, city_name } = value
              return (
                <option value={city_id} key={city_id}>
                  {city_name}
                </option>
              )
            })}
          </select>
          <br />
          <button onClick={getCost}>Check</button>
        </>
      )}
      <div>
        {result.length > 0 &&
          result.map((res) => {
            const { value, etd } = res.cost[0]
            const { service } = res
            return (
              <div key={service}>
                <p>Service: {service}</p>
                <p>Price: Rp.{value}</p>
                <p>Estimation: {etd} day(s)</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default App
