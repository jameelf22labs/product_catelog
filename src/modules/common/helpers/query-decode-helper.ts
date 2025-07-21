export default class QueryDecodeHelper {
  static decode<T>(filterEncodedStr: string): T {
    if (!filterEncodedStr) return {} as T;

    const decoded = decodeURIComponent(filterEncodedStr);
    const filters = {};

    const queries = decoded.split('::');
    queries.forEach((query) => {
      const [key, value] = query.split(':');
      if (key && value) {
        filters[key] = value;
      }
    });

    return filters as T;
  }
}
