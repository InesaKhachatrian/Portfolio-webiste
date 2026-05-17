export default function KnightTrace() {
  const cells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      cells.push(
        <span
          key={`${r}-${c}`}
          className="cell"
          style={{ left: c * 14 + 'px', top: r * 14 + 'px' }}
        />
      );
    }
  }

  return (
    <div className="knight-trace" aria-hidden="true">
      <div className="board">
        {cells}
        <span className="pulse" />
      </div>
      <span>Thinking · several moves ahead</span>
    </div>
  );
}
