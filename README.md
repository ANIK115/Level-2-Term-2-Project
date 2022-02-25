
# Esheba

An **E-commerce Website** inspired by [Sheba.xyz](https://www.sheba.xyz/), with some modifications!

Made for Level-2 Term-2 Database Sessional Project created by [Md. Azizur Rahman Anik (1805115)](https://github.com/ANIK115) and [Mashiyat Mahjabin Prapty (1805117)]

Under the kind supervision of [Md. Toufikuzzaman], Lecturer, CSE, BUET



### Tools used

![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)

![Node Js](https://cdn-icons-png.flaticon.com/512/919/919825.png)

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)


### Directory descriptions
* **Esheba :** base project directory
* **routes :** route directory. Router here checks if the user is authorized or not. It filters all the api calls in api route and routed them accordingly.Some controller (business) logic is also implemented in this layer.
* **middlewares :** middlewares protect urls from invalid user requests and handles errors.
* **controllers :** The main/business logic is implemented in controller layer. It fetches data from database based on client requests and checks all data validation and finally sends response.
* **database :** this directory holds all the queries on database and the sql dump file of this project database.
* **doc :** contains basic project info, like, project proposal, ERD etc.
* **utils :** this directory handles user login and session managements
* **views :** used for containing `ejs` template files
* **public :** used for containing images and css files
* **procedures :** this folder contains necessary procedures that are stored in the database storage locally.
* **triggers :** this folder contains necessary triggers that are stored in the database storage locally.


### Things to do after cloning the repo -
1. Install node js and node package manager
2. Install dependencies
	```
	npm i 
	```
3. If oracle is not locally installed. Download oracle instant client and run
	```
	export LD_LIBRARY_PATH=/path/to/instantclient_directory/${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}
	```
4. Set up the database using files in `database/database dump file/ESHEBA.sql`
6. Start the server with
	```
	npm run dev
	```
7. The `Eshbea` app will now be avaiable on `127.0.0.1:3000/api` for customer site, `127.0.0.1:3000/providerapi` for service provider site and `127.0.0.1:3000/moderatorapi` for moderator site


Made with <span style="color: #e25555;">&#9829;</span> by **Azizur Rahman Anik** and **Mashiyat Mahjabin Prapty**
