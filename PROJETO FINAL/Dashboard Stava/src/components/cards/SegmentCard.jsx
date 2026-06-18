function SegmentCard({ label, value }) {
  return (
    <div>
      <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">
        {label}
      </span>
      <span className="text-sm font-black text-white italic">
        {value ?? "--"}
      </span>
    </div>
  );
}

export default SegmentCard;
