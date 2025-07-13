"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiSimulator_1 = require("./src/apiSimulator");
function fetchData() {
    (0, apiSimulator_1.fetchProductCatalog)()
        .then((products) => {
        products.forEach((product) => {
            console.log(`name: ${product.name}, price: $${product.price}`);
        });
        const reviews = products.map((product) => {
            (0, apiSimulator_1.fetchProductReviews)(product.id);
        });
        return Promise.all(reviews).then((review) => { });
    })
        .then((reviews) => { });
}
function newFetchData() {
    (0, apiSimulator_1.fetchProductCatalog)()
        .then((products) => {
        products.map((product) => {
            return (0, apiSimulator_1.fetchProductReviews)(product.id)
                .then((review) => console.log(`Name: ${product.name}, Price: $${product.price}, reviews: ${review.join(" | ")}`))
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
    (0, apiSimulator_1.fetchProductCatalog)()
        .then((products) => {
        return Promise.all(products.map((product) => {
            return (0, apiSimulator_1.fetchProductReviews)(product.id)
                .then((reviews) => ({
                product,
                reviews
            }));
        }));
    })
        .then((reviewProductArray) => {
        reviewProductArray.forEach(({ product, reviews }) => {
            console.log(`Name: ${product.name}, Price: $${product.price}, Reviews: ${reviews.join('|')}`);
        });
    })
        .catch((e) => {
        console.error(e);
    });
}
fetchNewNewData();
