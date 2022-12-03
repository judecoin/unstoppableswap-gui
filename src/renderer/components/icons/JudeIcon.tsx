import { SvgIcon } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import React from 'react';

export default function JudeIcon(props: SvgIconProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 256"
      >
        <path
          d="M127.998 0C57.318 0 0 57.317 0 127.999c0 14.127 2.29 27.716 6.518 40.43H44.8V60.733l83.2 83.2l83.198-83.2v107.695h38.282c4.231-12.714 6.521-26.303 6.521-40.43C256 57.314 198.681 0 127.998 0"
          fill="currentColor"
        />
        <path
          d="M108.867 163.062l-36.31-36.311v67.765H18.623c22.47 36.863 63.051 61.48 109.373 61.48s86.907-24.617 109.374-61.48h-53.933V126.75l-36.31 36.31l-19.13 19.129l-19.128-19.128h-.002z"
          fill="#4C4C4C"
        />
      </svg>
    </SvgIcon>
  );
}
