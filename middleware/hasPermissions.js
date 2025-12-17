import { parseError } from "../helpers/parseError.js";

export const hasPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user?.permissions) {
            return parseError(403, "Unauthorized", next);
        }

        if (!req.user.permissions.includes(permission)) {
            return parseError(403, "Access denied, you don't have the required permission", next);
        }
        next();
    };
};
