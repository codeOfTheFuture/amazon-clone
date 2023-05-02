# Amazon Clone App Documentation

📦 This is an Amazon clone app built with Next.js 13, TypeScript, Redux Toolkit, Next-Auth, TailwindCSS, Stripe, and Firebase.

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository from GitHub:

    git clone [https://github.com/codeOfTheFuture/amazon-clone.git](https://github.com/codeOfTheFuture/amazon-clone.git)

2. Install the dependencies:

    npm install

3. Create a `.env.local` file in the root directory of the project and add your Authentication, Firebase and Stripe credentials:

    Authentication

    - `GOOGLE_CLIENT_ID`=`<your_google_client_id>` Google OAuth client ID.
    - `GOOGLE_CLIENT_SECRET`=`<your_google_client_secret>` Google OAuth client secret.

    - `NEXTAUTH_URL`=`<your_nextauth_url>` The URL of the Next.js app.
    - `NEXTAUTH_SECRET`= `<your_nextauth_secret>` A secret string used for signing and encrypting cookies.

    Firebase - Client

    - `FIREBASE_API_KEY`=`<your_firebase_api_key>` Firebase API key.
    - `FIREBASE_AUTH_DOMAIN`=`<your_firebase_auth_domain>` Firebase authentication domain.
    - `FIREBASE_PROJECT_ID`=`<your_firebase_project_id>` Firebase project ID.
    - `FIREBASE_STORAGE_BUCKET`=`<your_firebase_storage_bucket>` Firebase storage bucket.
    - `FIREBASE_MESSAGING_SENDER_ID`=`<your_firebase_messaging_sender_id>` Firebase messaging sender ID.
    - `FIREBASE_APP_ID`=`<your_firebase_app_id>` Firebase app ID.

    Stripe

    - `STRIPE_PUBLIC_KEY`=`<your_stripe_public_key>` Stripe public key.
    - `STRIPE_SECRET_KEY`=`<your_stripe_secret_key>` Stripe secret key.

    Stripe Terminal/CLI

    - `STRIPE_SIGNING_SECRET`=`<your_stripe_signing_secret>` Stripe signing secret used to verify webhook events.

4. Run the app locally:

    npm run dev

The app should now be running on [http://localhost:3000](http://localhost:3000).

### Features

The app includes the following features:

    - User authentication with Next-Auth
    - Product browsing
    - Product details and ratings
    - Add to cart and checkout with Stripe integration
    - Order history

### Code Structure

The app uses the new Next.js app directory structure introduced in version 13. The directory structure is organized as follows:

    - `app`: Next.js 13 app directory, which supports nested routes, layouts,
       and server components by default.
    - `components`: reusable UI components
    - `utils`: utility functions
    - `pages/api/`: Next.js API routes.
    - `assets`: static assets like images
    - `styles`: global CSS styles and TailwindCSS configuration
    - `types`: TypeScript type definitions
    - `redux`: Redux store configuration and slice definitions
    - `firebase`: Firebase configuration

### Technologies Used

The app is built with the following technologies:

- [Next.js 13](https://nextjs.org/) - A React framework for building server-side rendered and static websites
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript
- [Redux Toolkit](https://redux-toolkit.js.org/) - A toolset for efficient Redux development
- [Next-Auth](https://next-auth.js.org/) - An authentication library for Next.js
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Stripe](https://stripe.com/) - A payment processing platform
- [Firebase](https://firebase.google.com/) - A backend service for building web and mobile apps

## API Routes Documentation

This is a documentation of the API routes in the Amazon Clone project.

### `pages/api/checkout_session.ts`

#### `POST /api/checkout_session`

Creates a Stripe checkout session for a list of products.

**Request Body:**

| Parameter    | Type     | Description                                         |
| ------------ | -------- | --------------------------------------------------- |
| `basketItems` | `Product[]` | List of products in the basket. |
| `email`      | `string` | Email address of the customer.                     |

Example Request:

POST /api/checkoutSession HTTP/2
Content-Type: application/json
Authorization: <Element: JWT Token>

    ```json
        {
            "basketItems": [
                {
                    "id": 1,
                    "uuid": "a1b2c3",
                    "title": "Product 1",
                    "price": 10.99,
                    "description": "This is the first product",
                    "category": "electronics",
                    "image": "https://example.com/product1.jpg",
                    "rating": {
                        "rate": 4.5,
                        "count": 100
                    },
                    "hasPrime": true
                },
                {
                    "id": 2,
                    "uuid": "d4e5f6",
                    "title": "Product 2",
                    "price": 14.99,
                    "description": "This is the second product",
                    "category": "home",
                    "image": "https://example.com/product2.jpg",
                    "rating": {
                        "rate": 3.9,
                        "count": 50
                    },
                    "hasPrime": false
                }
            ],
            "email": "example@example.com"
        }
    ```

**Response:**

If the checkout session is successfully created, the API returns a JSON object with the `id` property set to the ID of the created checkout session.

If the request is unsuccessful, the API returns a JSON object with an error message.

Example Successful Response:

    ```json
        {
            "id": "cs_test_1234567890"
        }
    ```

Example Unsuccessful Responses:

    - Response (401 Unauthorized)

    ```json
        {
            "message": "Unauthorized"
        }
    ```

    - Response (500 Internal Server Error)

    ```json
        {
            "message": "An error occurred while creating the Stripe checkout session."
        }
    ```

### `pages/api/webhook.ts`

#### `POST /api/webhook`

This route handles Stripe webhook events

**Request Body:**

    - This endpoint expects a Stripe webhook event payload.

**Response:**

    - If the webhook event is successfully processed, the endpoint will respond with a status code of 200.
    - If the webhook event fails to process, the endpoint will respond with a status code of 500.

For more information on Stripe webhooks, refer to the [Stripe documentation](https://stripe.com/docs/webhooks).

## Contributor

This project was developed by Jeffrey Oliver.

- GitHub: [@codeOfTheFuture](https://github.com/codeOfTheFuture)
- Portfolio: [jeff-oliver.com](https://jeff-oliver.com)
- LinkedIn: [Jeffrey Oliver](https://www.linkedin.com/in/jeffrey-oliver-353260160/)
