const ContentWrapper = ({ children }) => {
  return (
    <div className="lg:ml-[380px] my-6 flex justify-center">
      <div className="px-6 max-w-7xl w-full">{children}</div>
    </div>
  );
};

export { ContentWrapper };
