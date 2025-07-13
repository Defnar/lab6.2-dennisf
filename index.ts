import { fetchProductCatalog, fetchProductReviews } from "./src/apiSimulator";

function fetchData() {
  fetchProductCatalog()
    .then((products) => {
      products.forEach((product) => {
        console.log(`name: ${product.name}, price: $${product.price}`);
      });
      const reviews = products.map((product) => {
        fetchProductReviews(product.id);
      });
      return Promise.all(reviews).then((review) => {});
    })
    .then((reviews) => {});
}

function newFetchData() {
  fetchProductCatalog()
    .then((products) => {
      products.map((product) => {
        return fetchProductReviews(product.id)
          .then((review) =>
            console.log(
              `Name: ${product.name}, Price: $${
                product.price
              }, reviews: ${review.join(" | ")}`
            )
          )
          .catch((e) => {
            console.error(e);
          });
      });
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.log("All apis have been attempted");
    });
}


function fetchNewNewData() {
  fetchProductCatalog()
    .then((products) => {
      return Promise.all(
        products.map((product) => {
          return fetchProductReviews(product.id)
          .then((reviews) => ({
            product,
            reviews
          }));
        })
      );
    })
    .then((reviewProductArray) => {
        reviewProductArray.forEach(({product, reviews}) => {
            console.log(`Name: ${product.name}, Price: $${product.price}, Reviews: ${reviews.join('|')}`)
      })
    })
    .catch((e) => {
        console.error(e);
    })
    ;
}

fetchNewNewData()
