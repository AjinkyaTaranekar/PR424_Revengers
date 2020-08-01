import RNFetchBlob from 'react-native-fetch-blob'
import axios from 'axios';
let upload = async (data) => {
  const res = await axios.post(`http://localhost:3000/upload`, { data });
  console.log(res);
  alert(res.data);
}

module.exports = upload;
