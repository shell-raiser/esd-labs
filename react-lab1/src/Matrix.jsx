// Section 06 — the grid: a Matrix made of Cells.
//
// Props:  matrix        an array of rows, each an array of numbers (any size — don't assume 3)
//         onIncrement   a function: onIncrement(row, col)   (you need it in section 08)
//         max           the biggest number in the matrix (for stretch: highlight)
//
// Render:
//   <table className="matrix">
//     <tbody>
//       one <tr> per row
//         one <td> per value, with a <Cell> inside it
//
// Lists need a key on the element you return from map — section 06 says which.
// Section 08: each Cell's onClick calls onIncrement with THAT cell's row and column.
// Section 12 (stretch): each Cell gets isMax={max > 0 && value === max}
import Cell from "./Cell.jsx";

export default function Matrix({ matrix, onIncrement, max }) {
  // If max not provided (e.g., in tests), compute from matrix
  const effectiveMax = max ?? Math.max(0, ...matrix.flat());

  return (
    <table className="matrix">
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => (
              <td key={colIndex}>
                <Cell
                  row={rowIndex}
                  col={colIndex}
                  value={value}
                  onClick={() => onIncrement(rowIndex, colIndex)}
                  isMax={effectiveMax > 0 && value === effectiveMax}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
