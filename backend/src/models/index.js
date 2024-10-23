const mysql2 = require("mysql2/promise")

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql2.createPool({
  host: process.env.db_host || 'localhost',
  user: process.env.db_user || 'root',
  database: process.env.db_database || 'ptpm_taiKhoan',
  password: process.env.db_password || "admin",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;