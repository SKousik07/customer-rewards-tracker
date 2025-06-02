# 📓 Customer Reward Tracker

A clean transaction summary dashboard built with React and Styled Components, featuring filtering, table views, summary blocks, and pagination for tracking customer rewards effectively.
---

## ✨ Features

* ✅ Filter transactions by month and year
* 📊 Paginated transaction table
* 💡 Summary section showing total rewards and stats
* 📁 Styled with custom color palette using `styled-components`
* 🛠 Graceful UI states: loading, empty data, and error handling
* ✅ Fully tested with Jest and React Testing Library
  
🔍 Filter Logic
* The app supports a flexible transaction filtering system based on month and year:

📅 Default View:
Shows transactions from the most recent 3 months automatically on initial load.

🔄 When only Month is selected:
Displays all transactions that occurred in that month across every available year.
(e.g., selecting "March" shows March transactions from 2022, 2023, etc.)

🔄 When only Year is selected:
Displays all months within the selected year.

🔄 When both Month and Year are selected:
Shows transactions that occurred in that specific month and year combination.

This approach ensures both flexibility and clarity for the user when exploring their rewards history.

---

## 📦 Tech Stack

* **React**
* **Styled Components**
* **Jest** + **React Testing Library**

---


## ✨ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/SKousik07/customer-rewards-tracker.git
cd customer-rewards-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm start
```

The app will be running on [http://localhost:3000](http://localhost:3000)

---
## 🧪 Testing Structure

All components and utilities have their respective test files organized within a tests folder inside their main directories. This makes it easier to keep tests close to the code they validate.

📁 Folder Structure
```bash
src/
├── components/
│   ├── transactionTable.jsx
│   └── tests/
│       └── transactionTable.test.jsx
│
├── utils/
│   ├── rewardsUtils.js
│   └── tests/
│       └── calculateRewardPoints.test.js
│
├── services/
│   ├── mockApi.js
│   └── tests/
│       └── mockApi.test.js
```

## 🧪 Run Tests

```bash
npm test
```

To check test coverage:

```bash
npm test -- --coverage
```

---

## 📸 Screenshots

App Demo:

![customerRewardtracker](https://github.com/user-attachments/assets/2aa944db-ab22-43f6-931e-bff5b171facd)

Unittest report: 

I was able to attain coverage of 96%

![image](https://github.com/user-attachments/assets/47c7d28f-ea12-4b07-84fb-f79bc2503707)


---


## 🧑‍💻 Author

Built with ❤️ by [Kousik S](https://github.com/SKousik07)

---

## 📃 License

[MIT](LICENSE)
