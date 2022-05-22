# Shopify-Coding-Challenge
This is the Shopify coding challenge for the backend developer intern position.


### Test 
Tests are intergral part of any good software. If I had more time to work on this project, I would have loved to intergrate a testing framework like [Jest](https://jestjs.io/) to test the individual components and functionality of the app on both the frontend and backend.

Sample Backend tests
```javascript
it('deletes products successfully ', () => {
   jest.mock('XMLHttpRequest');

    expect(open).toBeCalledWith('DELETE', 'http://example.com'](http://localhost:3000/products/${id}`, true);
    expect(send).toBeCalled();
});

```
