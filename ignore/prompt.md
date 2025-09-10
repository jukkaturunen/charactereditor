The intention is make a web app for viewing editing character sheets for the game World of Darkness.

Character data is stored in json files, example_json.json in the same directory as the web app. Character sheet looks like the one in file example_sheet.png.
Json data field pretty closely match the ones in picture, field values should be presented as dots like in sheet example.

The web app should be able to:
- View the character sheet
- Edit the character sheet
- Save the character sheet
- Load the character sheet

To start with, the web app should be able to:
- View the character sheet

Use example_json.json as character data.

Put all code in index.html.

===

Now we have sections for attributes and skills, let's create third one called "other traits" as on example character sheet, and start to populate stuff under there. Create also subsections:  

# health
- Create two rows of boxes as in example_sheet.png
- Upper row is populated with value from field "max"
- Lower row is left empty for now
- Values in both rows should changeable and saved same way as changes in skills and attributes. Skip saving for lower row for now, as this is more complex.

# willpower
- Create two rows of boxes as in example_sheet.png
- Upper row is populated with value from field "max"
- Lower row is populated from value from field "current"
- Values in both rows should changeable and saved same way as changes in skills and attributes. 

# integrity
- This is mapped straight from field "integrity"

