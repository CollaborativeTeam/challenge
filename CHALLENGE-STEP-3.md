## CHALLENGE STEP 3

Create a simple (no-login) dashboard that integrates two components in two different tabs (routes):

1. A table component that fetches API REST information from the given endpoint `https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/`
  
    a. The table should show the key endpoint properties such as: tx id, gas fee, timestamp, blocknumber, etc.

    b. The table should let the user sort the records by timestamp and blocknumber.


2. A chart component to show stats also coming from APIs endpoint `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/1/USD/${address}/`

    a. The components should render on this new tab and show proper values coming from the endpoint.

    b. Any chart that reflects value based on the endpoint that it is recommended to tuse.


## Tools

Use ant design components (table and chart)

## Documentation links

- https://ant.design/components/table/
- https://charts.ant.design/en/docs/manual/getting-started
- https://www.covalenthq.com/ (you must login and get an api key to be able to use there apis)