import { mockData } from "../data/mockData";

export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockData && mockData.length) {
        resolve(mockData);
      } else {
        reject("No transaction data found");
      }
    }, 1500);
  });
};
