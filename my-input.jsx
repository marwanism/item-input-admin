import React from 'react';
// just some regular React component
const MyInputComponent = () => <div className="form-group__FormGroup-sc-dpyqjh-0 frCjYo">
<label htmlFor="image" required className="label__Label-sc-o90s7d-0 jtfEBv adminjs_Label">Image</label>
<input id="image" name="image" type="file" required className="input__Input-sc-y0u0lk-0 cKQyjl adminjs_Input" />
<script src="imguploader.js"></script>
<div className="text__Text-sc-wqowgj-0 form-message__FormMessage-sc-ns8om8-0 fPFvgK jNCBSG adminjs_Text" />
</div>;
// const MyInputComponent = React.createElement('div', {
//     children: React.createElement('div', {className: "blue" }),
//     className: "form-group__FormGroup-sc-dpyqjh-0 frCjYo",
//   });

//   render: function() {
//     return (

//       <div className="form-group__FormGroup-sc-dpyqjh-0 frCjYo">
//         <label htmlFor="image" required className="label__Label-sc-o90s7d-0 jtfEBv adminjs_Label">Image</label>
//         <input id="image" name="image" required className="input__Input-sc-y0u0lk-0 cKQyjl adminjs_Input" defaultValue={12} />
//         <div className="text__Text-sc-wqowgj-0 form-message__FormMessage-sc-ns8om8-0 fPFvgK jNCBSG adminjs_Text" />
//       </div>
//     );
//   }
//});
export default MyInputComponent;