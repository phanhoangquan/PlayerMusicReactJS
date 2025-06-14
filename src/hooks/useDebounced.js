import { useEffect, useState } from 'react';

function useDebounced(value, delay) {
   const [debouncedValue, setDeboundcedValue] = useState(value);
   useEffect(() => {
      const handler = setTimeout(() => {
         setDeboundcedValue(value);
      }, [delay]);
      return () => clearTimeout(handler);
   }, [value]);

   return debouncedValue;
}

export default useDebounced;
