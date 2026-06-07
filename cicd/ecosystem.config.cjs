module.exports = {
  apps: [
    {
      name: "idar-landing",
      cwd: "/var/www/idar-landing",
      script: "npm",
      args: "run start",
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
