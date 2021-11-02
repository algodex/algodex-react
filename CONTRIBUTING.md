# 👥 Contribution Guide

Start by installing the following:

- [Nodejs v16](https://nodejs.org/en/download/)

## 🚀 Getting Started:

Install dependencies
```bash
yarn install
```
Generate SSL Certificates(HTTP/2)
```bash
npx devcert-cli generate localhost
```

Copy the default .env file
```bash
cp local.env .env
```

Run snowpack
```bash
npm dev
```

## 📝 Commit Guidelines

Create `feature-<name>` branches from the `development` branch. Create a Pull Request from
your `feature-<name>` into the `development` branch.

Husky will run `npm test` before each commit to ensure compliance. Commits must follow
the [devmoji/gitmoji](https://gitmoji.dev/) conventional commits standard.

## 💬 Code of Conduct

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

Make sure to review the [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md).
