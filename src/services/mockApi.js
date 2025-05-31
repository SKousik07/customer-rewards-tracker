export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/data/mockData.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length) {
            resolve(data);
          } else {
            reject("No transaction data found");
          }
        })
        .catch((error) => reject(error.message || "Failed to fetch data"));
    }, 1500);
  });
};
