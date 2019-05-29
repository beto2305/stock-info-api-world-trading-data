## World Trading Data

Update stock quotation for selected symbols recorded on app database

### Configuring development environment

#### Step 1: installing tools

- install git: [git-scm](http://git-scm.com/)
- install NodeJS: [nodejs.org](http://nodejs.org) v.8.11.3

#### Step 2: preparing repository

Clone repository:

```
git clone https://github.com/beto2305/stock-info-api-world-trading-data.git
```

#### Step 3: Install project packages:

```
cd stock-info-api-world-trading-data
npm install
```

#### Step 4: development environment variables

For development, you must set this variables and values in your OS or inside .env file

```
set NODE_ENV=development
```

#### Step 5: run tests to check if things are fine

Easy like that:

```
npm run dev
```

wait to load a message:

```
* Server initialized on x port, where x = port number defined on config.js

```

#### Step 6: call URL

- Api

```
curl -x GET http://localhost:port/api/v1/wtd/start
```
