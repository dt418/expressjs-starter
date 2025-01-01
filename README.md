# TypeScript Express API Server

A TypeScript-based Express API server with a robust architecture, featuring:

* 🟦 **TypeScript**: For type safety and maintainability
* 🚀 **Express**: For building robust and scalable APIs
* 🔄 **PM2**: For process management and clustering
* 📚 **Swagger**: For API documentation and testing
* 📝 **Winston**: For logging and error handling

## Table of Contents

* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Features](#features)
* [Development Guide](#development-guide)
* [API Documentation](#api-documentation)
* [Testing](#testing)
* [Deployment](#deployment)
* [License](#license)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000/api-docs` for API documentation

## Project Structure

The project is organized into the following directories:

    📂 src
    ├── 📄 config           # Configuration files and environment variables
    ├── 🌐 controllers      # Request handlers and response logic
    ├── 📜 interfaces      # TypeScript interfaces and types
    ├── 🛡️ middleware      # Express middleware functions
    ├── 🗂️ models          # Database models and schemas
    ├── 🚦 routes          # API route definitions
    ├── 🛠️ services        # Business logic and data processing
    └── 🧰 utils           # Helper functions and utilities

## Features

This project features:

* **Authentication**: Using JSON Web Tokens (JWT)
* **Validation**: Request validation using middleware
* **Error Handling**: Centralized error handling with Winston logger
* **API Documentation**: Swagger UI for testing and documentation
* **Environment Management**: Using dotenv for configuration

## Development Guide

Follow these guidelines when developing:

1. **Code Style**
   * Use ESLint and Prettier for consistent formatting
   * Follow TypeScript best practices
   * Write meaningful commit messages

2. **Adding New Features**
   * Create feature branch from `main`
   * Add tests for new functionality
   * Update API documentation
   * Create pull request

3. **Environment Setup**
   * Copy `.env.example` to `.env`
   * Configure local development variables
   * Use `npm run dev` for hot reloading

4. **Common Commands**
   * `npm run lint`: Check code style
   * `npm run build`: Build production code
   * `npm run test:watch`: Run tests in watch mode

## API Documentation

API documentation is available at `http://localhost:3000/api-docs`. Use Swagger UI to test and explore the API endpoints.

## Testing

Testing setup includes Jest. Run tests using `npm run test`.

## Deployment

Deploy using PM2 process manager. Build the project using `npm run build` and start with `npm start`.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
