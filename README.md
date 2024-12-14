# a simple command

This is a project for terminal interaction, serving the [ixxx](https://github.com/lmssee/ixxx) class

## language

[English](https://github.com/lmssee/npm-a-command/blob/main/README.md) [中文](https://github.com/lmssee/npm-a-command/blob/main/自述文件.md)

## install

```sh
npm install   a-command  --save
```

## use

```js
import Command from 'a-command';
```

### Command section

The comprehensive part is to put [`Args`](#args-section-get-user-start-program-params), [`selection`](#selection-section-select-mode), and [`question`](#question-section-qa-mode) together

For specific usage, please refer to their own instructions section

### Args section (get user start program params)

`Args` can obtain the parameters passed in by the user when starting the program

Analyzing user input parameters

**_will only start working after calling `run`, and all `bind` must be completed before `run`_**

Please note that the execution is sequential, and once the `run` operation is completed, the `bind` operation cannot be executed. If you insist on doing so, users may see strange information that was originally meant to remind you .

During the execution process, you can refer to the 'state' value to view. When the user is only referring to the version number or printing help, the 'state. code' will be 4, and 'state. overText' will be returned to indicate whether they are referring to the version number or printing help. It is not recommended to execute other commands when 'state. code' is 4. You can also print some other fun ones

- `commandName argName`
- `commandName argName   value`
- `commandName argName    optionName`
- `commandName argName    optionName  value`

Example：

If your command name is `ixxx` , You added parameters：

**Please avoid abbreviations as much as possible `h`、`v`**

_When you have multiple configuration items, you can use an array to group the configuration items that comply with the rules_

- Simplified example
  ```js
  import { Args } from "a-command";
  const command: Args = new Args("ixxx");
  command.bind("init <-i> (Initialize configuration file)").run();
  ```
- Simple configuration example
  ```js
  import { Args } from "a-command";
  const command: Args = new Args("ixxx");
  command
    .bind({
      name: "init",
      abbr: "-i",
      info: "Initialize configuration file",
    })
    .run();
  ```
- Example of carrying sub item configuration

```js
import { Args } from "a-command";
const command: Args = new Args("ixxx");
command.bind({
  name: "init",
  abbr: "-i",
  info: "Initialize configuration file",
  options: [
    "ts <-t> (Initialize a `ts` configuration file)",
    "js <-j> (Initialize a `js` configuration file)",
    "json <-o> (Initialize a `json` configuration file)",
  ],
});
command.run(); // Users can use `gig init -o`
```

- Example of carrying detailed configuration of sub items

```js
import { Args } from "a-command";
const command: Args = new Args('ixxx');
command.bind({
  name: "init",
  abbr: "-i",
  info: "Initialize configuration file",
  options: [
    {
      name: "ts",
      abbr: "-t",
      info: "Initialize a `ts` configuration file",
    },
    {
      name: "js",
      abbr: "-j",
      info: "Initialize a `js` configuration file",
    },
    {
      name: "json",
      abbr: "-o",
      info: "Initialize a `json` configuration file",
    },
  ],
});
command.run(); // Users can use `gig init -o`
```

- Strange behavior binding parameters:

```ts
import { Args } from 'a-command';
const command: Args = new Args('ixxx');
command.bind({
  'init <-i> (Initialize project)': [
    'ts  (Initialize a ts configuration file)',
    'js  (Initialize a js configuration file)',
    'json  (Initialize a json configuration file)',
  ],
  'create <-c> (Add a file)': [
    'ts  (add a ts  file)',
    'js  (add a js file)',
    'json  (add a  json file)',
  ],
});
command.run(); // Users can use `gig init ts`
```

- Finally, you can use `args` to obtain the user's actual value input

```ts
    ... // other code

     /**
      *   Obtain processed user input parameters
      *
      *  This mode preserves user input as much as possible, but also discards some unrecognized inputs
      * */
    command.args;
    /**
     *  Obtain the Object form of the processed user input parameters
     *
     *  This mode is more suitable for configuring files
     *
     * **_In this mode, `subOptions` will overwrite the superior's `value`_**
     *
     * */
    command.args.$map;
    /**
     * For the convenience of obtaining ordered object pattern data
     *
     *  this has been added
     *
     */
    command.args.$arrMap
     /**
      *   Obtain a simple form of the processed user input parameters
      *
      *  This mode is suitable for simple commands, only checking if the command has
      * */
    command.args.$only;

      /**
   *
   *   Is it empty? Check if the user has not entered command parameters
   */
    command.args.$isVoid;
    /**
     *
     * User's original input parameters
     */
    command.args.$original;
    /**
     *
     * No matching data (not bound)
      */
    command.args.$nomatch

```

Get current status

```ts
/**
 * is over ? you will get  a  boolean value
 *  although ,it over
 *  you can do other thing  if you want , you can get `state`  for what over
 *
 */
command.isEnd;
/**
 * If you have nothing else to do after
 *  the user uses the help document or
 * printed version information,
 *
 * you can use the `end`
 *
 */
command.isEnd.end;
command.state; //  state
command.state.code; // state code
command.state.overText; //    "version" | "help" | undefined;
```

#### Proactively using help documents

Now you can actively display help documents by calling the `help` method

**Proactively calling, saying I hope you can use complete spelling instead of abbreviations**

```ts
command.help();
command.help('init'); // Display init command
command.help('init', 'vue'); // Display vue command information under init
```

#### Proactively using version instructions

Now you can actively display version information by calling the `version` method

```ts
command.version();
```

### question section (Q&A mode)

`Question 'is a question and answer mode that can be used to ask users questions or make simple choices. After referencing this function, use it where needed
_A function waiting for user input. Because it needs to wait, it is asynchronous, and when using it, `wait` should be used\_

#### Example

The simplest use :

```js
import { question } from 'a-command';
const result = await question('What do you want for lunch');
```

Using custom configurations can provide users with a better experience.

```js
import { question } from 'a-command';
const result = await question({
  text: 'What do you want for lunch',
  tip: 'Hamburg or Italian pasta',
  type: 'text',
});
```

You can also configure 'tip' as an array and configure Q&A as a simple selection.At this point, users can only choose from the values provided by 'tip' **Only suitable for simple selection, such as' yes' or 'no' or 'male' or 'female' options with more words, it is recommended to use [selection] (# selection - section - selection mode -)**

```js
import { question } from 'a-command';

const result = await question({
  text: 'What do you want for lunch', // Required parameters
  tip: ['Hamburg ', ' Italian pasta'], // Optional parameter, enter selection mode when it is an array
  type: 'text', //A type selection that supports `text` and `password`,Optional parameter, default : `text``
  private: false, // Overwrite after input,Optional parameter,,default: `false`
  resultText: "Okay, then let's go eat", // Optional parameter,of  result display
});
```

Multiple questions can also be provided at once, just place them in an array (array and object patterns can be mixed and matched)

```js
import { question } from 'a-command';

const result = await question([
  {
    text: 'What do you want for lunch',
    tip: ['Hamburg ', 'Italian pasta'],
    resultText: "Okay, then let's go eat",
  },
  {
    text: 'What`s your favorite dessert',
    private: true,
  },
  'Where to play after dinner',
]);
```

### selection section (Select mode)

After referencing this function, use it where needed
_A function waiting for user input. Because it needs to wait, it is asynchronous, and when using it, `wait` should be used_

#### Example

The simplest use :

```js
import { selection } from 'a-command';
console.log('What do you want for lunch');
const result = await selection([
  'Hamburg',
  'Italian pasta',
  'steak',
  'pizza',
  'chafing dish',
]);
```

Full configuration :

```js
import  { selection } from "a-command";

const result = await selection({
    showInfo: true,
    info: "What do you want for lunch?",
    data: [
        "Hamburg",
        "Italian pasta",
        "steak",
        "pizza",
        "chafing dish",
      ],
    showPreview: true,
    preview: "currently want to eat"
    resultText: "Okay, then let's go eat "
});
```

_If you don't want to display the issue and preview, you can use the pattern of the incoming object for custom configuration_

If you have any questions, you can directly [submit question](https://github.com/lmssee/npm-a-command/issues/new)
