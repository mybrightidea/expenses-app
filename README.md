# Example React/Redux App

## Overview

A simple app to maintain (CRUD) a list of expenses and sort, filter and totalise them.

The app uses **React** to build screen components and **Redux** to maintain global state. UI events dispatch actions to asynchronously maintain data in Firebase database and on success dispatch client-side actions to maintain application state. Uses react **client side routing** to create a **single page app**.

App also uses `moment.js` to manipulate dates and the AirBnB `react-dates` library to handle date UI.

Users are authorised users using **Google Authentication** (Note NO user info is stored, it is simply a mechanism to generate a unique ID to segregate users' info). Higher order components are used to implement authorised/non-authorised app routing.

From the dashboard, users can add, sort, filter and edit a list of expenses.

Application is tested using **enzyme** and **jest** test plans. Test Driven Development approach where **Jest** is used to systematically test _redux actions_, _redux reducers_ and _selectors_.

React **Enzyme** renderer is used to render and match snapshots and to
mock out third party libraries.

Component events and user interaction are simulated using **Enzyme** and Jest _spy functions_ are used to test that event triggered functions are called correctly.

![Login image](https://github.com/mybrightidea/expenses-app/blob/master/login.png "Image of login")

![Dashboard image](https://github.com/mybrightidea/expenses-app/blob/master/dashboard.png "Image of dashboard")

**Build**

The project is built using ES6 with some as-yet not-fully-adopted features - the js code is transpiled with **Babel** into ES5 using **env** and **react** _presets_ and **transform-class-properties** (Property initializer syntax used to create bound functions which are bound to the class instance, not put on the prototype) and **transform-object-rest-spread** (to transform rest properties for object destructuring assignment and spread properties for object literals) plugins.

Webpack is used to bundle all components (js and sass) into a single client-side script to render the app

:+1::tada::clown_face:
