import { useState } from "react";

type LinkProps = {
    href: string;
    text: string;
}

export const Link = ({href, text}: LinkProps) => {
  return (
    <a
      className="hover:text-[var(--accent)] transition-colors group flex flex-row"
      href={href} target="_blank" rel="noreferrer"
    >
        <span className="group-hover:text-[var(--accent)] transition-colors text-transparent">[ </span>{text} <span className="group-hover:text-[var(--accent)] transition-colors text-transparent"> ]</span>
    </a>
  )
}