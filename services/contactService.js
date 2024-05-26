const sql = require('./dbService');

const saveContacts = async function saveContacts(contacts,userId) {
    return await sql`INSERT INTO public.contacts(
        first_name, last_name, mobile_number, email, address, nick_name, relationship, created_by, created_ts)
        VALUES (${contacts.firstName}, ${contacts.lastName}, ${contacts.mobileNumber}, ${contacts.email}, ${contacts.address}, ${contacts.nickName}, ${contacts.relationship}, ${userId}, now())`;
}

const updateContacts = async function updateContacts(id,contacts){
    return await sql`UPDATE public.contacts
	SET first_name=${contacts.firstName}, last_name=${contacts.lastName}, mobile_number=${contacts.mobileNumber}, email=${contacts.email}, address=${contacts.address}, nick_name=${contacts.nickName}, relationship=${contacts.relationship}, updated_ts=now()
	WHERE id=${id}`;
}

const getContacts = async function getContacts(userId,limit,offset){
    return await sql`SELECT id, first_name as firstName, last_name as lastName, mobile_number as mobileNumber, email as email, address as address, nick_name as nickName, relationship FROM public.contacts where created_by=${userId} limit ${limit} offset ${offset}`;
}

const getContact = async function getContact(id){
    return await sql`select id, first_name as firstName, last_name as lastName, mobile_number as mobileNumber, email as email, address as address, nick_name as nickName, relationship FROM public.contacts where id=${id}`;
}

const deleteContact = async function deleteContact(id){
    return await sql`delete FROM public.contacts where id=${id}`;
}

module.exports = { saveContacts, updateContacts, getContacts, getContact, deleteContact };