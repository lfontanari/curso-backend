// importar capa servicios
import  UserServiceDao  from '../services/db/dao/user.dao.js';

const userServiceDao = new UserServiceDao();

export const getAll = async (req,res) => {
    try {
        let users = await userServiceDao.getAll();
        res.send(users);

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({error: error, message: "No se pudo obtener los usuarios"});
    }
};

export const createUser = async (req, res) => {
    try {
        let user = await userServiceDao.save(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({error: error, message: "No se pudo crear el usuario"});
    }
};

export const getById = async (req, res) => {

    try {
        const{ uid } = req.params
        const user = await userServiceDao.getBy(uid);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({error: error, message: "No se pudo obtener el usuario"});
    }
    
};

export const findByUsername = async (username) => {
    try {    
        const user = await userServiceDao.findByUsername(username);
        return(user);
    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const updateUser = async (req, res) => {
    try {
        const{ uid } = req.params 
        const userUpd = await userServiceDao.updateUser(uid, req.body);
        res.status(201).send(userUpd);
      } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({error: error, message: "No se pudo obtener el usuario con ese uid "});
      }
};

export const updateByFilter = async (filter, value) => {
    try {
      const userUpd = await userServiceDao.update(filter, value);
      return(userUpd);
      } catch (error) {
        console.error(error);
        throw error;
      }
};

export const getRandomUser = async (req, res) => {
    try {
      const randomUser = await userServiceDao.randomUser();
      res.status(201).send(userUpd);
      } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({error: error, message: "No se pudo generar un usuario random"});
      }
};