<div align="center">
   <h1 align="center">
      <a href="http://online-store.mkloz.online" target="blank">
      <img src="./assets/logo.svg" width="100" />
      <br> Citywheels</a><br> 
   </h1>
   <h3>vehicle online shop backend</h3>
   <h6>Developed with the software and tools listed below.</h6>
   <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
   <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
   <img src="https://img.shields.io/badge/Jest-C21325.svg?style&logo=Jest&logoColor=white" alt="Jest" />
   <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
   <img src="https://img.shields.io/badge/MySQL-4479A1.svg?style&logo=MySQL&logoColor=white" alt="MySQL" />
   <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
   <img src="https://img.shields.io/badge/Prisma-2D3748.svg?style&logo=Prisma&logoColor=white" alt="Prisma" />
   <img src="https://img.shields.io/badge/Docker-2496ED.svg?style&logo=Docker&logoColor=white" alt="Docker" />
   <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions" />
   </p>
   <img src="https://img.shields.io/github/languages/top/mkloz/online-store?style&color=5D6D7E" alt="GitHub top language" />
   <img src="https://img.shields.io/github/languages/code-size/mkloz/online-store?style&color=5D6D7E" alt="GitHub code size in bytes" />
   <img src="https://img.shields.io/github/commit-activity/m/mkloz/online-store?style&color=5D6D7E" alt="GitHub commit activity" />
   <img src="https://img.shields.io/github/license/mkloz/online-store?style&color=5D6D7E" alt="GitHub license" />
</div>
<br>
<div align="center">
   <p><a href="https://online-store.mkloz.online"><img src="https://img.shields.io/badge/Frontend-Online--Store-blue.svg" alt="Citywheels Frontend"></a>
      <a href="https://api.mkloz.online/store/api/docs"><img src="https://img.shields.io/badge/Api-Citywheels.api-green.svg" alt="Citywheels Api"></a>
   </p>
</div>

## 📒 Table of Contents

- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [⚙️ Features](#️-features)
- [📂 Project Structure](#-project-structure)
- [🐬 Database Structure](#-database-structure)
- [🚀 Getting Started](#-getting-started)
  - [✔️ Prerequisites](#️-prerequisites)
  - [📦 Native installation](#-native-installation)
  - [🎮 Starting server](#-starting-server)
  - [🧪 Running Tests](#-running-tests)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📍 Overview

Welcome to the backend documentation for Citywheels, the online store that allows you to shop for various vehicles. This documentation provides an overview of the key features, technologies used, and how to get started with the project.

---

## ⚙️ Features

- Product listings: View a list of available products with details such as title, price, description, and images.
- Search functionality: Search for products based on keywords or specific criteria.
- User authentication: Allow users to create accounts, log in, and manage their profiles.
- Shopping cart: Add products to a cart, update quantities, and remove items.
- Order management: Allow users to view their past orders, track packages, and manage returns.
- Admin dashboard: Provide an administrative roles for managing products, users, orders, and other site settings.
- Checkout process: Provide a seamless checkout experience with multiple payment options(comming soon).

---

## 🐬 Database Structure

<p>
  <img src="assets/db.svg" alt="Citywheels Database Structure">
</p>

---

## 🚀 Getting Started

### ✔️ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

- For native running:
  > - `ℹ️ node:18`
  > - `ℹ️ npm 9+`
- For docker running

  > - `ℹ️ docker`
  > - `ℹ️ docker compose(optional if you know how use docker)`

---

### 📦 Native installation

1. Clone the online-store repository:

```sh
git clone https://github.com/mkloz/online-store-backend
```

2. Change to the project directory:

```sh
cd online-store-backend
```

3. Install the dependencies:

```sh
npm install
```

---

### 🎮 Starting server

After installation you can start store server. You will find swagger documentation on GET /api/docs route, hoever only if env != production

Set up .env variables

```bash

cp .env.example .env

```

Execute migrations for database

```bash
npm run migrate
```

Than if you installed project localy

```bash
npm run start
```

OR

Using docker compose

Start database(if you already have one skip this step) and server

```bash
sudo docker compose -f docker-compose-dev.yaml up mysql store
```

---

### 🧪 Running Tests

Set up test eviroments(in .env file). Be carefull couse it will clean all data, so DO NOT USE PRODUCTION ENV

```sh
npm run test
```

---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).

```sh
git checkout -b new-feature-branch
```

4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.

```sh
git commit -m 'Implemented new feature.'
```

6. Push your changes to your forked repository on GitHub using the following command

```sh
git push origin new-feature-branch
```

7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
   The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 📄 License

The "online-store" project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as needed.

---
