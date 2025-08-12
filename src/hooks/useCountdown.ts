import { useNow } from "@/context/NowContext";

export default function useCountdown(targetDate: string) {
  const now = useNow();
  const targetMs = new Date(targetDate).getTime();
  const diff = targetMs - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: diff <= 0 };
}