# algodex-react

Main UI Project for Algodex. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Note that `development` is the default branch.

## Getting Started

### Set up a Github token to make it easy to install the private algodex-sdk npm package.

https://github.com/settings/tokens

Copy and save the secret.

In a Linux terminal (git-bash on Windows):

create an ~/.npmrc file with the following contents:
```
//npm.pkg.github.com/:_authToken=tokensecretgoeshere
@algodex:registry=https://npm.pkg.github.com/
```
or you can use npm login with your token
```
$ npm login --scope=@algodex --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN_SECRET
> Email: PUBLIC-EMAIL-ADDRESS
```

### Clone and install the necessary libraries

```
yarn
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Further edits info (default docs):

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## How to add additional languages
How to add additional languages:

1. Edit i18n.json to add additional supported locales under key "locales".
`
{
  "locales": ["en", "es"], // < --- add new locales to this array
   ...
}
`
2. Copy the json files inside locales/en into another folder per locale
3. JSON files are separated by section mostly
4. Change the text to language of choice per json file, key names must stay the same
5. In components/header/index.jsx, update localeToFlags with the appropriate locale key to flag country code. Country codes will display flags according to the react-country-flag library