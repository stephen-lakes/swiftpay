# SwiftPay

SwiftPay is a backend API for a secure transaction application that allows users to effortlessly transfer and receive funds with fellow platform users.

## Features

- **Secure Transactions**: Ensure all transactions are encrypted and secure.
- **User Authentication**: Robust user authentication and authorization.
- **Fund Transfers**: Easy and quick transfer of funds between users.
- **Transaction History**: Keep track of all transactions with detailed history.
- **Notifications**: Real-time notifications for transactions.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
    #### terminal
   ```bash
   git clone https://github.com/stephen-lakes/swiftpay.git

2. Navigate to the project directory:
    #### terminal
    ```bash
    $ cd swiftpay

3. Install the dependencies:
    #### terminal
    ```bash
    $ npm install

### Configuration

1. Create a .env file in the root directory and add the following environment variables:
    #### .env
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

### Running the Application
1.  Start the MongoDB server:
    #### terminal
    ```bash
    $ mongod

2.  Start the application
    #### terminal
    ```bash
    $ npm start

3. The API will be running at http://localhost:3000


## API Endpoints

### User Authentication
- Register: POST /auth/register

- Login: POST /auth/login

### Transactions
- Transfer Funds: POST /api/transfer

- Transaction History: GET /api/transactions

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

#### <span style="color: orange;">Happy Coding 🚀.</span>
