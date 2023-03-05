const FormCardContainer = ({ children, footer }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">{children}</div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">{footer}</div>
    </div>
  );
};

export { FormCardContainer };
