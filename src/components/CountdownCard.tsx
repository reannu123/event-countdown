import React, { useState } from 'react';
import type { EventItem } from '@/types/event';
import useCountdown from '@/hooks/useCountdown';
import { themeById } from '@/lib/themes';
import { formatTarget, humanize } from '@/lib/time';
import { shareUrl } from '@/lib/share';
import BigCountdown from './BigCountdown';
import { Pencil, Share2, Trash2, Check } from 'lucide-react';

type Props = {
  item: EventItem;
  onDelete?: (id: string) => void;
  onEdit?: (item: EventItem) => void;
};

export const CountdownCard: React.FC<Props> = ({ item, onDelete, onEdit }) => {
  const parts = useCountdown(item.targetISO);
  const theme = themeById(item.theme);
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = shareUrl(item, window.location.origin);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard may be blocked (e.g. insecure context) — fall back to a prompt.
      window.prompt('Copy this share link:', url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="tw:relative tw:overflow-hidden tw:rounded-2xl tw:p-5 tw:shadow-xl tw:ring-1 tw:ring-white/10 tw:transition-transform tw:hover:-translate-y-0.5"
      style={{ background: theme.gradient }}
    >
      <div className="tw:flex tw:items-start tw:justify-between tw:gap-2">
        <div style={{ color: theme.text }}>
          <h3 className="tw:text-lg tw:font-semibold tw:leading-tight">{item.title}</h3>
          {item.note && <p className="tw:mt-0.5 tw:text-sm tw:opacity-70">{item.note}</p>}
        </div>
        <div className="tw:flex tw:gap-1">
          <IconButton title={copied ? 'Copied!' : 'Copy share link'} onClick={onShare} text={theme.text}>
            {copied ? <Check size={16} /> : <Share2 size={16} />}
          </IconButton>
          {onEdit && (
            <IconButton title="Edit" onClick={() => onEdit(item)} text={theme.text}>
              <Pencil size={16} />
            </IconButton>
          )}
          {onDelete && (
            <IconButton title="Delete" onClick={() => onDelete(item.id)} text={theme.text}>
              <Trash2 size={16} />
            </IconButton>
          )}
        </div>
      </div>

      <div className="tw:my-4">
        <BigCountdown parts={parts} theme={theme} size="sm" />
      </div>

      <div className="tw:flex tw:items-center tw:justify-between tw:text-xs" style={{ color: theme.text, opacity: 0.75 }}>
        <span>{formatTarget(item.targetISO)}</span>
        <span>{humanize(parts)}</span>
      </div>
    </div>
  );
};

const IconButton: React.FC<{
  title: string;
  onClick: () => void;
  text: string;
  children: React.ReactNode;
}> = ({ title, onClick, text, children }) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    onClick={onClick}
    className="tw:cursor-pointer tw:rounded-md tw:p-1.5 tw:transition-colors tw:hover:bg-white/15"
    style={{ color: text }}
  >
    {children}
  </button>
);
