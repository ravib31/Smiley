export const aspectRatios = [
  { label: "16:9", value: "16:9" },
  { label: "4:3", value: "4:3" },
  { label: "1:1", value: "1:1" },
];
export const calculateDimensions = (selectedRatio, zoom) => {
  let width = 0;
  let height = 0;

  switch (selectedRatio) {
    case "16:9":
      width = 540;
      height = 540 * (9 / 16);
      break;
    case "4:3":
      width = 540;
      height = 540 * (3 / 4);
      break;
    case "1:1":
      width = 540;
      height = 540;
      break;
    default:
      width = 540;
      height = 540;
      break;
  }

  return { width: width * zoom, height: height * zoom };
};
