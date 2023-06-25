# **Project Title**
## [VidFlix](https://vidflix.cyclic.app/api/genres) -  Deployed Node Application Project on [cyclic](https://app.cyclic.sh/#/) website.

---

### **Introduction**

This project is an example of Vidly, an imaginary video rental app. I've taken a course and gotten certificate of graduation with Code With Mosh on completing Node.js Course and its role in server-side JavaScript development.

---

### **Framework/Languages/Database Used**
- Javascript
- MongoDB
- Mongoose
- RESTful APIs: Node and Express.js
- Visual Studio Code

## **Setup**

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

---

### **Install MongoDB**

To run this project, you need to install the latest version of MongoDB Community Edition first.

[MongoDB Installation](https://docs.mongodb.com/manual/installation/)

Once you install MongoDB, make sure it's running.

---

### **Install the Dependencies**

Next, from the project folder, install the dependencies:

    npm i

### **Populate the Database**

    node seed.js

### **Run the Tests**

You're almost done! Run the tests to make sure everything is working:

    npm test

All tests should pass.

### **Start the Server**

    node index.js

This will launch the ac-fspo1xa-shard-00-00.yknfvgw.mongodb.net.

---

### **(Optional) Environment Variables**

If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

On Mac:

    export vidly_jwtPrivateKey=yourSecureKey

On Windows:

    set vidly_jwtPrivateKey=yourSecureKey

---

### **Author Info**
- [GitHub](https://github.com/javierlok95)

[Back To The Top](#project-title)