/**
 * Ensures only one cinematic product video plays at a time.
 */
type Listener = () => void;

let activeId: string | null = null;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribePlayback(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function claimPlayback(id: string) {
  if (activeId === id) return;
  activeId = id;
  emit();
}

export function releasePlayback(id: string) {
  if (activeId !== id) return;
  activeId = null;
  emit();
}

export function getActivePlaybackId() {
  return activeId;
}
