import logger from "../loggers";

export const fetchTransactions = () => {
  logger.info("Starting to fetch transactions...");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/data/mockData.json")
        .then((response) => {
          if (!response.ok) {
            const msg = "Network response was not ok";
            logger.error(msg);
            throw new Error(msg);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length) {
            logger.info(
              { count: data.length },
              "Fetched transactions successfully"
            );
            resolve(data);
          } else {
            const msg = "No transaction data found";
            logger.warn(msg);
            reject(msg);
          }
        })
        .catch((error) => {
          logger.error({ error }, "Failed to fetch transactions");
          reject(error.message || "Failed to fetch data");
        });
    }, 1500);
  });
};
