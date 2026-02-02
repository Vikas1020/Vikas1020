module.exports = {
  apps: [
    {
      name: "node-app",
      script: "app.js",          // or index.js / server.js
      instances: "max",          // use all CPU cores
      exec_mode: "cluster",      // cluster mode for production

      watch: false,              // set true only for development
      autorestart: true,

      max_memory_restart: "500M",

      env: {
        NODE_ENV: "development",
        PORT: 3000
      },

      env_production: {
        NODE_ENV: "production",
        PORT: 8081
      },

      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};

