# Notebook

A website that helps you organize daily notes. User Friendly and available on desktop and mobile

## Installation

In the project directory, you can run:

To install npm packages needed for the app to run:
### `npm install`

To run the app in your browser:
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

- On the first load, there are two sections: a left sidebar and a window where you can
  actually create your new note.
- Sidebar is composed with a section to create a new category for your upcoming notes
  and a section with all categories of notes. For testing purposes, some categories are
  premade.
- Clicking on a category will display notes of that particular category.
- Clicking on Create Note will bring on a window to create a new note, which consists
  on two input fields, a title and a body for the note. When finished, click Save
  Changes button on bottom right corner.
- Alongside the Create Note button there is a Search bar when you can search notes
  case insensitive based on title or body from a particular category clicked previously.
- If no category was previously clicked, the note will be saved on General category.
- Clicking on an existing note will bring you the same window, this time with two
  features, to either update its content or delete the note forever.

## How might you make this app more secure?

Using user input sanitization by filtering out harmful characters.
Implementing client side validation for inputs, users will input on
expected formats, for example expected data types and length limits.
If we were to use a backend, for sure we should implement login and 
authentication
We could also limit the number of requests hitting our API.
If there are a lot of users, hashing notes saved on the database will
increase security and they could save passwords and other sensitive data.

## How would you make this solution scale to millions of records?

Using pagination in order to load notes on a bunch in order to increase performance
Using client-side caching like localStorage to save notes previously fetched
Implementing lazy loading to increase performance.
If backend were a thing in this app, sending API requests to retrieve notes only
based on a certain category and not all milions of notes together.