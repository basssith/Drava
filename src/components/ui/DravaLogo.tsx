interface DravaLogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function DravaLogo({
  className = '',
  showText = true,
  textColor = '#F5F5F2',
  size = 'md',
}: DravaLogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-base tracking-[0.04em]',
    md: 'text-xl tracking-[0.04em]',
    lg: 'text-3xl tracking-[0.04em]',
    xl: 'text-6xl tracking-[0.04em]',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Exact geometric SVG mark matching the brand identity */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0`}
      >
        {/* Top-left small green square */}
        <rect x="5" y="10" width="26" height="26" rx="3" fill="#92ff5f" />
        
        {/* Top-right small green square */}
        <rect x="42" y="10" width="26" height="26" rx="3" fill="#92ff5f" />
        
        {/* Bottom curved dynamic hook shape */}
        <path
          d="M31 38H5C5 72 26 90 68 90V64C45 64 31 52 31 38Z"
          fill="#92ff5f"
        />
        {/* Secondary subtle inner accent */}
        <rect x="68" y="64" width="26" height="26" rx="3" fill="#92ff5f" />
      </svg>

      {/* Brand Name Typography in exact lowercase 'drava' style */}
      {showText && (
        <span
          className={`font-semibold lowercase select-none ${textSizes[size]}`}
          style={{
            color: textColor,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
            letterSpacing: '-0.02em',
          }}
        >
          drava
        </span>
      )}
    </div>
  );
}

