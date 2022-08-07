import axios from 'axios'

export async function getWalletBalance(address, api_key) {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}1/address/${address}/transactions_v2/?key=${api_key}`

  console.log({ URL })
  try {
    const response = await axios.get(URL)
    const result = response.data

    if (result.error) {
      const { error_code, error_message, error } = result
      throw {
        error,
        error_code,
        error_message: error_message || 'There was an error',
      }
    }

    return result
  } catch (err) {
    return err
  }
}
