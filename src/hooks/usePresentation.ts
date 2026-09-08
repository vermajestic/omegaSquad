import { useAppContext } from '@/contexts/AppContext';

export function usePresentation() {
  const { isPresentationMode, togglePresentationMode } = useAppContext();
  return { isPresentationMode, togglePresentationMode };
}
