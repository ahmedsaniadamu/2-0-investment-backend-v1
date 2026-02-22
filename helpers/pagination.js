import { Op } from "sequelize";

export const paginate = async (model, req, options = {}) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const search = req.query.search || "";

  const searchPattern = search ? `%${search.trim().replace(/\s+/g, '%')}%` : "";

  const where = options.where || {};
  if (searchPattern) {
    const orConditions = [];
    if (options.searchable) {
      options.searchable.filter(Boolean).forEach((field) => {
        orConditions.push({ [field]: { [Op.iLike]: searchPattern } });
      });
    }
    if (options.include) {
      options.include.forEach((assoc) => {
        if (assoc.searchable && assoc.searchable.length > 0) {
          const assocName = assoc.as || assoc.model.name;
          assoc.searchable.forEach((field) => {
            orConditions.push({ [`$${assocName}.${field}$`]: { [Op.iLike]: searchPattern } });
          });
        }
      });
    }

    if (orConditions.length > 0) {
      where[Op.and] = [
        ...(where[Op.and] || []),
        { [Op.or]: orConditions }
      ];
    }
  }

  const include = (options.include || []).map((assoc) => {
    return { ...assoc, required: assoc.required === true ? true : false };
  });

  const { count, rows } = await model.findAndCountAll({
    where,
    limit,
    offset,
    order: options.order || [["createdAt", "DESC"]],
    include,
    attributes: options.attributes || {},
    subQuery: false,
  });

  const totalPages = Math.ceil(count / limit);

  return {
    data: rows,
    pagination: {
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};