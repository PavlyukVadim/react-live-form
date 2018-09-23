# react-live-form
[![Build Status](https://travis-ci.org/PavlyukVadim/app.github.io.svg?branch=source)](https://travis-ci.org/PavlyukVadim/dynamic-forms) [![Coverage Status](https://coveralls.io/repos/github/PavlyukVadim/dynamic-forms/badge.svg?branch=source)](https://coveralls.io/github/PavlyukVadim/dynamic-forms?branch=source)

`react-live-form` is a library for building a live forms (forms with dynamic fields) based on [React](https://facebook.github.io/react/).

#### [Demo](https://someLink/) | [Source](https://github.com/PavlyukVadim/dynamic-forms)

## Setup

* Install with `npm` or `yarn`:
```sh
npm i react-live-form
# OR
yarn add react-live-form
```

* Use in your project:

```jsx
import React from 'react';
import LiveForm from 'react-live-form';
import formConfig from './formConfig';

const MyComponent = () =>
  <LiveForm formConfig={formConfig} />;
```

## Tips

* Use [demo pages](https://someLink/) to find all available components with examples.

## License
This project is offered under [MIT License](https://github.com/PavlyukVadim/dynamic-forms/blob/master/LICENSE).
