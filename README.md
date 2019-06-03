# SrvcWeb

<h2>Installation</h2>
<p>
<ol>
<li>pull the code from git</li>
<li>install node.js on your system <span> <a href="https://nodejs.org/en/download/"> link </a></span> </span> </li>
<li>use cmd/terminal to navigate to the project folder</li>
<li>run 'npm install'</li>
<li>run 'npm start'</li>
</ol>
</p>
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
