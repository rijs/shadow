# Ripple | Shadow DOM
[![Coverage Status](https://coveralls.io/repos/rijs/shadow/badge.svg?branch=master&service=github)](https://coveralls.io/github/rijs/shadow?branch=master)
[![Build Status](https://travis-ci.org/rijs/shadow.svg)](https://travis-ci.org/rijs/shadow)

Adds a Shadow DOM to a Custom Element before rendering

```html
<component-name>
```

For browsers that do not natively support this, it sets the `shadowRoot` and `host` pointers for components that depend on them.