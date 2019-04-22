/*
 * Homework #10: Destructuring
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Alejandro Mohamad
 */

/*
 * Q: What is the differences between destructuring an object and destructuring an array?
 * When would each be appropriate to use?
 * 
 * A: The differences are that you can destructure values from an object using braces {}
 * to define the new variables that stand for the object which is being destructed and
 * destructing an array uses brackets [] to tell that an array is being destructed.
 * 
 * Also for destructing an object you have to use the property names as the new variables
 * names, but we can also use another names for the new variables, if we don't want to
 * use the same names as the object property.
 * 
 * Another difference is that when destructuring an object, we don't have to keep the
 * order of the properties when destructuring, only the name of the property. But when
 * we do the same with an array, there we have to maintain the order of it.
 * 
 * I believe that the context is important to choose what is more appropriate to use.
 * In my opinion is best to use object destructuring, because we can take the desired
 * property, without knowing its position. If we have to destructure an array, we have
 * to know the position beforehand, and it's not that practical to use.
 */

// Object destructuring example

const webTech = {
  content: 'HTML',
  styles: 'CSS',
  interaction: 'JavaScript'
};

const {content, styles, interaction} = webTech;
console.log(content, styles, interaction);

const {content: html, styles: css, interaction: js} = webTech;
console.log(html, css, js);

const {interaction: selectedProperty} = webTech;
console.log(selectedProperty);

// Array destructuring example

const brandNames = ['Apple', 'Google', 'Samsung', 'Huawei'];

const [brand1, brand2, brand3, brand4] = brandNames;
console.log(brand1, brand2, brand3, brand4);

const [, brand, ,] = brandNames;
console.log(brand);
