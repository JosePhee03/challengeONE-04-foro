const admin = {
  username: "admin",
  password: "admin4545",
};

const categories = [
  { id: 5, name: "Angular" },
  { id: 15, name: "AWS" },
  { id: 2, name: "CSS" },
  { id: 9, name: "Django" },
  { id: 17, name: "Docker" },
  { id: 8, name: "Express" },
  { id: 14, name: "Firebase" },
  { id: 16, name: "GitHub" },
  { id: 1, name: "HTML" },
  { id: 18, name: "Java" },
  { id: 3, name: "JavaScript" },
  { id: 19, name: "Kubernetes" },
  { id: 20, name: "Laravel" },
  { id: 13, name: "MongoDB" },
  { id: 12, name: "MySQL" },
  { id: 7, name: "Node" },
  { id: 11, name: "PHP" },
  { id: 4, name: "React" },
  { id: 10, name: "Spring Boot" },
  { id: 6, name: "Vue" },
];

const createUser = (user) =>
  fetch("http://localhost:8080/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

const getToken = () =>
  fetch("http://localhost:8080/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  })
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJhbHVyYSBmb3JvIiwiaWQiOjEsImV4cCI6MTcxMDcyNTEwMywiaWF0IjoxNzEwNTUyMzAzfQ.DB5H6Qx9xgwN_iWmKLnVOQq5Yamvq_2LvpbuIiL6qwM";

const getUser = () =>
  fetch("http://localhost:8080/api/user/3", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((data) => {
      if (!data.ok) {
        console.log(data);
      }
      return data.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

const users = [
  admin,
  {
    username: "user123",
    password: "p@ssw0rd",
  },
  {
    username: "webUser",
    password: "secure123",
  },
  {
    username: "techGuy88",
    password: "password123",
  },
  {
    username: "devMaster",
    password: "devPass",
  },
  {
    username: "coder007",
    password: "codingIsFun",
  },
  {
    username: "testUser1",
    password: "test123",
  },
  {
    username: "webDev22",
    password: "webDevPass",
  },
  {
    username: "user2024",
    password: "securePwd",
  },
  {
    username: "adminUser",
    password: "adminPass123",
  },
  {
    username: "javaCoder",
    password: "java123",
  },
];

const post1 = [
  {
    title: "¿Cómo puedo mejorar el diseño de mi sitio web utilizando Vue.js?",
    content:
      "Estoy desarrollando un sitio web y estoy interesado en utilizar Vue.js. ¿Alguien puede proporcionar consejos sobre cómo utilizar Vue.js para mejorar el diseño y la interactividad de mi sitio?",
    categories: [6, 3], // Categorías: Vue, JavaScript
  },
  {
    title:
      "¿Cuál es la mejor forma de implementar autenticación de usuarios en una aplicación Node.js con Express?",
    content:
      "Estoy desarrollando una aplicación Node.js con Express. ¿Alguien puede sugerir las mejores prácticas y herramientas para implementar la autenticación de manera segura en Express?",
    categories: [7, 8], // Categorías: Node, Express
  },
  {
    title: "¿Cómo puedo integrar MongoDB en mi aplicación Django?",
    content:
      "Estoy trabajando en una aplicación Django y quiero utilizar MongoDB como mi base de datos. ¿Alguien puede proporcionar instrucciones sobre cómo integrar MongoDB en una aplicación Django y utilizarlo como base de datos?",
    categories: [9, 13], // Categorías: Django, MongoDB
  },
  {
    title:
      "¿Cuáles son las mejores prácticas para implementar autenticación de usuarios en una aplicación Laravel?",
    content:
      "Estoy desarrollando una aplicación Laravel. ¿Alguien puede ofrecer consejos sobre las mejores prácticas y herramientas para implementar la autenticación de manera segura en Laravel?",
    categories: [20], // Categoría: Laravel
  },
  {
    title:
      "¿Cómo puedo desplegar una aplicación React en un servidor Dockerizado?",
    content:
      "He desarrollado una aplicación React y quiero desplegarla en un servidor Dockerizado. ¿Alguien puede explicar el proceso de despliegue de una aplicación React en un contenedor Docker?",
    categories: [4, 17], // Categorías: React, Docker
  },
];

const fixPost = (post) => {
  const cad = [];
  post.categories.map((category) => {
    categories.map((ca) => {
      if (category === ca.name) cad.push(ca.id);
    });
  });

  return {
    title: post.title,
    content: post.content,
    categories: cad,
  };
};

const createPost = (post, token) =>
  fetch("http://localhost:8080/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(post),
  })
    .then((data) => {
      if (!data.ok) {
        console.log(data);
      }
      return data.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

const getCategories = (token) =>
  fetch("http://localhost:8080/api/category", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((data) => {
      if (!data.ok) {
        console.log(data);
      }
      return data.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

const getAllPost = () => {
  fetch(`http://localhost:8080/api/post`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((data) => {
      if (!data.ok) {
        console.log(data);
      }
      return data.json();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });
};

post1.map((post) => createPost(post, token));
