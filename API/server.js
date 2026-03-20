import express from "express";
import pkg from "@prisma/client";
import cors from 'cors';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();
app.use(cors());

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      profession: req.body.profession,
    },
  });
  res.status(201).json(user);
});

app.get("/users", async (req, res) => {
  let users = []; 

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
        profession: req.query.profession
      }
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.put("/users/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      profession: req.body.profession,
    },
  });
  res.status(201).json(user);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Utilizador apagado com sucesso!!!" });
});

app.listen(3000);

/* Conta MongoDB
    Name: Davide
    Password: osNidLHCbLmrK6Fm
*/
