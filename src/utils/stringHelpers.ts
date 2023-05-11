function capitalize(string?: string) {
  if (!string) return '';
  return `${string.trim().slice(0, 1).toLocaleUpperCase()}${string.trim().slice(1)}`;
}

function decapitalize(string?: string) {
  if (!string) return '';
  return `${string.trim().slice(0, 1).toLocaleLowerCase()}${string.trim().slice(1)}`;
}

export { capitalize, decapitalize };
