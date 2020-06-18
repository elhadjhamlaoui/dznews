module.exports = {
  apps : [{
    name: 'API',
    script: './app.js',
    node_args : '--experimental-modules',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
  }],
};
