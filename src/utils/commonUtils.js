export const getMaxValue = (array, metric) =>
  array.reduce(
    (max, row) => (row[metric] > max ? row[metric] : max),
    array[0][metric],
  )

export const getMinValue = (array, metric) =>
  array.reduce(
    (min, row) =>
      row[metric] !== 0 && (min === 0 || row[metric] < min) ? row[metric] : min,
    array[0][metric],
  )
