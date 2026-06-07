module.exports = {
  apps: [
    {
      name: "idar-landing",
      cwd: "/var/www/idar-landing",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
