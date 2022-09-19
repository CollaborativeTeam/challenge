import axios from 'axios'

export function getAddressTransactions(address, config) {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_CHAIN_ID}/address/${address}/transactions_v2/`
  const { params } = config
  return axios.get(URL, { params })
}
