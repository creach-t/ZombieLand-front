import pageNotFoundImg from '../../assets/img/desktop/404page 1.webp';

function NotFoundPage() {
  return (
    <div className="my-36 flex items-center justify-center">
      <img
        src={pageNotFoundImg}
        alt="page 404 not found"
        className="w-full h-full max-w-5xl"
      />
    </div>
  );
}

export default NotFoundPage;
