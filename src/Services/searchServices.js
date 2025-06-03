import * as httpRequests from '~/utils/httpRequest';

const searchServices = async (keyword, numberResult) => {
   const response = await httpRequests.get('songs.json');
   const result = response.filter((res) => {
      return res.title.toLowerCase().includes(keyword.toLowerCase());
   });
   //Sửa mảng để chỉ lấy đúng numberResult phần tử
   result.splice(numberResult);
   return result;
};

export default searchServices;
