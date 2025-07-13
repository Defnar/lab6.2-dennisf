interface Product {
  id: number;
  name: string;
  price: number;
}

export function fetchProductCatalog(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        resolve([
          { id: 1, name: "Laptop", price: 1600 },
          { id: 2, name: "Minecraft", price: 15 },
          { id: 3, name: "headset", price: 100 },
          { id: 4, name: "Laptop stickers", price: 15 },
        ]);
      } else {
        reject("Failed to fetch product catalog");
      }
    }, 1000);
  });
}

export function fetchProductReviews(productId: number): Promise<string[]> {
  //review arrays for each product
  let laptopReviews: string[] = [
    "Laptop is a little expensive, but plays many newer games",
    "The specs are amazing on this laptop",
    "overpriced brand",
  ];
  let minecraftReviews: string[] = [
    "Classic game of all time",
    "Build whatever you want, its amazing",
    "Help, I've lost my child to Minecraft, he hasn't left his PC in days",
  ];
  let headsetReviews: string[] = [
    "crisp sounds, good bass, highly recommend",
    "I expect slightly better sound for the price tag",
  ];
  let laptopStickers: string[] = [
    "Good arrangement for $15",
    "Who would spend 15 on stickers??",
  ];

  //sticking everything into an array for easier reference
  let fullReviewArray: string[][] = [
    laptopReviews,
    minecraftReviews,
    headsetReviews,
    laptopStickers,
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        resolve(fullReviewArray[productId - 1]);
      } else reject(`Failed to fetch reviews for product ID ${productId}`);
    }, 1500);
  });
}

interface salesReport {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
}

export function fetchSalesReport(): Promise<salesReport> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        resolve({ totalSales: 10100, unitsSold: 77, averagePrice: 131.17 });
      } else {
        reject("Failed to fetch sales report");
      }
    }, 1000);
  });
}