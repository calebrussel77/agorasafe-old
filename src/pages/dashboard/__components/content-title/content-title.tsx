const ContentTitle = ({ children, description = null }) => {
  return (
    <div className="pb-3 border-b">
      <h1 className="font-semibold text-secondary-500 text-3xl border-gray-300">
        {children}
      </h1>
      {description && (
        <p className="mt-1.5 text-gray-500 max-w-2xl xl:max-w-4xl w-full">
          {description}
        </p>
      )}
    </div>
  );
};

export { ContentTitle };
