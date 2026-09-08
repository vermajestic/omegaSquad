import { useAppContext } from '@/contexts/AppContext';

export function useDemo() {
  const { isDemoMode, toggleDemoMode } = useAppContext();
  return { isDemoMode, toggleDemoMode };
}
