const Loader = () => {
  return (
    <div className="relative w-12 h-12 inline-block animate-spin rounded-full bg-[conic-gradient(from_0deg,rgba(255,61,0,0.2)_33%,#ff3d00_100%)]">
      <div
        className="absolute left-1/2 top-1/2 w-11 h-11 rounded-full 
          -translate-x-1/2 -translate-y-1/2 bg-[#263238]"
      ></div>
    </div>
  );
};

export default Loader;
