
<a id="readme-top"></a>
<!-- PROJECT INtro -->
<h3 align="center">Typescript Store Demo</h3>

<p align="center">
4th project of the Start2Impact University Master’s in Front-End Development.
</p>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>




<!-- ABOUT THE PROJECT -->
## About The Project

<img src="/src/imgs/layout.png" alt="layout" style="border-radius: 15px;">

######
The project is designed to certify the student's skills in TypeScript by developing the operational structure of a fictional beachwear brand.

Specifically:
- The **Product class** handles the creation of items and the assignment of clients to those products.
- The **Client class** manages client information and their ability to place orders.
- The **ProcessoProduzione class** represents a specific production process used by the brand, managing products in production and the addition of new items.

That said, I took the opportunity to implement a UI and a data persistence system using localStorage.

#### Features:  
- every card has a collapsible details section
- the app is entirely responsive
- The **Products Section** allows adding new products (by instantiating a new Product class and adding it to processoProduzione) and adding the product to the "New Order" page.
- The **Clients Section** allows creating new clients (by instantiating a new Client class) and adding the client to the "New Product" page.
- The **Orders Section** allows creating a new order by matching the previously selected client and product, using the ordinaProdotto() method of the Client class.

<img src="/src/imgs/neworder.png" alt="layout" style="border-radius: 15px;">


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>




### Built With

Here's a list of the key technologies and libraries I used to build this app:  


* [![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](#)
* [![Sass](https://img.shields.io/badge/Sass-C69?style=for-the-badge&logo=sass&logoColor=fff)](#)
* [![TypeScript](https://img.shields.io/badge/TypeScript-F7DF1E?style=for-the-badge&logo=typescript&logoColor=000)](#)
* [![Sass](https://img.shields.io/badge/Webpack-84C7E9?style=for-the-badge&logo=webpack&logoColor=fff)](#)
* [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](#)


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>


<!-- Try it --->
## Live Version

Click the link below to try the Firebase-hosted version, or scroll down to the next section if you'd prefer to run the project locally.

[Typescript Store Demo link](https://ts-store-demo.web.app)


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>

<!-- GETTING STARTED -->
## Getting Started

This is how you may set up the project locally.

#### Prerequisites

* npm
######
  ```sh
  npm install npm@latest -g
  ```

#### Installation

Follow the steps below to get your local copy of this app up and running. These instructions assume you have Node.js and npm already installed.


1. Clone the repo
   ```
   git clone git@github.com:J0oR/typescript-store-demo.git
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. Compile typescript
    ```
    npm run compile
    ```
3. start Webpack in development mode or production mode
   ```
   npm run dev
   or
   npm run build
   ```
4. starts Webpack's development server
   ```
   npm run start
   ```


<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>




<!-- CONTACT -->
## Contact


[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/in/giovanni-ruocco-b3a5492a2)

[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/J0oR)

[![CodePen](https://img.shields.io/badge/CodePen-lightgray?style=for-the-badge&logo=codepen&logoColor=black)](https://codepen.io/jrvn/)

<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Best Readme Template](https://github.com/othneildrew/Best-README-Template/blob/main/README.md)
* [Shields.io](https://shields.io/badges)
* [md-badges](https://github.com/inttter/md-badges)

<p align="right" style="margin-top:50px"><a href="#readme-top">⬆️ back to top</a></p>