"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiSimulator_1 = require("./src/apiSimulator");
function fetchData() {
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
        return (0, apiSimulator_1.fetchSalesReport)();
    })
        .then((salesReport) => {
        console.log(`Sales Report: Total Sales: ${salesReport.totalSales}, Units Sold: ${salesReport.unitsSold}, Average price: ${salesReport.averagePrice}`);
    })
        .catch((e) => {
        if (e instanceof apiSimulator_1.dataError) {
            console.error("Data Error:", e.message);
        }
        else if (e instanceof apiSimulator_1.networkError) {
            console.error("Network Error: ", e.message);
        }
        else
            console.error("Unknown Error: ", e.message);
    })
        .finally(() => {
        console.log("All apis have been attempted");
    });
}
fetchData();
