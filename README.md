# Doc-converter

Convert from office files (docx, odt, ...) to PDF. Use LibreOffice through unoconv

### Prerequisites

* [LibreOffice](https://downloadarchive.documentfoundation.org/libreoffice/old/4.3.7.2/) 4.3.7.2 (latest version that unoconv supported)
* [Unoconv](https://github.com/unoconv/unoconv)
* [Node.js](https://nodejs.org/) v10+
* [RabbitMQ](https://www.rabbitmq.com/)

### Installation

Install the dependencies and devDependencies and start the server.

```sh
cd api
npm install
npm start
```

Install the dependencies and start the worker

```sh
cd workers
npm install
npm start
```

### Todos

* Run many workers
