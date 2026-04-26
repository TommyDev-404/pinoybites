## How to use?

- Clone repo:
```bash
  git clone https://github.com/TommyDev-404/PinoyBites.git
  cd PinoyBites
```

- Install all dependencies:

For frontend dependencies:
```bash
  cd frontend
  pnpm install
```

For backend dependencies:
```bash
  cd backend
  pnpm install
```

- Create first a database in PostrgeSQL or MySQL, queries in the db-scripts folder.

Then in backend, run this to generate orm and use the database:
```bash
  npx prisma db pull
  npx prisma generate
```

- After that, run the app in both backend and frontend shell or bash:
```bash
  pnpm dev
```
