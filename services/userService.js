const sql = require('./dbService');

const saveUser = async function saveUser(user) {
    return await sql`insert into users (first_name,last_name,mobile_number,email,username,password) values (${user.firstName},${user.lastName},${user.mobileNumber},${user.email},${user.username},${user.password})`;
}

const updateUser = async function updateUser(user,id) {
    return await sql`update users set first_name = ${user.firstName} ,last_name = ${user.lastName} ,mobile_number = ${user.mobileNumber} ,email = ${user.email} ,username = ${user.username} ,password= ${user.password}, updated_ts=now() where id= ${id}`;
}

const getUsers = async function getUsers(limit, offset) {
    return await sql`select id as id,first_name as firstName, last_name as lastName,email as email, mobile_number as mobileNumber , username as username from users order by id asc limit ${limit} offset ${offset}`;
}

const getUser = async function getUser(id) {
    return await sql`select id as id,first_name as firstName, last_name as lastName,email as email, mobile_number as mobileNumber , username as username from users where id=${id}`;
}

const deleteUser = async function deleteUser(id) {
    return await sql`delete from users where id = ${id}`;
}

const activateUser = async function activateUser(id) {
    return await sql`update users set is_active=true,updated_ts=now() where id = ${id}`;
}

const deActivateUser = async function deActivateUser(id) {
    return await sql`update users set is_active=false,updated_ts=now() where id = ${id}`;
}

const login = async function login(username) {
    return await sql`select id,first_name,last_name,mobile_number,email,is_active,password  from users u where username = ${username}`;
}

const existById = async function existById(id){
    return await sql`select count(1) from users where id=${id}`;
}

module.exports = {
    saveUser, updateUser, getUsers, getUser, deleteUser, activateUser, deActivateUser, login, existById
}