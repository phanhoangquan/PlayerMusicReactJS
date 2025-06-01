export const SearchIcon = ({ className, width = '2.3rem', height = '2.3rem' }) => {
   return (
      <svg
         style={{ marginTop: '3px', marginRight: '2px' }}
         className={className}
         width={width}
         height={height}
         fill="currentColor"
         viewBox="0 0 48 48"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.83 7.5a14.34 14.34 0 1 1 0 28.68 14.34 14.34 0 0 1 0-28.68Zm0-4a18.33 18.33 0 1 0 11.48 32.64l8.9 8.9a1 1 0 0 0 1.42 0l1.4-1.41a1 1 0 0 0 0-1.42l-8.89-8.9A18.34 18.34 0 0 0 21.83 3.5Z"
         ></path>
      </svg>
   );
};
export const HomeIcon = ({ className, width = '2.3rem', height = '2.3rem' }) => {
   return (
      <svg
         className={className}
         width={width}
         height={height}
         fill="currentColor"
         data-encore-id="icon"
         role="img"
         aria-hidden="true"
         viewBox="0 0 24 24"
      >
         <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
      </svg>
   );
};
