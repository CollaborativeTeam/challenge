import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const STCard = styled.article`
  background-color: #232323;
  width: 100%;
  max-width: 1400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  word-wrap: break-word;

  line-height: 2.5;

  .row {
    display: flex;
    border-bottom: 1px solid #ffffffa8;

    .key {
      width: 20%;
      font-weight: bold;
    }
  }

  @media screen and (max-width: 1000px) {
    .row {
      flex-direction: column;
      .key {
        width: 100%;
      }
    }
  }
`

export function TransactionCard({ transaction = {} }) {
  console.log(transaction)
  return (
    <STCard>
      {Object.entries(transaction).map(([key, value]) => (
        <div className="row" key={uuid()}>
          <span className="key">
            {key.replace(/[-_]/g, ' ').toUpperCase()}:
          </span>
          <span className="value">
            {typeof value === 'boolean' ? (
              <CheckCircleIcon />
            ) : value === null ? (
              '---'
            ) : (
              value?.toString()
            )}
          </span>
        </div>
      ))}
    </STCard>
  )
}
