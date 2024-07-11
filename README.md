# UniMarket

UniMarket is an online marketplace tailored for university students, allowing them to buy, sell, and exchange goods within the campus community. The platform offers user registration, product management, and integrated payment options using M-Pesa or credit card.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- User Registration and Authentication
- Email Verification and OTP for login
- User Profile Management
- Product Listing and Management
- Shopping Cart and Checkout
- Admin Dashboard for monitoring
- Secure Payments with M-Pesa and credit card


## Technologies Used

- **Frontend:** [React](https://reactjs.org/), [HTML](https://html.com), CSS
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Authentication:** [JWT (JSON Web Tokens)](https://jwt.io/)
- **Payment Integration:** M-Pesa
- **Deployment:** 

## Installation

1. Clone the repository on any command line:
   ```sh
   git clone https://github.com/JesseKefa/unimarket.git
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   cd unimarket/frontend
   npm install

   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/unimarket   
   JWT_SECRET=myverysecretkey12345
   EMAIL_USER=unimarket633@gmail.com
   EMAIL_PASS=bcqjuyzwhgifnhml
   OTP_SECRET=myveryotpsecretkey12345
   ```

4. Start the development servers:
   ```sh
   # Start backend server
   cd backend
   node index.js

   # Start frontend server
   cd ../frontend
   npm start
   ```

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Register a new user account.
3. Verify your email and log in.
4. Add products to your store.
5. Browse and add products to the shopping cart.
6. Checkout using M-Pesa or credit card.
7. Admin can log in to the admin dashboard to monitor the platform.

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/verify-email` - Verify user email
- `POST /api/auth/forgot-password` - Send password reset link
- `POST /api/auth/reset-password/:token` - Reset password

### User Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile/image` - Update profile image

### Product Routes
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product

### Payment Routes
- `POST /api/payments/mpesa` - Process M-Pesa payment

### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/products` - Get all products

## Project Structure

```
UniMarket/
│
├── backend/                      # Backend directory containing server-side code
│   ├── config/                   # Configuration files
│   │   └── db.js                 # Database connection configuration
│   ├── controllers/              # Controllers to handle business logic
│   │   ├── authController.js     # Handles authentication logic
│   │   ├── productController.js  # Handles product-related logic
│   │   └── ...                   # Other controllers as needed
│   ├── middleware/               # Middleware for handling requests
│   │   └── authMiddleware.js     # Middleware for authentication
│   ├── models/                   # Database models
│   │   ├── User.js               # User model schema
│   │   ├── Product.js            # Product model schema
│   │   └── Order.js              # Order model schema
│   ├── routes/                   # Route handlers
│   │   ├── auth.js               # Authentication routes
│   │   ├── userRoutes.js         # User-related routes
│   │   └── ...                   # Other routes as needed
│   ├── uploads/                  # Directory for uploaded files
│   ├── .env                      # Environment variables
│   ├── index.js                  # Entry point for the backend server
│   └── package.json              # Backend dependencies and scripts
│
├── frontend/                     # Frontend directory containing client-side code
│   ├── public/                   # Publicly accessible files
│   │   └── index.html            # Main HTML file
│   ├── src/                      # Source files for the frontend
│   │   ├── components/           # React components
│   │   │   ├── AccountSettings.js# Component for account settings
│   │   │   ├── Login.js          # Component for login
│   │   │   └── ...               # Other components as needed
│   │   ├── App.js                # Main App component
│   │   ├── index.js              # Entry point for the React application
│   │   └── ...                   # Other source files as needed
│   ├── .env                      # Environment variables
│   ├── package.json              # Frontend dependencies and scripts
│   └── ...                       # Other frontend files
│
├── .gitignore                    # Specifies files to be ignored by Git
├── README.md                     # Project documentation
└── ...                           # Other files and directories as needed

```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).





























