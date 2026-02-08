export const services = [
    {
    id: 'dashboard-api',
    name: 'Dashboard API',
    type: 'http',
    target: 'http://localhost:3000/health',
    expectedStatus: 200,
    interval: 60
  },
  {
    id: 'postgres-db',
    name: 'PostgreSQL Database',
    type: 'tcp',
    host: 'localhost',
    port: 5432,
    interval: 120
  },
  {
    id: 'redis-cache',
    name: 'Redis Cache',
    type: 'tcp',
    host: 'localhost',
    port: 6379,
    interval: 60
  },
  {
    id: 'youtube-api',
    name: 'YouTube Data API',
    type: 'custom',
    checkFunction: 'checkYouTubeAPI',
    interval: 3600  
  },
  {
    id: 'docker-daemon',
    name: 'Docker Daemon',
    type: 'tcp',
    host: 'localhost',
    port: 2375,
    interval: 120
  }
]
