const TableHeader = () => {
  return (
    <div className="grid grid-cols-3 rounded-sm  items-start dark:bg-black sm:grid-cols-4 border-y-2">
      <div className="p-2.5 xl:p-5 border-x">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Full Name</h5>
      </div>
      <div className="p-2.5 text-start xl:p-5 border-r">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
      </div>
      <div className="p-2.5 text-start xl:p-5 border-r">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Phone</h5>
      </div>
      <div className="hidden p-2.5 text-start sm:block xl:p-5 border-r">
        <h5 className="text-sm font-medium uppercase xsm:text-base ">Message</h5>
      </div>
    </div>
  );
};

export default TableHeader;
