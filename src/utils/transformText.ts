export function transformarParaUrl(texto: string) {
  // Convertir a minúsculas
  let url = texto.toLowerCase();

  // Reemplazar espacios por guiones
  url = url.replace(/\s+/g, "-");

  // Reemplazar tildes y caracteres especiales comunes
  url = url.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remover caracteres no permitidos en URLs
  url = url.replace(/[^a-z0-9\-]/g, "");

  return url;
}
