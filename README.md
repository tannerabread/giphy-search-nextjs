This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone this repo to local, open the project, and set the environment variable for the Giphy API key in `.env.local` file:

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

---
## Interaction

The app has a simple interface to make it more enjoyable to work with.

### Search

- Type anything in the search box and either hit `Enter` or wait half a second to see results.
- Alternatively, use the query string to search for a term
  - e.g. `localhost:3000/search?q=cats` to search for cats
- After a term has been searched, it can be returned to from the dropdown box, which holds a history of the search terms and a "Home" link

### Interacting with a Gif

- Gifs can be copied on the preview
- Gifs can also be clicked to open a larger version in the Modal

### Logo

- Clicking the logo brings you home

---
## Project Structure

I chose this project structure because it seemed like the most future-proof if more features were added to this project.

The only changes I thought about making with the current setup is moving the CSS modules to the same location as the components they are for. I only decided against it because there was already a styles folder with the `Home.module.css` file, best practices may have been to move the component CSS modules but I'm not sure.

```
├── components
│   ├── errors
│   │   ├── *.tsx
│   ├── layout
│   │   ├── *.tsx
│   ├── *.tsx
├── contexts
│   ├── *.tsx
├── hooks
│   ├── *.ts
├── pages
│   ├── api
│   │   ├── *.ts
│   ├── search
│   │   ├── *.tsx
│   ├── *.tsx
├── public
│   ├── *.ico/png/svg
├── styles
│   ├── layout
│   │   ├── *.module.css
│   ├── *.css
│   ├── *.module.css
├── utils
│   ├── *.ts
```

---
## Architecture

The basic architecture of this application is as follows:

### API Routes

- Next.js API routes are set up to fetch data from the Giphy API, which are then called from the client. 
  - I would have put the data fetching in `getServerSideProps` but there was a requirement to show off backend skills. 
  - Since the API route was created, it would be redundant to call the API route from getServerSideProps as this is the [server calling itself](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-or-api-routes), so client side fetching was done.
  - This decision wasn't as big of a deal since [SEO was not relevant](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#fetching-data-on-the-client-side) in this app
  - With more time, I may have extracted the client-side `fetchData` components into their own hooks to avoid calling them directly in useEffect
- The routes return necessary metadata from the Gifs along with the preview and original sized mp4

### Modularity/Reusability

- Components were broken down into the smallest pieces possible for modularity and reusability

### Redundant Logic & Utility Files

- Redundant logic was either exported from files or moved to utility files to be shared amongst components
  - There is a utility file for message constants, I don't believe it would normally go in a utils folder but that's where it ended up for this project
  - I did not create a types folder, most of the types are in the files that require them and exported if needed by others

### Navigation

- There are 2 main pages, `Home` (which displays 3 random Gifs), and `Search` which allows the user to search for anything they want
  - There is the option to "load more" of the same term at the bottom of the Search page

#### Search Drop Down

I created the search drop down because it seemed like a good option. 

It wasn't until a beta user pointed out that it's not great UX/UI and it should be more like google's search bar that has a drop down on the search field that I tried a different route. 

I attempted to use a [datalist element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) which worked for what I was going for but led to really bad UI as it is difficult to style and wouldn't match the theme of the rest of the app. Note this was tested on Mac OS X and Chrome so results would be different elsewhere. I found some messy workarounds but don't have time to dig deep into them to see if they are viable for this project.

### Layout and Component Features

- There is a layout that wraps any rendered page, which includes the Header, SearchBar, and SearchDropDown
  - The `Layout` component also holds the logic for switching pages when a new search term is entered
  - SearchDropDown holds all previous searches and updates search to the selected term
  - SearchBar utilizes `lodash` debouncing to mitigate unnecessary requests to the server before sending the term back to Layout and through to the requesting search page

### Toast

- I created a hook for the toast notifications along with its own component to get rid of managing state of the notification in individual components/pages
  - I did my best to clear timeouts and clean up effects throughout the codebase, the toast notification is meant to clear the timeout if a new one is activated or if the component is unmounted
- The toast hook/component came in handy for both rendering a success notification when the URL is copied and also for rendering error messages returned from the server.

### Display

- The `Display` component is used for rendering any and all pages, except for the ErrorBoundary fallback UI. Most error pages show a pre-set Gif 
  - It also implements an [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to lazy-load the Gif video content, which is necessary if "Load More" has been clicked many times for a search term, the user navigates to another term, and then comes back, loading the entire list that was fetched

### State Management

- Search state/history was originally managed in the search page itself, but after the dropdown was added it started causing too much prop tunneling/bubbling so context was added that holds:
  - All searches
  - Currently selected search
  - Search states which holds all gifs that have been called from the API
- I may not have needed the `searches` context as the same information is stored within searchStates, but the way it is currently set up keeps the searches in order for the dropdown and is much easier to deal with for that purpose.

### Error Handling

There is error handling on the server side and on the client:
- An error boundary file was added as best practices to catch JavaScript errors, it doesn't do much more than default suggestions found in the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/) but should be adequate to at least render a fallback for critical errors
- A custom 404 page was added (try going to [http://localhost:3000/bad-path](http://localhost:3000/bad-path) with the server running)
- Most(all?) of the error messages are within `utils/messages.ts`

#### Rate Limit Exceeded
To test a `429` rate limit exceeded, go to `utils/giphy-api.ts` and modify line 30 to be:
```diff
- if (response.status === 429) {
+ if (response.status === 429 || true) {
```
You should still be able to navigate to previous searches even when seeing this warning.

---
## Other Design Decisions
### API Routes

The URLs in the API Routes for this project were originally just string literals that frankensteined together the search params and added `encodedURIComponent` to handle things like spaces. I then switched to using `URLSearchParams` to automatically handle this, before [reading more about it](https://stackoverflow.com/a/62969380/8328466) and finding out that the first way was closer to the actual answer but could have been implemented in a more readable way.

The actual fetch logic was extracted to a utility file to keep the api routes clean and consolidate error handling and response types.

#### Search API Route

The search route makes a single request to the Giphy API Searches endpoint using a `searchTerm` and `offset`. Limit is defaulted to 50 (max for beta key) and could easily be added to the options, but was not implemented for this project, along with all other query params that are hard-coded.

#### Random API Route

The random route fires off 3 simultaneous calls to the Giphy API Random endpoint and waits for them all to return before consolidating those responses into an array to return to the client.

### Logo

Use [Aspect Ratio Boxes](https://css-tricks.com/aspect-ratio-boxes/) from Chris Coyier and "padding-bottom hack". Initialize the wrapper div to height: 0 and then using the padding-bottom equivalent to the image/SVGs aspect ratio to give the div a height proportional to its width.

Originally I wasted a few hours creating my own .svg for the logo and with custom fonts and colors, but after finding the [GIPHY Branding Guidelines](https://support.giphy.com/hc/en-us/articles/360022283772-GIPHY-Brand-Guidelines) I switched to their supplied logos and additionally created a favicon based on their images. The original is still part of the project under `public/giphy-logo.svg` but is not being used.

---
## Bonus

If you want to have a laugh after going through this project but also witness how much I have grown in 2 years, feel free to check out my [previous submission](https://github.com/tannerabread/giphy_api_search/blob/da03d13eda578227f3bdf28c78152c7454b81c60/src/App.js) for similar requirements, which somehow fit into 1 file of 191 lines