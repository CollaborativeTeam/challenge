import axios from 'axios'

export function getWalletBalance(address, config) {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}1/address/${address}/transactions_v2/`
  const { params } = config
  return axios.get(URL, { params })
}
