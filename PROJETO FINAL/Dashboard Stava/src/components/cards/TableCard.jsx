function TableCard({ sections, columns }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      {/* Cabeçalho */}
      <div className="grid grid-cols-3 border-b border-white/10">
        <div className="p-4" />
        {columns.map((col, index) => (
          <div
            key={index}
            className="p-4 border-l border-white/10 flex items-center justify-center gap-2"
          >
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              {col}
            </span>
          </div>
        ))}
      </div>

      {/* Secções */}
      {sections.map((section, sIndex) => (
        <div key={sIndex}>
          {/* Título da secção */}
          <div className="px-4 py-2 bg-white/2 border-b border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {section.title}
            </p>
          </div>

          {/* Linhas */}
          {section.rows.map((row, rIndex) => (
            <div
              key={rIndex}
              className="grid grid-cols-3 border-b border-white/5 hover:bg-white/2 transition-colors last:border-0"
            >
              <div className="p-4 pl-8 flex items-center">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  {row.label}
                </span>
              </div>
              {row.values.map((val, vIndex) => (
                <div
                  key={vIndex}
                  className="p-4 border-l border-white/5 flex items-center justify-center"
                >
                  <span className="text-sm">{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableCard;
