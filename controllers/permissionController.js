import { db } from "../models/index.js";
import { parseError } from "../helpers/parseError.js";
import { paginate } from "../helpers/pagination.js";

const { Permission, Investors } = db;

export const createPermission = async (req, res, next) => {
    try {
        const { permissions } = req.body;
        if (!permissions?.length) return parseError(400, "Permissions are required", next);
        else if (!Array.isArray(permissions)) return parseError(400, "Permissions must be an array", next);
        const existingPermissions = await Permission.findAll({ where: { name: permissions.map((p) => p.name) } });
        if (existingPermissions.length) return parseError(400, "Permissions already exist", next);
        const permission = await Permission.bulkCreate(permissions);
        return res.status(201).json(permission);
    } catch (error) {
        return parseError(500, error.message, next);
    }
};

export const getPermissions = async (req, res, next) => {
    try {
        const permissions = await paginate(Permission, req, {
              searchable: ["name", "module"],
              order: [["createdAt", "DESC"]],
            });
        return res.status(200).json(permissions);
    } catch (error) {
        return parseError(500, error.message, next);
    }
};

export const assignPermission = async (req, res) => {
    try {
        const { userId, permissionId } = req.body;

        const user = await Investors.findByPk(userId);
        const permission = await Permission.findByPk(permissionId);

        if (!user || !permission) {
            return res.status(404).json({ message: "User or permission not found" });
        }
        await user.addPermission(permission);
        return res.json({ message: "Permission assigned successfully" });
    } catch (error) {
        parseError(500, error.message, next);
    }
};

export const assignPermissions = async (req, res, next) => {
    try {
        const { userId, permissionIds } = req.body;

        if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
            return parseError(400, "Permissions are required", next);
        }

        const user = await Investors.findByPk(userId);
        if (!user) {
            return parseError(404, "User not found", next)
        }
        if(user?.role === "investor") {
            return parseError(400, "Investors are not allowed to assign permissions", next)
        }

        const permissions = await Permission.findAll({
            where: { id: permissionIds }
        });

        if (permissions.length !== permissionIds.length) {
            return parseError(404, "One or more permissions are invalid", next)
        }
        // Assign multiple permissions
        await user.addPermissions(permissions);
        return res.json({
            message: "Permissions assigned successfully",
            assigned: permissionIds
        });

    } catch (error) {
        return parseError(500, error.message, next);
    }
};

export const getUserPermissions = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await Investors.findByPk(userId, {
            include: {
                model: Permission, as: "permissions",
                through: { attributes: [] }, 
            },
        });

        if (!user) {
            return parseError(404, "User not found", next);
        }
        if (user?.role === "investor") {
            return parseError(400, "Investors are not allowed to view permissions", next);
        }
        return res.status(200).json({
            message: "User permissions fetched successfully",
            permissions: user.permissions || [],
        });
    } catch (error) {
        return parseError(500, error.message, next);
    }
};


export const updateUserPermissions = async (req, res, next) => {
    try {
        const { userId, permissionIds } = req.body;

        if (!Array.isArray(permissionIds)) {
            return parseError(400, "Permissions must be an array", next);
        }
        const user = await Investors.findByPk(userId);
        if (!user) {
            return parseError(404, "User not found", next);
        }
        if (user?.role === "investor") {
            return parseError(400, "Investors are not allowed to update permissions", next);
        }
        const permissions = await Permission.findAll({ where: { id: permissionIds } });
        if (permissions.length !== permissionIds.length) {
            return parseError(404, "One or more permissions are invalid", next);
        }
        await user.setPermissions(permissions);

        return res.json({
            message: "User permissions updated successfully",
            assigned: permissionIds,
        });
    } catch (error) {
        return parseError(500, error.message, next);
    }
};
