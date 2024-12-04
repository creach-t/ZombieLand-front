/* eslint-disable react/react-in-jsx-scope */
let pageNotFoundImg: string | undefined;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  pageNotFoundImg = require('../../../public/img/desktop/404page 1.webp');
}

function NotFoundPage() {
  return (
    <div className="mt-36 flex flex-col items-center justify-between">
      {pageNotFoundImg && (
        <img
          src={pageNotFoundImg}
          alt="page 404 not found"
          className="w-[400px]"
        />
      )}
    </div>
  );
}

export default NotFoundPage;
