# Remito Send API

Backend API for Remito Send built with NestJS.

## About

Project developed to automate order taking and product catalog for Distribuidora Esquina. Part of a two-application system - this one is exclusively for order taking, not invoicing.

## Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (Passport)
- **API Documentation:** Swagger/OpenAPI
- **File Storage:** Cloudinary

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Configure your database and cloudinary credentials

# Run in development
npm run start:dev
```

## API Documentation

Once running, access Swagger UI at: `http://localhost:3000/api-docs`

## Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run start`     | Start production server                  |
| `npm run start:dev` | Start development server with hot reload |
| `npm run build`     | Build for production                     |
| `npm run lint`      | Run ESLint                               |
| `npm run test`      | Run tests                                |

## Project Structure

- `src/modules/` - Feature modules (auth, products, pedidos, user, etc.)
- `src/app.module.ts` - Root module
- `src/main.ts` - Application entry point
