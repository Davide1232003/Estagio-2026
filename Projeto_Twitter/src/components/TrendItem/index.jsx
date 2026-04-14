function TrendItem({ category, name, tweetCount }) {
  return (
    <div className="py-3 hover: bg-gray-800 transition duration-200">
      <p className="text-gray-500 text--sm">{category}</p>
      <p className="font-bold hover:underline cursor-pointer">{name}</p>
      {tweetCount && <p className="text-gray-500 text-sm">{tweetCount}</p>}
    </div>
  );
}

export default TrendItem;
