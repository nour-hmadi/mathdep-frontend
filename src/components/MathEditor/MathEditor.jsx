import React, { useRef } from "react";
import MathText from "../MathText/MathText";
import "./MathEditor.css";

// A text box for posts and replies, with buttons that insert LaTeX and a live preview.
// Clicking a button outside math adds the $…$ around it; inside $…$ it adds the command alone,
// so students learn the LaTeX as they go. Pasted symbols like Σ, φ or √ work too.
const SYMBOLS = [
  ["x²", "^{2}"], ["xₙ", "_{n}"], ["a/b", "\\frac{a}{b}"], ["√", "\\sqrt{x}"], ["ⁿ√", "\\sqrt[n]{x}"],
  ["Σ", "\\sum_{i=1}^{n}"], ["∫", "\\int_{a}^{b}"], ["lim", "\\lim_{x \\to 0}"], ["∞", "\\infty"],
  ["α", "\\alpha"], ["β", "\\beta"], ["θ", "\\theta"], ["π", "\\pi"], ["φ", "\\varphi"], ["τ", "\\tau"],
  ["∠", "\\angle"], ["≤", "\\le"], ["≥", "\\ge"], ["≠", "\\neq"], ["∈", "\\in"], ["→", "\\to"],
];

// True when the cursor is inside $…$ (an odd number of $ before it)
const insideMath = (text) => ((text.match(/\$/g) || []).length % 2 === 1);

function MathEditor({ value, onChange, rows = 5, placeholder, label }) {
  const box = useRef(null);

  const insert = (latex) => {
    const element = box.current;
    const start = element.selectionStart;
    const end = element.selectionEnd;
    const piece = insideMath(value.slice(0, start)) ? latex : `$${latex}$`;
    onChange(value.slice(0, start) + piece + value.slice(end));
    requestAnimationFrame(() => {
      element.focus();
      const cursor = start + piece.length - (piece.startsWith("$") ? 1 : 0);
      element.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <div className="math-editor">
      <div className="math-editor__toolbar" role="toolbar" aria-label="Math symbols">
        {SYMBOLS.map(([shown, latex]) => (
          <button key={latex} type="button" title={latex} onClick={() => insert(latex)}>{shown}</button>
        ))}
      </div>
      <textarea ref={box} rows={rows} value={value} placeholder={placeholder} aria-label={label} required
                onChange={(event) => onChange(event.target.value)} />
      <p className="math-editor__tip">Write math between $ signs, for example $x^2 + y^2 = r^2$.</p>
      {value.includes("$") && (
        <div className="math-editor__preview" aria-label="Preview">
          <span className="math-editor__preview-label">Preview</span>
          <MathText text={value} />
        </div>
      )}
    </div>
  );
}

export default MathEditor;
