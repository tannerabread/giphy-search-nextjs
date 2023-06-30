This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, set the environment variable for the Giphy API key in `.env` file:

```env
GIPHY_API_KEY=<your_key>
```

Then, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

random.ts
search.ts

## Errors

### Error Boundary

This one was taken straight from the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/)

## Logo

Use [Aspect Ratio Boxes](https://css-tricks.com/aspect-ratio-boxes/) from Chris Coyier and "padding-bottom hack". Initialize the wrapper div to height: 0 and then using the padding-bottom equivalent to the image/SVGs aspect ratio to give the div a height proportional to its width.

## DropDown

React Context, etc.