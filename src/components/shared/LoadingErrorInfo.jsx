export const LoadingErrorInfo = ({ isLoading, error }) => {
  return (
    <>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>{error.message}</p>}
    </>
  );
};
