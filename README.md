# Homework Assignment 4 Part 2
## Notes
___
The assignment sheet states that  

>*Each time you create a new table, display it in a new tab and label that tab with the four parameters used to create it.*  

and  

>*In addition, your table should update dynamically when either the slider is changed or a new text value is entered.*  

These two statements are mutually exclusive: creating a new tab each time a new table is generated, if the tables are generated dynamically in real-time as values are changed, would very quickly crash the browser with a great many new tabs. To reconcile this, I have decided to implement my tab system in the following manner:  
A dedicated tab exists to show the dynamic table - the one which changes in real-time as the user moves sliders or confirms text-field inputs. If the user wishes to save the current table, they must press the `SAVE` button. The table is then saved to a new tab.

___
***Multiple Tab Deletion*** is accomplished by clicking the `DELETE ALL` button.

***Single Tab Deletion*** is accomplished by clicking the `DELETE` button, found in the content area of a tab.

Moving the sliders instantly changes the text-field values.

Text-fields must be submitted to update the sliders.

Sliders induce real-time table updating.
___
## Links
_Repository_

https://github.com/mitbailey/hw4p2

_GitHub Pages_

https://mitbailey.github.io/hw4p2/

_JavaScript_

https://github.com/mitbailey/hw4p2/blob/master/src/script.js

_CSS (see lines 332-337)_

https://github.com/mitbailey/hw4p2/blob/master/css/style.css
___

## References
https://www.w3schools.com/

https://api.jqueryui.com/

https://jqueryvalidation.org/  
