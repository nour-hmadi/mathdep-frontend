import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./MathText.css";

// Shows text with math written in LaTeX: $x^2$ inside a sentence, $$\sum_{i=1}^{n} i$$ on its own line.
// Plain text stays plain text (React escapes it); only the math goes through KaTeX, which never runs code.
const MATH = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;

function MathText({ text = "", className }) {
  const parts = [];
  let last = 0;
  text.replace(MATH, (match, block, inline, index) => {
    if (index > last) parts.push(text.slice(last, index));
    const html = katex.renderToString(block ?? inline, { displayMode: Boolean(block), throwOnError: false });
    parts.push(<span key={index} className={block ? "math-block" : undefined} dangerouslySetInnerHTML={{ __html: html }} />);
    last = index + match.length;
    return match;
  });
  if (last < text.length) parts.push(text.slice(last));
  return <span className={className} style={{ whiteSpace: "pre-wrap" }}>{parts}</span>;
}

export default MathText;
