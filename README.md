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

The logo took some finagling to get correct. 

### Creating the SVG

I started with the SVG supplied on Giphy's home page to get the logo on the left, then typed in "H GIPHY SEARCH!" [into this tool](https://danmarshall.github.io/google-font-to-svg-path/) to get the paths for the rest of the letters while replacing the "H" with the logo path. I combined the logo and the new words with [this tool](https://yqnn.github.io/svg-path-editor/) and got the width/height from there. I then grouped the letters in pairs and matched the colors to the logo colors.

### Making it responsive

Use [Aspect Ratio Boxes](https://css-tricks.com/aspect-ratio-boxes/) from Chris Coyier and "padding-bottom hack". Initialize the wrapper div to height: 0 and then using the padding-bottom equivalent to the image/SVGs aspect ratio to give the div a height proportional to its width.
