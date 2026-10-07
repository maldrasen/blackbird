---
id: 261
title: Create a record factory
priority: 1
created: 2026-10-07
tags: []
points: 5
---
---
The way I'm building the records is stupid, basically just copy pasting the boilerplate needed to give all of these immutable data objects the same shape. The "meat" of each record is in the lookup function. We could probably pull the boilerplate out into a record builder. Then each record calls that instead. I'm thinking something like:

```
Record.define("Ammunition", {
  getInstance: record => {
    // Everything currently in lookup, except that the record data is 
    // passed into this function and getCode() is added to the object
    // this returns. 
  }
});
```

Define will add Ammunition to the global scope, with the shared "class level" functions records currently possess: `register`, `getAllCodes`, `lookup`

A few records will need to be able to overwrite the standard register function with their own version. We'll also need a way to add other top level functions in the define as well, such as `getAllUnleveledCodes` on the Aspect record.

Some records will also need a `validate: record => (...)` as well, and a few other random options here and there. 

The goal here is to do all of this within the records themselves, without changing the data objects that register records, or the places where the data is looked up. Also the goal is to simplify here, reduce boilerplace, lower entropy. 