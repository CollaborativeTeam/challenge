import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

const STCard = styled.article`
  background-color: #232323;
  width: 100%;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  font-size: 1.4rem;
`

export function TransactionCard({ transaction = {} }) {
  return (
    <STCard>
      {Object.entries(transaction).map(([key, value]) => (
        <div key={uuid()}>
          <span>{key.replace(/[-_]/, ' ').toUpperCase()}</span>:{' '}
          <span>{value}</span>
        </div>
      ))}
    </STCard>
  )
}
