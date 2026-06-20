import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { decodeEvent } from '@/lib/share';
import { themeById } from '@/lib/themes';
import { computeParts, formatTarget, humanize } from '@/lib/time';
import { useNow } from '@/context/NowContext';
import BigCountdown from '@/components/BigCountdown';
import { Check, Link2, Timer } from 'lucide-react';

const Shared = () => {
  const { code = '' } = useParams();
  const now = useNow();
  const [copied, setCopied] = useState(false);
  const data = decodeEvent(code);

  if (!data) {
    return (
      <div className="tw:flex tw:min-h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:bg-gray-950 tw:px-4 tw:text-center tw:text-white">
        <div className="tw:text-3xl">⌛</div>
        <h1 className="tw:text-xl tw:font-semibold">This countdown link looks broken</h1>
        <p className="tw:text-white/60">The link may be incomplete or mistyped.</p>
        <Link to="/" className="tw:rounded-lg tw:bg-white/10 tw:px-4 tw:py-2 tw:hover:bg-white/20">
          Create your own →
        </Link>
      </div>
    );
  }

  const theme = themeById(data.theme);
  const parts = computeParts(new Date(data.targetISO).getTime(), now);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      window.prompt('Copy this link:', window.location.href);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:p-4" style={{ background: theme.gradient }}>
      <div className="tw:w-full tw:max-w-2xl tw:text-center" style={{ color: theme.text }}>
        <h1 className="tw:text-3xl tw:font-bold tw:sm:text-5xl">{data.title}</h1>
        {data.note && <p className="tw:mt-2 tw:text-base tw:opacity-75">{data.note}</p>}

        <div className="tw:my-10">
          <BigCountdown parts={parts} theme={theme} size="lg" />
        </div>

        <p className="tw:text-sm tw:opacity-75">
          {formatTarget(data.targetISO)} · {humanize(parts)}
        </p>

        <div className="tw:mt-8 tw:flex tw:items-center tw:justify-center tw:gap-3">
          <button
            onClick={copy}
            className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:bg-black/25 tw:px-4 tw:py-2 tw:text-sm tw:transition tw:hover:bg-black/35"
            style={{ color: theme.text }}
          >
            {copied ? <Check size={16} /> : <Link2 size={16} />}
            {copied ? 'Link copied' : 'Copy link'}
          </button>
          <Link
            to="/"
            className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:bg-black/25 tw:px-4 tw:py-2 tw:text-sm tw:transition tw:hover:bg-black/35"
            style={{ color: theme.text }}
          >
            <Timer size={16} /> Make your own
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shared;
