<h1 align="center">edge-scroller</h1>

<h4 align="center">⬇️ Automatic scrolling by the pointer for the edge of element. ⬆️</h4>

```ts
import { EdgeScroller } from "edge-scroller";

const boxElement = window.document.getElementById("box");
const edgeScroller = new EdgeScroller(boxElement, { offset: 80, scrollSpeedCoefficient: 0.8 });
edgeScroller.enable();
```

<div align="center">
<a href="https://www.npmjs.com/package/edge-scroller"><img src="https://img.shields.io/npm/v/edge-scroller.svg" alt="npm"></a>
<a href="https://circleci.com/gh/jagaapple/edge-scroller"><img src="https://img.shields.io/circleci/project/github/jagaapple/edge-scroller/master.svg" alt="CircleCI"></a>
<!-- <a href="https://codecov.io/gh/jagaapple/edge-scroller"><img src="https://img.shields.io/codecov/c/github/jagaapple/edge-scroller.svg"></a> -->
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/jagaapple/edge-scroller.svg" alt="license"></a>
<a href="https://twitter.com/jagaapple_tech"><img src="https://img.shields.io/badge/contact-%40jagaapple_tech-blue.svg" alt="@jagaapple_tech"></a>
</div>

## Table of Contents

<!-- TOC depthFrom:2 -->

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setup](#setup)
- [API](#api)
  - [`EdgeScroller.constructor`](#edgescrollerconstructor)
  - [`EdgeScroller.prototype.enable`](#edgescrollerprototypeenable)
  - [`EdgeScroller.prototype.disable`](#edgescrollerprototypedisable)
- [Contributing to edge-scroller](#contributing-to-edge-scroller)
- [License](#license)

<!-- /TOC -->


## Features
| FEATURES                  | WHAT YOU CAN DO                           |
|---------------------------|-------------------------------------------|
| 🖱️ **Available anywhere** | You can use while drag and drop or others |
| 💎 **No Dependencies**    | All you need is adding this package       |
| 🎩 **Type Safe**          | You can use with TypeScript               |


## Quick Start
### Requirements
- npm or Yarn
- Node.js 10.0.0 or higher

### Installation
```bash
$ npm install edge-scroller
```

If you are using Yarn, use the following command.

```bash
$ yarn add edge-scroller
```

### Setup
Firstly import `EdgeScroller` class from this package and give a scrollable element which has `overflow: scroll;` style such as
to a constructor. Then you can switch to enable and disable via `enable()` or `disable()` methods.

```ts
import { EdgeScroller } from "edge-scroller";

const boxElement = window.document.getElementById("box");
const edgeScroller = new EdgeScroller(boxElement);

// To enable.
edgeScroller.enable();

// To disable.
edgeScroller.disable();
```


## API
### `EdgeScroller.constructor`
```ts
import { EdgeScroller } from "edge-scroller";

const edgeScroller = new EdgeScroller(boxElement, { offset: 80, scrollSpeedCoefficient: 0.8 });
```

This creates a new instance object of `EdgeScroller` class.

- `targetElement: HTMLElement`
  - Required.
  - The target scrollable element. If the element is not scrollable, edge-scroller does not work fine.
- `options: Options`
  - Optional, a default value is `{}` .
  - `offset: number`
    - Optional, a default value is `50` .
    - An offset value to begin scrolling.
  - `offscrollSpeedCoefficientset: number`
    - Optional, a default value is `0.5` .
    - A coefficient of scroll speed.

### `EdgeScroller.prototype.enable`
```ts
const edgeScroller = new EdgeScroller(boxElement);
edgeScroller.enable();
```

This enables automatic scrolling.

### `EdgeScroller.prototype.disable`
```ts
const edgeScroller = new EdgeScroller(boxElement);
edgeScroller.disable();
```

This disables automatic scrolling.


## Contributing to edge-scroller
Bug reports and pull requests are welcome on GitHub at
[https://github.com/jagaapple/edge-scroller](https://github.com/jagaapple/edge-scroller). This project
is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.

Please read [Contributing Guidelines](./.github/CONTRIBUTING.md) before development and contributing.


## License
The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2020 Jaga Apple. All rights reserved.
