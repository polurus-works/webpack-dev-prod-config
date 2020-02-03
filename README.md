# webpack-dev-prod-config
Webpack for DEV, Production environment

install node npm depencies.

Add this script to package.json

  "scripts":
  {
      "start": "node node_modules/webpack-dev-server/bin/webpack-dev-server.js --env.NODE_ENV=development --open",
      "build": "cross-env NODE_ENV=production node node_modules/webpack/bin/webpack.js --env.NODE_ENV=production",
      "webpack:dev": "cross-env NODE_ENV=development node node_modules/webpack/bin/webpack.js --env.NODE_ENV=development",
      "watch": "webpack --watch",
  }
  
  
  <h3>Run</h3>
  npm run start
  npm run build
  npm run webpack:dev
  npm run watch
