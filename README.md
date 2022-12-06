# orderBook-Challenge

En este repositorio se desarrolló un challenge sobre el libro de órdenes de un exchange.

## Descripción del desafio

Lo que deberá hacer es diseñar y crear una API REST pública que recupere información de mercado para operar.

### Detalles

- Se deberá exponer dos puntos finales:
  - Uno que recibe un nombre de pares y retorna las sugerencias del libro de órdenes (es decir, los mejores precios para oferta y demanda). La respuesta debe incluir montos totales como los precios.
  - Otro endpoint que se llama con el nombre del par, el tipo de operación (BUY/SELL) y el monto a negociar. Devolverá el precio efectivo que resultará si se ejecuta la orden (es decir, evaluar la profundidad del libro de órdenes "mercado" ).
- La API debería devolver valores de mercado para los siguientes pares: BTC-USD y ETH-USD.
- Este motor debe estar escrito en Node.js y debe usar websockets, sin almacenamiento. También debe admitir una interfaz HTTP para obtener los puntos finales.
- El backend debe consumir datos de un intercambio externo. Puede usar el flujo de websocket del libro de órdenes de la API de Bittrex o la API de Bitfinex.


### Solution: Flowchart

![diagrama de Flujo (1)](https://user-images.githubusercontent.com/55299077/205953999-09510c37-6054-4378-8e94-b7ae49946bd1.jpg)

## Installation

To begin installing dependencies with the following command:

```bash
  npm install
```
Run the server with the :

```bash
  npm run dev
```

We should see the following message:
```sh
Server run in  3000
```

## Dependencias utilizadas

| Dependencies               |
| -------------------------- |
| body-parser |
| express |
| mocha |
| socket.io |
| supertest |
| ws |
| dotenv |
| nodemon |


## API Reference

#### get ticket price 

```http
  GET /fetchTicker
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `currencyPair` | `string` | **Required**.  it is a cryptocurrency pair |

#### response:
```
{
    "body": {
        "pair": "BTCUSD",
        "bid": 16996,
        "bidAmount": 0.01105,
        "bidCount": 109726162702,
        "ask": 17003,
        "askAmount": 0.25,
        "askCount": 109727589408
    }
}
```
#### get btc amount in a market order

```http
  GET /marketOrder
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `currencyPair` | `string` | **Required**.  it is a cryptocurrency pair |
| `type` | `string` | **Required**.  it is type of operation :  BUY or SELL |
| `amount` | `string` | **Required**. dollar amount to change |


#### response:
```
{
    "body": {
        "pair": "BTCUSD",
        "type": "BUY",
        "amountToTrade": 20000,
        "conversionResult": 1.176893088401789,
        "maxSizeOrder": [
            {
                "pair": "BTCUSD",
                "type": "BUY",
                "ask": 16994,
                "askAmount": 1.4088,
                "askCount": 109732212439
            }
        ]
    }
}
```

#### get dollar amount in a market order

```http
  GET /changeCurrencyToDollar
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `currencyPair` | `string` | **Required**.  it is a cryptocurrency pair |
| `type` | `string` | **Required**.  it is type of operation :  BUY or SELL |
| `amount` | `string` | **Required**. btc or eth amount to change |

#### response:
```
{
    "body": {
        "pair": "BTCUSD",
        "type": "BUY",
        "amountToTrade": 1,
        "conversionResult": 18477.11308573,
        "maxSizeOrder": [
            {
                "pair": "BTCUSD",
                "type": "BUY",
                "ask": 17005,
                "askAmount": 0.35080205,
                "askCount": 109730341805
            }
        ]
    }
}
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Port where the project will run

`BITFINEX_WEBSOCKET` - Bitfinex Websocket API version is 2.0 ( For public channels )
