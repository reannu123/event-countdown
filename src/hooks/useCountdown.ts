import { useNow } from '@/context/NowContext';
import { computeParts } from '@/lib/time';

export default function useCountdown(targetDate: string) {
  const now = useNow();
  return computeParts(new Date(targetDate).getTime(), now);
}
