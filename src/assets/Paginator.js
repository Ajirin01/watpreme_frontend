class Paginator {
  constructor(obj) {
    this.obj = obj;
  }

  paginate(parPage) {
    if (!parPage || typeof parPage !== "number" || parPage <= 0) {
      throw new Error("Invalid page size");
    }

    const perPage = parPage;
    const obj = this.obj;
    const pagination = [];
    let start = 0;
    let end = perPage;
    let current;
    let next;
    let previous;
    const last = Math.ceil(obj.length / perPage);

    for (let i = 0; i < last; i++) {
      const subArray = obj.slice(start, end);
      current = i + 1;
      next = i + 1 < last ? i + 2 : null;
      previous = i > 0 ? i : null;
      start = start + perPage;
      end = end + perPage;

      pagination.push({
        data: subArray,
        page: {
          current,
          next,
          previous,
          last,
        },
      });
    }

    return pagination;
  }
}

export default Paginator;
