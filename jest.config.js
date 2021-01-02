process.env.RIDES_URL = "https://s3.eu-north-1.amazonaws.com/lemon-1/scooter_1337.csv";
process.env.PRICE_RATE_URL = "https://s3.eu-north-1.amazonaws.com/lemon-1/rate.json";

export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: 'jest-environment-node',
  transform: {},
  setupFiles: ["dotenv/config"]
};
