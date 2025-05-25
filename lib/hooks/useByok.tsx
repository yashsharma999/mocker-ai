'use client';

import { useEffect, useState } from 'react';
import { BYOK_API_KEY } from '../constants';

export default function useByok() {
  const [byokKey, setByokKey] = useState('');
  const [byokUserId, setByokUserId] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage safely in useEffect
    if (window.localStorage) {
      setByokKey(localStorage?.getItem(BYOK_API_KEY) || '');
      setByokUserId(localStorage.getItem('byok_cus_id'));
    }
  }, []);

  return { byokKey, byokUserId };
}
