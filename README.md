# standalone JS
- JS file that give you great custom chatbot for your website
- Code includes sounds
- Multi choice steps
- No need any dependencies
- No html, css codes/files
- All-In-One JS file that generate everything for you
- Easy to understand, free to custom anything there
## demo

![Screen Recording 2024-10-26 at 4 27 38 PM](https://github.com/user-attachments/assets/ca868529-30b9-4976-99ed-8ec9a7276c26) 

## How to Create your Steps
```js
let options = {
    default: [
        { label: "Option 1", goto: "step-2" },
        { label: "Option 2", onclick: () => console.log("clicked me") },
        { label: "Option 3", onclick: () => console.log("clicked me") },
    ],
    "step-2": [
        { label: "Opt1 stp2", message: "Option 2 step 2 message" },
        { label: "Opt2 stp2", message: "Option 2 step 2 message" },
        { label: "Back", goto: "default" },
    ],
};
```

