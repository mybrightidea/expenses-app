# Example React/Redux App

## Technical overview

**Build**

The project is built using ES6 with some as-yet not-fully-adopted features - the js code is transpiled with **Babel** into ES5 using **env** and **react** _presets_ and **transform-class-properties** (Property initializer syntax used to create bound functions which are bound to the class instance, not put on the prototype) and **transform-object-rest-spread** (to transform rest properties for object destructuring assignment and spread properties for object literals) plugins.

Webpack is used to bundle all components (js and sass) into a single client-side script to render the app

---

**Client Architecure**

Architecure is **React** using **High Order Components** to integrate into **Redux store**
Uses react **client side routing** to create a **single page app**

App also uses `moment.js` to manipulate dates and the AirBnB `react-dates` library to handle date UI

Google authentication implemented to control user based security/access

**DB Architecture and Strategy**

**Testing**
Application is tested using **enzyme** and **jest** test plans. Test Driven Development approach where **Jest** is used to systematically test _redux actions_, _redux reducers_ and _selectors_.

React **Enzyme** renderer is used to render and match snapshots and to
mock out third party libraries.

Component events and user interaction are simulated using **Enzyme** and Jest _spy functions_ are used to test that event triggered functions are called correctly

:+1::tada::clown_face:
