# Run locally

## Prerequisites

Create a PostgreSQL db.
Get your DATABASE_URL and add it to your .env


## Commands
```bash

# Install dependencies
npm i

# Generate prisma client
npx prisma generate
# Apply db migrations
npx prisma migrate dev

# Run locally
npm run dev
```

