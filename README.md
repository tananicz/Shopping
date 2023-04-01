A simple shop frontend made in React (using Create React App) that lets the user to add an item to a cart, see the contents of the cart and proceed to checkout (no payment implemented)

Additional requirements:
- React Router (web version)
- Express web framework and Cors

In order to run please launch mockAPIServer.js first (node mockAPIServer.js). This server is needed when logging to the shop and contains one record with imaginary user Piotr Kowalski. It accepts the following credentials:
login: Piotr
password: PKowalski123!
and returns JSON with user's id, first name, surname and token.

The app uses external xhr requests to fakestoreapi.com API - it fetches all the products data from there.
Now, this API has some limitations. For example, when user goes to another page or sets "products per page" setting, there should be corresponding xhr request sent. However, fakestore API accepts only "limit" parameter to limit number of products returned. There is no "offset" param and hence, to implement pagination, sorting and "items per page" setting, the whole array of products is fetched and proper manipulations are made on it (thankfully there are only 20 products in total). The only exception is when the user chooses to display products from specific category. As fakestore API has the corresponding query for fetching products in category, it is used in the way API should be integrated with the page.
