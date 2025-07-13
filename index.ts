import { fetchProductCatalog, fetchProductReviews, fetchSalesReport } from "./src/apiSimulator";

function fetchData() {
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
       return fetchSalesReport();
    })
    .then((salesReport) =>
    {
      console.log(`Sales Report: Total Sales: ${salesReport.totalSales}, Units Sold: ${salesReport.unitsSold}, Average price: ${salesReport.averagePrice}`);
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(() =>{
      console.log("All apis have been attempted")
    })
    ;
}

fetchData();
