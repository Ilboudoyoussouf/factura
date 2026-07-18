import { useEffect, useState } from 'react';

type PersistCapableStore = {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (listener: () => void) => () => void;
  };
};

export function useStoreHydration(store: PersistCapableStore): boolean {
  const [hydrated, setHydrated] = useState(store.persist.hasHydrated());

  useEffect(() => {
    if (store.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return store.persist.onFinishHydration(() => setHydrated(true));
  }, [store]);

  return hydrated;
}
