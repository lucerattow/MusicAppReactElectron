export function getFileNameWithoutExtension(filename) {
  const lastDotPosition = filename.lastIndexOf('.');
  return lastDotPosition === -1 ? filename : filename.substring(0, lastDotPosition);
}