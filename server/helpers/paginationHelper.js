//get pagination {limit,offset}
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

//get Paging Data
const getPagingData = (data, page, limit, items) => {
  const { count: totalItems } = data;

  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, [items]: data.rows, totalPages, currentPage };
};

//pagination wHelper
const paginationHelper = {
  getPagingData,
  getPagination,
};

module.exports = paginationHelper;
