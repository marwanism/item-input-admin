import React from 'react';

const handleImageUpload = event => {
    console.log("SAM3AK");
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
      document.getElementById('image').value = data["data"]["display_url"];
      document.getElementById('imgdisplay').src = data["data"]["display_url"];
    })
    .catch(error => {
      console.error(error)
    })
  };
// just some regular React component
const MyInputComponent = () => <div className="form-group__FormGroup-sc-dpyqjh-0 frCjYo">
<label htmlFor="imageup" required className="label__Label-sc-o90s7d-0 jtfEBv adminjs_Label">Image</label>
<input id="imageup" name="imageup" type="file" required className="input__Input-sc-y0u0lk-0 cKQyjl adminjs_Input" onChange={handleImageUpload} />
<input type="text" name="image" style={{display: 'none'}} id="imgurl" required />
<img id="imgdisplay" />
<div className="text__Text-sc-wqowgj-0 form-message__FormMessage-sc-ns8om8-0 fPFvgK jNCBSG adminjs_Text" />
</div>;

// const MyInputComponent = React.createElement('div', {
//     children: React.createElement('div', {className: "blue" }),
//     className: "form-group__FormGroup-sc-dpyqjh-0 frCjYo",
//   });

//   render: function() {
//     return (
// <script src="imguploader.js"></script>

//       <div className="form-group__FormGroup-sc-dpyqjh-0 frCjYo">
//         <label htmlFor="image" required className="label__Label-sc-o90s7d-0 jtfEBv adminjs_Label">Image</label>
//         <input id="image" name="image" required className="input__Input-sc-y0u0lk-0 cKQyjl adminjs_Input" defaultValue={12} />
//         <div className="text__Text-sc-wqowgj-0 form-message__FormMessage-sc-ns8om8-0 fPFvgK jNCBSG adminjs_Text" />
//       </div>
//     );
//   }
//});
export default MyInputComponent;