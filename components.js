import pkg from 'adminjs';
const { ComponentLoader } = pkg;

const componentLoader = new ComponentLoader();

const Components = {
  MyInput: componentLoader.add('MyInput', './my-input.jsx'),
  // other custom components
};

export { componentLoader, Components };