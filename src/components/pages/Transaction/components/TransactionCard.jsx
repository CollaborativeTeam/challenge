import styled from 'styled-components'

const STArticle = styled.article`
  background-color: steelblue;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  text-align: center;

  span {
    background-color: rebeccapurple;
  }
`

export function TransactionCard({ data = [] }) {
  return (
    <STArticle>
      {data.map((item) => (
        <span>
          {item[0].replace(/[-_]/, ' ').toUpperCase()}: {item[1]}
        </span>
      ))}
    </STArticle>
  )
}
