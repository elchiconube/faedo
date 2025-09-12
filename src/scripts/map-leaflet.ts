import L from 'leaflet';
// Aseguramos iconos (Vite resolverá las URLs correctas)
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function initMap(el: HTMLElement) {
  if ((el as any)._leaflet_inited) return;
  const lat = parseFloat(el.dataset.lat || '0');
  const lng = parseFloat(el.dataset.lng || '0');
  const zoom = parseInt(el.dataset.zoom || '14');

  const map = L.map(el, { scrollWheelZoom: true }).setView([lat, lng], zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
  L.marker([lat, lng]).addTo(map);

  (el as any)._leaflet_inited = true;
}

function observe(el: HTMLElement) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        initMap(el);
        io.disconnect();
        break;
      }
    }
  });
  io.observe(el);
}

function initAll() {
  const maps = document.querySelectorAll<HTMLElement>('[data-leaflet-map="1"]');
  maps.forEach((el) => observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

export {};

