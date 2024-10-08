const roleUsecase = require('../domain/usecases/role_usecase');

// Handler to create a new role
async function create(req, res) {
  try {
    const { name, position, stacks } = req.body;
    if (!name || !position || !stacks) {
      return res.status(400).json({ message: "Name, Position, and Stacks are required" });
    }
    const role = { name, position, stacks };
    const newRole = await roleUsecase.create(role);
    res.status(201).json({ message: "Role created successfully", roleId: newRole.role_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get all roles
async function getList(req, res) {
  try {
    const roles = await roleUsecase.getList();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get a role by ID
async function getOneByRoleId(req, res) {
  try {
    const roleId = req.params.id;
    const role = await roleUsecase.getOneByRoleId(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get a role by name
async function getOneByName(req, res) {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Role name is required' });
    }
    const role = await roleUsecase.getOneByName(name);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update a role by ID
async function updateByRoleId(req, res) {
  try {
    const roleId = req.params.id;
    const { name, position, stacks } = req.body;
    if (!name && !position && !stacks) {
      return res.status(400).json({ message: "At least one of Name, Position, or Stacks must be provided" });
    }
    const updateData = { name, position, stacks };
    const updatedRole = await roleUsecase.updateByRoleId(roleId, updateData);
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({ message: "Role updated successfully", updatedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to delete a role by ID
async function deleteByRoleId(req, res) {
  try {
    const roleId = req.params.id;
    const deletedRole = await roleUsecase.deleteByRoleId(roleId);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, getOneByRoleId, getOneByName, updateByRoleId, deleteByRoleId };