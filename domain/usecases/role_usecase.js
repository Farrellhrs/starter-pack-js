// npm install mongoose uuid

const repositories = require('../repositories/role_repository');
const { v4: uuidv4 } = require('uuid');


// Function to create a new role
const create = async (roleData) => {
    try {
        const roleId = uuidv4();
        const role = {
            role_id: roleId,
            ...roleData
        };
        const createdRole = await repositories.create(role);
        return createdRole;
    } catch (error) {
        throw new Error('Failed to create role');
    }
};

// Function to get list of roles
const getList = async () => {
    try {
        const roles = await repositories.findAll();
        return roles;
    } catch (error) {
        throw new Error('Failed to get list of roles');
    }
}

// Function to get a role by role id
const getOneByRoleId = async (roleId) => {
    try {
        const role = await repositories.getOneByRoleId(roleId);
        return role;
    } catch (error) {
        throw new Error('Failed to get role by role_id');
    }
}

// Function to get a role by name
const getOneByName = async (name) => {
    try {
        const role = await repositories.getOneByName(name);
        return role;
    } catch (error) {
        throw new Error('Failed to get role by name');
    }
}

// Function to update a role by role id
const updateByRoleId = async (roleId, updateData) => {
    try {
        const updatedRole = await repositories.updateOneByRoleId(roleId, updateData);
        return updatedRole;
    } catch (error) {
        throw new Error('Failed to update role by role_id');
    }
}

// Function to delete a role by role id
const deleteByRoleId = async (roleId) => {
    try {
        const deletedRole = await repositories.deleteOneByRoleId(roleId);
        return deletedRole;
    } catch (error) {
        throw new Error('Failed to delete role by role_id');
    }
}

module.exports = { create, getList, getOneByRoleId, getOneByName, updateByRoleId, deleteByRoleId };