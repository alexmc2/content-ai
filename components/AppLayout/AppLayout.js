export const AppLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-black overflow-hidden">
        <div>
          <div>logo</div>
          <div>cta button</div>
          <div>tokens</div>
        </div>
        <div>
          <div> list of posts</div>
          <div>user information</div>
        </div>
      </div>
      <div className="bg-yellow-500">{children}</div>
    </div>
  );
};
