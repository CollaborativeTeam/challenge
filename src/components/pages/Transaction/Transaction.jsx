import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Button from '@mui/material/Button'

import { useAddressContext } from 'context/AddressContext'
import { isEmpty } from 'helpers/isEmpty'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getTransactionData } from 'services/getTransactionData'
import { v4 as uuid } from 'uuid'
import { TransactionCard } from 'components/pages/Transaction/components/TransactionCard'

export default function Transaction() {
  const [cardData, setCardData] = useState([])
  const [loading, setLoading] = useState(false)
  const [requestError, setRequestError] = useState(null)

  const { transactionData } = useAddressContext()

  const {
    query: { tx_hash },
    isReady,
  } = useRouter()

  useEffect(() => {
    if (!isReady) return

    if (isEmpty(transactionData)) {
      handleTransactionDataReq()
      return
    }

    const { unusedKeys, ...restKeys } = transactionData

    const cardData = Object.entries({ ...unusedKeys, ...restKeys })

    setCardData(cardData)
  }, [isReady])

  const handleTransactionDataReq = async () => {
    setLoading(true)
    try {
      const { data: requestData } = await getTransactionData(tx_hash)

      if (requestData.error) {
        throw {
          code: requestData.error_code,
          message: requestData.error_message || 'There was an error',
        }
      }

      const cardData = [{ ...requestData.data.items[0], key: uuid() }]

      setCardData(cardData)
      setRequestError(null)
    } catch (error) {
      console.log(error)

      setCardData([{}])
      setRequestError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link href="/">
        <Button size="large" startIcon={<ChevronLeft />}>
          Back to dashboard
        </Button>
      </Link>

      {tx_hash && <TransactionCard data={cardData} loading={loading} />}
    </>
  )
}
