### The BFX challenge

#### Challenge:

create a simplified blockchain for trading tokens based on Grenache, a Bittorrent DHT implementation.

The blockchain state can be stored in-memory.

It should have the following components:

a blockchain component. There should be two instances running, sharing/syncing the same state.
with the Grenache HTTP Client, a client can connect to the component and submit orders, which are committed to the blockchain.
When an order matches, the result is also committed to the chain.

The updated blockchain state should get distributed to other connected clients and chains.

#### Approach:

Any Grenache HTTP Client can connect to the blockchain component and submit the order. An order goes to the in-memory mempool of small blockchain implementations. There are two workers each also acts as a blockchain node, mempool is synchronized, and blocks are serially generated with a fake consensus where one node waits for another to generate a block, an in-memory world state is also maintained.

Clients connect to a worker and send random orders which are committed to the chain.

Order matching is currently not implemented because of a lack of time. 


#### What's included:

1. Small Blockchain component
2. Even/odd based leader election consensus
3. mempool synchronization
4. Maintain blockchain world state
5. Order creation
6. Order details committed to Blockchain

#### Missing:

1. BFT consensus on blockchain component
2. Order matching engine
3. Testcases: Unit and Integration testcases
4. Validations
5. Refactoring
6. Proper Logger


### Setup & Run the project:

Use dockerfile and docker-compose to run the grape server, blockchain component with grape worker, grape client.


- Run the grape server: 

      docker-compose up --build grape-01 grape-02 grape-03


- Blockchain component & Server: 

        docker-compose up --build worker-01 worker-02

- Client:

        docker-compose up --build client-01 client-02


#### Available scripts


+ `lint` - lint client and server files

#### Schemas:

`Order schema:`

```
{
        id: UUID
        client_id: Unique Identifier of Client
        price_usd
        amount_btc 
        timestamp
}

```
`Transactions schema:`

```
{
        timestamp
        order details
        hash of the transactions
}

```

`Block schema:`

```
{
        index: Block Height
        timestamp
        transaction details
        previous block hash
        hash: block hash
        miner: Creator of block
}
```
