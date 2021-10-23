# Chatu

### Note that this is the first time I am using Lit and Elastic Search. Also for this project I did not use typescript to save time.

## Setup

Install client requirements

```bash
npm i
```

Build client:

```bash
npm run build
```

Install server requirements

```bash
cd server
npm i
```

Start Elastic server (while being in server folder):
(Using docker-compose in order to contain everything in the future, including client (web-dev-server) and the actual server)

```bash
docker-compose up
```

Open up new terminal and start the server

```bash
cd ./server/
npm run dev
```

Enter http://localhost:8080/
