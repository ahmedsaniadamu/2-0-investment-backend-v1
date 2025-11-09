export const paginate = async (model, req, options = {}) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const search = req.query.search || "";

  const where = options.where || {};

  if (search && options.searchable && options.searchable.length > 0) {
    where[Symbol.for("or")] = options.searchable.map((field) => ({
      [field]: { [Symbol.for("like")]: `%${search}%` },
    }));
  }

  const { count, rows } = await model.findAndCountAll({
    where,
    limit,
    offset,
    order: options.order || [["createdAt", "DESC"]],
    include: options.include || [], 
    attributes: options.attributes || {}, 
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
