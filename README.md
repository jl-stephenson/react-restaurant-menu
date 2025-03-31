# Restaurant Menu

A project to render a menu from an API. A deployed version is on [Vercel](https://react-restaurant-menu-flame.vercel.app/)

## Useful Scripts

- `npm install` - install dependencies
- `npm run dev` - run the app locally and go to [http://localhost:5173/](http://localhost:5173/)
- `npm test` - run test suite

## Developer Notes

I used TanStack Query's select to transform the data from the API and ensure that all menu items were rendered. 

If I had more time I would:

- Test the data transformation more comprehensively
- Correctly calculate the maximum number of extras permitted to users
- Improve the loading and error states
