const createFormData = (file, body) => {
    const data = new FormData();
  
    data.append("file", {
      name: file.fileName,
      type: file.type,
      uri:
        Platform.OS === "android" ? file.uri : file.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };


  export default  createFormData;