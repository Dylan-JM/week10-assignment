<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://stripe.com/gb">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe Logo" width="125" height="80">
  </a>

  <h3 align="center">Next.js & Stripe Setup</h3>

  <p align="center">
    A Next.js Project With Stripe Implementation!
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#basic-setup">Basic Setup</a></li>
        <li><a href="#cloning">Cloning</a></li>
        <li><a href="#liveshare-setup">LiveShare Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project demonstrates a basic Stripe Checkout integration in a Next.js application. It is designed as a learning-focused example that shows how to securely create checkout sessions using Stripe’s API and redirect users to a hosted payment page.

The goal of this project is to provide a clear and minimal reference for developers who want to:

Integrate Stripe Checkout into a modern Next.js app

Understand how to structure API routes using the App Router

Securely handle Stripe secret keys with environment variables

Build a foundation that can be expanded to support multiple products, subscriptions, or webhooks.

This setup is ideal for beginners getting started with Stripe as well as developers who want a lightweight template they can build upon for real-world payment flows.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Stripe][Stripe]][Stripe-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

### Prerequisites

- npm

  ```sh
  npx create-next-app@latest
  ```

- Stripe
  ```sh
  npm install stripe
  ```

### Basic Setup

1. Create Next.js Project

- npm

  ```sh
  npx create-next-app@latest
  ```

  Typescript : NO, Linter: ESLint, React Compiler: Yes, Tailwind CSS:Yes, src/directory: Yes, App Router: Yes,
  Import Alias,: NO.

2. Create/setup a stripe account and find your publishable/secret keys.

   ```sh
   https://stripe.com/gb
   ```

3. Create a .env.local file in the root folder & add your keys using this example.
   ```sh
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\\\YOURPUBLISHABLEKEYHERE\\\
    STRIPE_SECRET_KEY=\\\YOURSECRETKEYHERE\\\
    NEXT_PUBLIC_BASE_URL=http://localhost:3000 \\\EXAMPLE ADD YOUR LOCALHOST:PORT HERE
   ```
4. Create a api folder inside of src/app then inside the api folder create a checkout folder. inside the checkout folder create a route.js and add the code below.

   ```js
   import Stripe from "stripe";
   import { products } from "@/app/data/products";

   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   export async function POST(req) {
     const body = await req.json();
     const { productId } = body;

     const product = products.find((p) => p.id === productId);

     const session = await stripe.checkout.sessions.create({
       mode: "payment",
       payment_method_types: ["card"],
       line_items: [
         {
           price_data: {
             currency: "usd",
             product_data: {
               name: product.name,
               images: [product.image],
             },
             unit_amount: product.price,
           },
           quantity: 1,
         },
       ],
       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
     });

     return Response.json({ url: session.url });
   }
   ```

5. Inside app create a cancel folder within that create a page.js and add the code below.

   ```js
   export default function Cancel() {
     return <h1>Payment canceled </h1>;
   }
   ```

6. Inside app create a success folder within that create a page.js and add the code below.

   ```js
   export default function Success() {
     return <h1>Payment successful</h1>;
   }
   ```

7. Create a components folder inside app then inside components create a PayButton.jsx and add the code below.

   ```js
   "use client";

   export default function PayButton() {
     const handlePay = async () => {
       const res = await fetch("/api/checkout", { method: "POST" });
       const data = await res.json();
       window.location.href = data.url;
     };

     return <button onClick={handlePay}>Pay $5</button>;
   }
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->

## Usage

Once you have completed the setup, you can use the Stripe checkout in your Next.js app as follows:

1. **Import the PayButton component**  
   Inside any page or component where you want to allow a user to pay:

   ```jsx
   import PayButton from "@/app/components/PayButton";

   export default function HomePage() {
     return (
       <div>
         <h1>Buy Our Product</h1>
         <PayButton />
       </div>
     );
   }
   ```

2. Start your development server

   ```

     npm run dev

   ```

3. Test the payment flow

   Click the Pay $5 button.

   You should be redirected to Stripe Checkout.

   Complete the payment using the test card numbers provided by Stripe (https://stripe.com/docs/testing
   ).

   After payment, you will be redirected to /success or /cancel depending on the outcome.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Cloning & Using Multiple Products -->

### Cloning (Includes Multiple Products(Intermediate))

To clone this repository and run it locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:Dylan-JM/week10-assignment.git

   ```

2. Navigate into the project directory:

   ```bash
   cd your_repo_name

   ```

3. Install dependencies

   ```
   npm install
   ```

4. Create a .env.local file in the root folder and add the code below.
   (MUST SETUP STRIPE ACCOUNT FIRST)

   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. Run It!
   ```
   npm run dev
   ```

## Demo Project
[Demo](https://week10-assignment-five.vercel.app/)

<!-- Paired Programming -->

## LiveShare

  <ul>
    <li>Live Share is a Visual Studio Code extension that enables real-time collaboration on the same codebase.</li>
    <li>It can be used for paired programming, code reviews, mentoring, and technical interviews.</li>
    <li>Developers can edit code together, follow each other’s cursors, and navigate files in sync.</li>
    <li>Live Share allows shared terminals, debugging sessions, and local servers.</li>
    <li>It reduces setup time since collaborators can join without cloning the repository.</li>
  </ul>

## LiveShare Setup

1. In VS Code Extension Search For Live Share & Install it.(The Creator Is Microsoft)

2. You can either share or join

3. If you're sharing click share and send the url to your group.

4. If joining click join and paste the link given to you.

<!-- ROADMAP -->

## Roadmap

- [x] Initial Next.js + Stripe setup
- [x] Basic checkout flow with PayButton component
- [x] Success and cancel pages
- [x] Add support for multiple products
- [ ] Implement dynamic pricing and subscription plans
- [ ] Add Stripe Webhooks for payment confirmation
- [ ] Improve UI/UX with product gallery and responsive design
- [ ] Add testing and error handling for checkout flow
- [ ] Deployment guide for Vercel/Netlify with Stripe integration

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Adam Booth - [@Adam Booth](https://www.linkedin.com/in/adam-booth-35981636a/) - adam_booth@live.co.uk

Dylan Marley - [@Dylan Marley](https://www.linkedin.com/in/dylan-marley-a439bb1b8/) - dylan.james.marley@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Check out the resources used!

- [Youtube - How to add Stripe payments to ANY Next.js 14 App! (Easy Tutorial for Beginners)](https://www.youtube.com/watch?v=fgbEwVWlpsI)
- [Getting started with Next.js, TypeScript, and Stripe Checkout](https://vercel.com/kb/guide/getting-started-with-nextjs-typescript-stripe)
- [Stripe Checkout and Webhook in a Next.js Application](https://www.pedroalonso.net/blog/stripe-integration-nextjs/#5-using-with-nextjs-app-router)
- [React Stripe.js](https://docs.stripe.com/sdks/stripejs-react)
- [LiveShare VS Code](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Stripe-url]: https://stripe.com/gb
[Stripe]: https://img.shields.io/badge/Stripe-6772E5?style=for-the-badge&logo=stripe&logoColor=white
