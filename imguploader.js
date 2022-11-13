document.querySelector('#image').addEventListener('change', event => {
    handleImageUpload(event)
  });

  const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('image', files[0]);
    // formData.append('key', '18d849e40f3ae34587573c4996022988');

    fetch('https://api.imgbb.com/1/upload?key=18d849e40f3ae34587573c4996022988', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'text/plain',
      //   'X-My-Custom-Header': 'value-v',
      //   'Authorization': 'Bearer ' + token,
      // },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data["data"]["display_url"]);
      document.querySelector('#imgurl').value = data["data"]["display_url"];
    })
    .catch(error => {
      console.error(error)
    })
  }