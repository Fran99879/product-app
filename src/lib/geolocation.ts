/**
 * Obtiene la ubicación del dispositivo (Geolocation API del navegador) y la
 * convierte en una dirección legible mediante reverse geocoding.
 *
 * Usa BigDataCloud (gratis, sin API key, pensado para uso del lado del cliente).
 * Requiere contexto seguro (HTTPS o localhost) y permiso del usuario.
 */

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Tu navegador no soporta la geolocalización."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });
  });
}

interface ReverseGeocode {
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  countryName?: string;
}

/** Traduce coordenadas a "barrio, ciudad, provincia" (los que existan). */
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=es`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("No pudimos resolver tu dirección.");
  const data: ReverseGeocode = await res.json();

  const parts = [
    data.locality,
    data.city,
    data.principalSubdivision,
    data.countryName,
  ].filter((p): p is string => Boolean(p && p.trim()));

  // Deduplicar (a veces locality y city coinciden) preservando el orden.
  const unique = [...new Set(parts)];
  return unique.join(", ");
}

/** Mapea los errores de la Geolocation API a mensajes claros en español. */
function friendlyError(err: unknown): string {
  if (typeof err === "object" && err && "code" in err) {
    const code = (err as GeolocationPositionError).code;
    if (code === 1)
      return "Permiso de ubicación denegado. Habilitá el acceso en el navegador para usar esta opción.";
    if (code === 2)
      return "No pudimos determinar tu ubicación. Probá de nuevo o cargala a mano.";
    if (code === 3)
      return "La ubicación tardó demasiado. Probá de nuevo o cargala a mano.";
  }
  if (err instanceof Error) return err.message;
  return "No pudimos obtener tu ubicación.";
}

/**
 * Detecta la ubicación del dispositivo y devuelve la dirección legible.
 * Lanza un Error con mensaje amigable si algo falla.
 */
export async function detectDeviceLocation(): Promise<string> {
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const address = await reverseGeocode(latitude, longitude);
    if (!address) throw new Error("No encontramos una dirección para tu ubicación.");
    return address;
  } catch (err) {
    throw new Error(friendlyError(err));
  }
}
