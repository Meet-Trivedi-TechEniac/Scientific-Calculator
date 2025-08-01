function wrapLastExprWith(fnName) {
  const expr = display.textContent;

  // Case 1: Ends with ')'
  if (expr.endsWith(')')) {
    let balance = 0;
    let openIndex = -1;

    for (let i = expr.length - 1; i >= 0; i--) {
      if (expr[i] === ')') balance++;
      else if (expr[i] === '(') balance--;

      if (balance === 0) {
        openIndex = i;
        break;
      }
    }

    if (openIndex !== -1) {
      const inside = expr.slice(openIndex); // "(3+1)"
      const newExpr = expr.slice(0, openIndex) + `Math.${fnName}${inside}`;
      display.textContent = newExpr;
      return;
    }
  }

  // Case 2: Last number
  const match = expr.match(/(\d*\.?\d+)(?!.*\d)/);
  if (match) {
    const start = match.index;
    const number = match[0];
    const newExpr = expr.slice(0, start) + `Math.${fnName}(${number})`;
    display.textContent = newExpr;
  }
}
