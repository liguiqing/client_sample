export default function buildPaginationQueryOpts(paginationQuery) {
  if (paginationQuery) {
    let sorts = '';
    for (const idx of Object.keys(paginationQuery.sort)) {
      if (sorts.length > 0) {
        sorts += '&';
      }
      sorts += 'sort=' + paginationQuery.sort[idx];
    }
    const queryString: Array<string> = new Array<string>();
    for (const key in paginationQuery) {
      if (key.toString() !== 'sort') {
        queryString.push(`${key}=${paginationQuery[key]}`);
      }
    }
    return `${sorts}&${queryString.join('&')}`;
  }
  return '';
}
