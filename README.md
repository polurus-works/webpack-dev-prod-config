# webpack-dev-prod-config
Webpack for DEV, Production environment

 <p>install node npm depencies.</p>

 <p>Add this script to package.json</p>
<pre>
<code>
  "scripts":
  {
      "start": "node node_modules/webpack-dev-server/bin/webpack-dev-server.js --env.NODE_ENV=development --open",
      "build": "cross-env NODE_ENV=production node node_modules/webpack/bin/webpack.js --env.NODE_ENV=production",
      "webpack:dev": "cross-env NODE_ENV=development node node_modules/webpack/bin/webpack.js --env.NODE_ENV=development",
      "watch": "webpack --watch",
  }
  </code>
  </pre>
  
  
  <h3>Run</h3>
  <p>npm run start</p>
   <p>npm run build</p>
   <p>npm run webpack:dev</p>
   <p>npm run watch</p>
