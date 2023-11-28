<p align="center">
    <br />
    <a href="https://thirdweb.com">
        <img src="./public/banner.png" width="1235" alt="Wallaby Pay Banner Image"/></a>
    <br />
</p>

<h1 align="center">Wallaby Pay 🦘</h1>

<p align="center">
   An open-source web3 product to help you build your own frontend web3 applications.
</p>

<br/>

## What is this?

Wallaby Pay is a simple web3 application that allows users to connect or create a wallet, and send funds to other users.
It uses the [Polygon zkEVM](https://polygon.technology/polygon-zkevm) to allow for fast, cheap transactions between users, but works out of the box with any EVM-compatible blockchain!

## Features

Wallaby Pay uses modern frontend tools and libraries to create a simple, yet powerful web3 application. It includes features such as:

- Creating wallets for users by having them sign in with Google, Facebook, or Apple.
- Transferring funds between users by looking up their Lens handle.
- Loading the user's transaction history from the blockchain.
- Viewing the user's balance in the wallet.

Under the hood, it is powered by the following tools:

- [Polygon zkEVM](https://polygon.technology/polygon-zkevm) for fast, cheap transactions on the blockchain.
- [thirdweb](https://thirdweb.com) for wallet connection and web3 functionality.
- [Covalent](https://www.covalenthq.com/) for wallet-level transaction history.
- [Lens Protocol](https://www.lens.xyz/) for social features.
- [Next.js](https://nextjs.org/) as the React framework.
- [React Query](https://tanstack.com/query/v4) for data fetching.
- [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) as the UI library.

## Get Started (Running Locally)

To get Wallaby Pay running on your local machine, it's a simple 3-step process. You'll need to have [Node.js](https://nodejs.org/en/) installed on your machine first.

#### 1. Clone the repo 🌞

To start exploring the code, [clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run the following commands:

```bash
# Install dependencies
npm install
```

#### 2. Create an environment variables file 🏋

Next, you'll need to create a `.env.local` file in the root directory of the project. This file will contain your environment variables. You can use the `.env.example` file as a template.

It contains two variables:

- `NEXT_PUBLIC_THIRDWEB_KEY`: A [thirdweb](https://thirdweb.com) API public key. Used for RPC calls and wallet creation.
- `NEXT_PUBLIC_COVALENT_API_KEY`: A [Covalent](https://www.covalenthq.com/) API public key. Used for fetching recent transactions in the [useTransactionHistory](./src/hooks/useTransactionHistory.ts) hook.

#### 3. Run the app! ⭐️

Start the development server by running the following command:

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
