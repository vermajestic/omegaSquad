export function formatCoordinate(value: number, type: 'lat' | 'lng'): string {
  const direction = type === 'lat' ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
  return `${Math.abs(value).toFixed(4)}° ${direction}`;
}

export function formatCoordinates(lat: number, lng: number): string {
  return `${formatCoordinate(lat, 'lat')}, ${formatCoordinate(lng, 'lng')}`;
}

export function formatArea(km2: number = 0): string {
  if (km2 >= 1000000) return `${(km2 / 1000000).toFixed(2)}M km²`;
  if (km2 >= 1000) return `${(km2 / 1000).toFixed(1)}K km²`;
  return `${km2.toFixed(1)} km²`;
}

export function formatConfidence(value?: number): string {
  if (value === undefined || value === null) return 'N/A';
  return `${value.toFixed(1)}%`;
}

export function formatDistance(km?: number): string {
  if (km === undefined || km === null) return 'N/A';
  return `${km.toFixed(1)} km`;
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} UTC`;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    new: 'text-cyan-400',
    under_investigation: 'text-amber-400',
    vessel_identified: 'text-blue-400',
    resolved: 'text-emerald-400',
    false_positive: 'text-slate-400',
    high: 'text-red-400',
    medium: 'text-amber-400',
    low: 'text-emerald-400',
    review: 'text-amber-400',
  };
  return map[status] || 'text-slate-400';
}

export function getStatusBgColor(status: string): string {
  const map: Record<string, string> = {
    new: 'bg-cyan-500/10 text-cyan-400',
    under_investigation: 'bg-amber-500/10 text-amber-400',
    vessel_identified: 'bg-blue-500/10 text-blue-400',
    resolved: 'bg-emerald-500/10 text-emerald-400',
    false_positive: 'bg-slate-500/10 text-slate-400',
    high: 'bg-red-500/10 text-red-400',
    medium: 'bg-amber-500/10 text-amber-400',
    low: 'bg-emerald-500/10 text-emerald-400',
    review: 'bg-amber-500/10 text-amber-400',
  };
  return map[status] || 'bg-slate-500/10 text-slate-400';
}

export function formatStatusLabel(status: string): string {
  return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
