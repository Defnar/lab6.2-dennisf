import { fetchProductCatalog, fetchProductReviews, fetchSalesReport, dataError, networkError } from "./src/apiSimulator";

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
        if (e instanceof dataError) {
          console.error("Data Error:", e.message);
        }
        else if (e instanceof networkError) {
          console.error("Network Error: ", e.message);
        }
        else console.error("Unknown Error: ", e.message);
    })
    .finally(() =>{
      console.log("All apis have been attempted")
    })
    ;
}

fetchData();
