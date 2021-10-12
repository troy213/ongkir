const axios = require('axios')
require('dotenv').config()

const provinceGet = (req, res) => {
  const { id } = req.query
  let url = 'https://api.rajaongkir.com/starter/province'
  if (id) {
    url = `https://api.rajaongkir.com/starter/province?id=${id}`
  }
  console.log(id)
  axios
    .get(url, {
      headers: {
        key: process.env.key,
      },
    })
    .then((response) => {
      const status = response.data.rajaongkir.status.code
      const results = response.data.rajaongkir.results
      const description = response.data.rajaongkir.status.description
      if (status >= 200 && status <= 299) {
        return res.status(200).json({ success: true, result: results })
      } else {
        return res.status(status).json({
          success: false,
          message: description,
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const cityGet = (req, res) => {
  const { id, province } = req.query
  let url = 'https://api.rajaongkir.com/starter/city'
  if (id && province) {
    url = `https://api.rajaongkir.com/starter/city?id=${id}&province=${province}`
  } else if (id) {
    url = `https://api.rajaongkir.com/starter/city?id=${id}`
  } else if (province) {
    url = `https://api.rajaongkir.com/starter/city?province=${province}`
  }

  axios
    .get(url, {
      headers: {
        key: process.env.key,
      },
    })
    .then((response) => {
      const status = response.data.rajaongkir.status.code
      const results = response.data.rajaongkir.results
      const description = response.data.rajaongkir.status.description
      if (status >= 200 && status <= 299) {
        return res.status(200).json({ success: true, result: results })
      } else {
        return res.status(status).json({
          success: false,
          message: description,
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const costPost = (req, res) => {
  const { origin, destination, weight, courier } = req.body
  const url = 'https://api.rajaongkir.com/starter/cost'

  if (origin && destination && weight && courier) {
    axios
      .post(
        url,
        {
          origin: origin,
          destination: destination,
          weight: weight,
          courier: courier,
        },
        {
          headers: {
            key: process.env.key,
          },
        }
      )
      .then((response) => {
        const status = response.data.rajaongkir.status.code
        const results = response.data.rajaongkir.results
        const description = response.data.rajaongkir.status.description
        if (status >= 200 && status <= 299) {
          return res.status(200).json({ success: true, result: results })
        } else {
          return res.status(status).json({
            success: false,
            message: description,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'data tidak lengkap' })
  }
}

module.exports = { provinceGet, cityGet, costPost }
