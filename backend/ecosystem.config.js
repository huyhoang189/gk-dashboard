module.exports = {
  apps: [
    {
      name: "anti-ddos", // Replace with your app name
      script: "server.js", // Replace with the entry point file name
      watch: true, // Enable auto-restart on file changes
      ignore_watch: ["node_modules", "logs"], // Ignore specified folders from auto-restart
      instances: 1, // Number of instances to run
      exec_mode: "cluster", // Run in cluster mode for better performance
      max_memory_restart: "300M", // Restart if memory usage exceeds 300MB
      env: {
        NODE_ENV: "production", // Set the environment to production
        PORT: 8080, // Specify the port
      },
    },
  ],
};
