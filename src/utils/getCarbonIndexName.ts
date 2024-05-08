//function that accepts a carbon intensity number and returns the corresponding index name

export default function getCarbonIndexName(total: number) {
  let index = "";

  if (total) {
    if (total < 35) index = "very-low";
    if (total >= 35 && total < 110) index = "low";
    if (total >= 110 && total < 190) index = "moderate";
    if (total >= 190 && total < 270) index = "high";
    if (total >= 270) index = "very-high";
  }
  return index;
}
