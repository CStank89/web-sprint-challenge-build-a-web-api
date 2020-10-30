const server = require("./server.js");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
