# algodex-react

[![story-book](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg)](https://www.chromatic.com/builds?appId=60b0bd43c7a26d003be10f53)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/algodex/algodex-react/actions/workflows/ci.yml/badge.svg)](https://github.com/algodex/algodex-react/actions/workflows/ci.yml)
[![Sauce Test Status](https://app.saucelabs.com/buildstatus/algodex?auth=a575d8742c484fe2f6006e9bf6c1022c)](https://app.saucelabs.com/u/algodex)
[![Maintainability](https://api.codeclimate.com/v1/badges/f9008846c3425fe77dc7/maintainability)](https://codeclimate.com/repos/624385d6658c406f70000ff2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f9008846c3425fe77dc7/test_coverage)](https://codeclimate.com/repos/624385d6658c406f70000ff2/test_coverage)

[![Sauce Test Status](https://app.saucelabs.com/browser-matrix/algodex.svg?auth=a575d8742c484fe2f6006e9bf6c1022c)](https://app.saucelabs.com/u/algodex)

Main UI Project for Algodex. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Note that `development` is the default branch.

## Getting Started

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

