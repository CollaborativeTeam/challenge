import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_CHAIN_ID}/transaction_v2`

export function getTransactionData(tx_hash) {
  return axios.get(
    `${URL}/${tx_hash}/?no-logs=true&key=${process.env.NEXT_PUBLIC_API_KEY}`
  )
}
