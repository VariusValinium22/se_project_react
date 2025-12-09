**Markdown Preview: Ctrl+Shift+V**

**This is the link to the backend GitHub** [link](https://github.com/VariusValinium22/se_project_express):

**Link to the fully deployed app:** [https://wtwr.flazzard.com/](https://wtwr.flazzard.com/)

**Backend GitHub Page:** [https://github.com/VariusValinium22/se_project_express](https://github.com/VariusValinium22/se_project_express)

**Frontend GitHub Page:** [https://variusvalinium22.github.io/se_project_react/](https://variusvalinium22.github.io/se_project_react/)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Project Name: se_project_react
Description: This is a project that institutes the use of a weather API latlong.net.
There is a header that renders the current month and year and the location.
There is two modals:
Add Clothes button opens a modal that allows a user to add a name, an image to the clothes section and indicate if it is a hot, warm or cold item
When you click on an item in the clothes section, a modal appears that displays the image and the name of the item
There is a weather card that presents the temperature of the given coordinates and displays a related picture of the condition of the given location.

This project is the frontEnd of the backEnd project: se_project_express

Technologies: React.js; Vite.js; HTML/CSS; BEM/semantic tags;

GitHub Page: [link](https://variusvalinium22.github.io/se_project_react/)
Backend Repo GitHub Page: [link](https://github.com/VariusValinium22/se_project_express)

After building the backend project, we know have a mongodb attached that we can see items added through Postman and addItem button.

LOCAL run:
npm run dev (in BOTH the frontend and backend Terminals)
se_project_react: To run this project: npm run dev
se_project_express: also have to run this cmd to run 'nodemon app.js': npm run dev

    make sure the location setting has a temperature that is 'hot' enough to display the mock data Postman renders.
    make sure you have items in mongoDB now that it is set up locally.

PROD run:
deployed to Google Cloud VM
just go to any of the Domain Names in a browser
NOTE: the Prod app in the VM is connected to the LOCAL MongoDB database in app.js file on the VM. This was done purposefully
so to not get charged for renting a public MongoDB database. mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db")

Domain Names:
https://wtwr.flazzard.com
https://www.wtwr.flazzard.com
https://api.wtwr.flazzard.com
