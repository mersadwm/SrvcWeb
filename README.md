# SrvcWeb

<h2>Installation</h2>
<p>
<ol>
<li>pull the code from git</li>
<li>If you want to run it locally, install node.js on your system <span> <a href="https://nodejs.org/en/download/"> link </a></span> </span> </li>
<li>use cmd/terminal to navigate to the project folder</li>
<li>run 'npm install'</li>
<li><strong>First time setup:</strong>
  <ul>
    <li>Enter your MS SQL Server names, addresses and credentials</li>
    <li>Restore database backup from SQL folder to your SQL Server using Microsoft SSMS or setup your db using sql commands from the folder</li>
    <li>Enter your google authentication key if you want to setup</li>
    <li>Situational: Add your ip to your SQL Server firewall</li>
    </ul>
</li>
<li>run 'npm start'</li>
</ol>
</p>
<br>
<br>
<h2>Documentation and Videos</h2>
<a href="#">Videos folder</a>
<br>
<a href="#">Documentation</a>
<br>
<br>
<h2>Troubleshooting</h2>
<ul>
  <li><strong>Search page/result doesn't load or cannot signin/up</strong></li>
  This issue happens when server is trying to connect to the db server in the first few second after running it
  OR if the database server is paused, you should wait for a while to db server to resume.
  These problem will be solved automatically after a few second, please wait and refresh the page.
  If the problem wouldn't be gone after a minute then restart the web app.
<br>
<br>
  <li><strong>Connection is closed error or some webpages/services doesn't load</strong/></li>
  In Azure or other cloud services with firewall enabled database servers, you should add your IP address in the firewall whitelist and restart the web app.
  If the problem doesn't resolved then check the db server addresses and credentials.
</ul>    
<br>
<br>
<h2>Recommandation for development</h2>
<p>
<h4>Suggested visual studio code extensions</h4>
<ol>
<li>ESLint</li>
<li>EJS Language Support</li>
<li>npm intellisense</li>
<li>Beautify</li>
</ol>
<br>
<h4>ESlint installation</h4>
ESLint will be installed during 'npm install' so you don't need to install it but it needs to be configured.
follow these steps to config ESLint
<ol>
<li>use cmd/terminal to navigate to the project folder</li>
<li>run 'node_modules\.bin\eslint --init'</li>
<li>from the options choose 'To check syntax, find problems, and enforce code style'</li>
<li>then 'JavaScript modules (import/export)'</li>
<li>after it choose 'None of these'</li>
<li>then 'node'</li>
<li>then 'Use a popular style guide'</li>
<li>then 'Airbnb (https://github.com/airbnb/javascript)'</li>
<li>at the end 'JavaScript'</li>
<li>Now type 'y' to confirm</li>
</ol>
<br>
ESLint highlight your code and give you recommandations with its VS extension.
Also you can use it to auto fix your code with the following code
<h6>node_modules\.bin\eslint yourFileName.js --fix</h6>
e.g: 'node_modules\.bin\eslint routes\app.js --fix'
</p>
