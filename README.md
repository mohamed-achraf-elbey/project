# Project

Node.js application with MongoDB and GitHub Actions CI.

![CI](https://github.com/mohamed-achraf-elbey/project/actions/workflows/node.js.yml/badge.svg)

## 🚀 Features
- Express server with MongoDB (via Mongoose).
- JWT authentication with cookies.
- Environment variables managed via `.env`.
- GitHub Actions workflow for CI (build + test).

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamed-achraf-elbey/project.git
   cd project

## Create a .env file in the root directory:

NODE_ENV=development
PORT=3001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

## Run the app:

npm start
