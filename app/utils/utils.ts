export async function fetchWithRetry(
  url: Promise<Response>,
  setError?: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  retries = 2,
  delay = 1000,
) {
  try {
    if (setIsLoading) setIsLoading(true);
    const response = await url;
    if (!response.ok) {
      // Retry on server errors
      if (retries === 0 && setError) setError(`Server error: ${response.status}`);
      throw new Error(`Server error: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      if (setIsLoading) setIsLoading(true);
      console.warn(`Retrying fetch for ${url}. Attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (setError) setError('');
      return fetchWithRetry(url, setError, setIsLoading, retries - 1, delay * 2); // Exponential backoff
    }
    throw error; // No more retries, re-throw the error
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
}
