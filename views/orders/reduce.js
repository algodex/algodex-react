/**
 * Orders Reducer
 * @param {array|null} keys
 * @param {array} values
 * @param {boolean} rereduce
 * @return {object}
 */
export default function(keys, values, rereduce) {
  if (rereduce) {
    return values;
  } else {
    return {
      'id': values[0].assetId,
      'type': values.map((val)=>val.type),
      'apat': values.map((val)=>val.apat),
      'o': values[0].price,
      'l': Math.min.apply(null, values.map((val)=>val.price)),
      'h': Math.max.apply(null, values.map((val)=>val.price)),
      'c': values[values.length],
      'avg': sum(values.map((val)=>val.price))/values.length,
      'count': values.length,

    };
  }
};
