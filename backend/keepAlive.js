const axios = require("axios");

const keepAlive = () => {
  const SELF_URL = process.env.BACKEND_URL;
  const PING_INTERVAL = 14 * 60 * 1000; 

  setInterval(async () => {
    try {
      const response = await axios.get(SELF_URL);
      console.log(`Self-ping successful: ${response.status}`);
    } catch (error) {
      console.error("Error during self-ping:", error.message);
    }
  }, PING_INTERVAL);
};

module.exports = keepAlive;