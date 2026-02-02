<a id="readme-top"></a>
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Stripe Setup</h3>

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

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

- Your time should be focused on creating something amazing. A project that solves a problem and helps others
- You shouldn't be doing the same tasks over and over like creating a README from scratch
- You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

Use the `BLANK_README.md` to get started.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]

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

<!-- Cloning & Using Multiple Products -->

### Cloning

To clone this repository and run it locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your_username/your_repo_name.git

   ```

2. Navigate into the project directory:

<!-- CONTACT -->

## Contact

Adam Booth - [@Adam Booth](https://www.linkedin.com/in/adam-booth-35981636a/) - adam_booth@live.co.uk

Adam Booth - [@Adam Booth](https://www.linkedin.com/in/adam-booth-35981636a/) - adam_booth@live.co.uk

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Check out the resources used!

- [Youtube - How to add Stripe payments to ANY Next.js 14 App! (Easy Tutorial for Beginners)](https://www.youtube.com/watch?v=fgbEwVWlpsI)
- [Getting started with Next.js, TypeScript, and Stripe Checkout](https://vercel.com/kb/guide/getting-started-with-nextjs-typescript-stripe)
- [Stripe Checkout and Webhook in a Next.js Application](https://www.pedroalonso.net/blog/stripe-integration-nextjs/#5-using-with-nextjs-app-router)
- [React Stripe.js](https://docs.stripe.com/sdks/stripejs-react)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
