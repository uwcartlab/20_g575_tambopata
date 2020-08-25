# Tambopata Website

This is an instructional README to guide the developer into editing/updating the Tambopata website. For information about changing the password, uploading/editing YouTube videos, or looking at the Tambopata Google Analytics account, please reach out to Lisa or Jay on retrieving those instructions.

NOTE: This repository does not include the password functionality, or the full content on the Zoning Debrief page. For privacy reasons, those can only be updated onto the Tambopata server.

### Access to the Science Hall Server

First off, you will need to contact Jay Scholz about getting access to edit the Tambopata site. You will also need to access the server through the VPN network. For instructions on how to connect an off-campus device to Science Hall’s VPN network, visit: https://kb.wisc.edu/helpdesk/91915.

Once you have access, the current file path to the Tambopata website is: \\geographyweb.shc.wisc.edu\tambopata

### Website Structure

The website has folders for all the webpages of the Tambopata website. The initial folder contains 10 folders, and an index.html. The index.html is the main “home” page for the site, where it hosts the “Assignment” page. For that page needs 4 other folders:

1.	CSS – for styling the webpage
2.	img – for hosting images of the webpage
3.	js – for hosting internal JavaScript files
    1.	This folder is used for the user’s own customized functions in designing the website.
4.	lib – for hosting external JavaScript files
    1.	This folder is to host other “packages” that supplement the main.js file in the js folder (leaflet.js, jQuery, D3.js, etc.)
The other 6 folders are as follows:
1.	credits – the “Credits” webpage
2.	maps – the “Proposals” webpage
3.	secret – the “Zoning Debrief” webpage
4.	stakeholders – the “Stakeholders” webpage
    1.	This folder contains another folder called “stakeholders”, which contains a subset of the 11 characters on the “Stakeholders” page.
    2.	Inside each of the 11 stakeholder folders will just contain an index.html file, a css folder, a js folder, and a lib folder.
5.	v1 – houses the first version of the original Tambopata site from 2013
6.	Wireframes – the sketches and mock-ups of the prototype website from the 2020 team renovation.

Every webpage needs the 4 folders (css, img, js, lib) an index.html file, and sometimes a “data” folder. The “data” folder is only needed if the webpage is displaying some sort of data (i.e. interactive maps/charts). You should only see a data folder in the maps and secret folder.

### Adding a Stakeholder in the Stakeholders Page

To add a new stakeholder, make sure you are in the stakeholder directory and go into the next stakeholders folder

Next, add a new folder, make sure it is all one word and relates to the stakeholder’s name/role.

Just like the other stakeholders, this folder will need an index.html file, and a css/js/lib folder. To save time, you can copy and paste these folders from one of the current stakeholders into this NEW_STAKEHOLDER. The only difference in the setup will be videos, text, and images. The rest of the format should already be displayed and stylized correctly.
Now that the folder structure for the new stakeholder is setup, let’s first create a new character in the stakeholder grid on the Stakeholder page.
Make sure you have the index.html open on your coding software. A majority of the design of website was done through Bootstrap 4, which helps display websites more smoothly in desktop/mobile. The Stakeholder page uses Bootstrap’s “grid” model to display all the stakeholders in a fixed grid view.

For the array of stakeholders, each stakeholder is contained in a “column”, and all those “columns” are contained in 1 “row”. That 1 "row" is then contained in a “container”. Those 3 words “column”, ”row”, and “container” are all syntax related to Bootstrap 4’s grid setup. To learn more about it, visit https://getbootstrap.com/docs/4.0/layout/grid/.
In the index.html for the Stakeholder page, you will see multiple lines that have a similar structure for each stakeholder link:

```html
<div class = "col-md-4 col-sm-6 col-xs-12 gridItem" style = "margin-bottom: 25px;">
	<a href="stakeholders/rainforest-expeditions">
		<div class = "image-container">
			<img class = "img-fluid img-bground " src = 'img/Stakeholder_reg/StakeholderGridFix/expeditions.png'>
			<div class = "overlay"></div>
		</div>
	</a>
  <div style = "display: absolute;">
      <div class = "stakeholderNames">Cofounder of Rainforest Expeditions</div>
  </div>
</div>
```
The first div element contains the “column” (col-md-4, col-sm-6, col-xs-12) from Bootstrap. Inside the div has an a tag of the link to the new stakeholders page, and an img tag for where the image of the stakeholder would be. The div element with “overlay” class is just for the hover/highlighting functionality. In the div element with the class name “stakeholderNames”, change the name of the new stakeholder. Below is a snippet of what the new code of the new stakeholder should look like:

```html
<div class = "col-md-4 col-sm-6 col-xs-12 gridItem" style = "margin-bottom: 25px;">
	<a href="stakeholders/NEW STAKEHOLDER">
		<div class = "image-container">
			<img class = "img-fluid img-bground " src = 'img/Stakeholder_reg/StakeholderGridFix/NEW-STAKEHOLDER-IMAGE.png'>
			<div class = "overlay"></div>
		</div>
	</a>
	<div style = "display: absolute;">
		<div class = "stakeholderNames">NEW STAKEHOLDER NAME</div>
	</div>
</div>
```
NOTE: For the image being used for the new stakeholder, you need to make sure the photo is saved/exported to a consistent size. All the character photos are 500x500 pixels. You may have to go into Adobe Photoshop and export the new stakeholder image into that correct size, or else it may look distorted on the webpage.

Once that is added into the main stakeholder page, you can go into the new stakeholder index.html and edit the text, as well as images needed on that page.

### Required script and link in each index.html

Since the website uses a lot of external JavaScript packages, it is important to include the following for the link:

```html
<link rel = "stylesheeet" href = "css/style.css">
<link href = 'https://fonts.googleapis.com/css?family=Arimo' rel = 'stylesheet' type = 'text/css'>
<link rel = "stylesheet" href = "css\bootstrap-grid.min.css">
<link rel = "stylesheet" href = "css\bootstrap.min.css">
```

- The href link to fonts.googleapis.com is a free font used mostly in the site, if there are changes to fonts on this website, you would need to visit https://fonts.google.com/
- css/style.css is the customized styles the Tambopata team has created to design the website (colors, tag element sizes, etc.).
- The two bootstrap.css files are also needed, as this is what contains the “container”, ”col-xx-xx”, ”row”, etc. class names to have the styles work.

Here is what will be needed for the script:
```html
<script src = "lib\jquery-3.4.1.js"></script>
<script type= "text/javascript" src="js/main.js"></script>
<script src = "lib\bootstrap.min.js"></script>
<script src = "lib\bootstrap.bundle.min.js"></script>
```

- jQuery is needed to run a lot of Boostrap functions, make sure to have the latest version.
- For js/main.js, this is where the custom functions come into play. This is also needed, as each main.js file in all pages have a function for the password access to the Zoning Debrief page.
- There are also Bootstrap js files needed to work for the styles to work/function.
- NOTICE: main.js is in the js folder, and the rest of the js files are in the lib folder.

### Editing Text on Current Webpages

Based on the criteria of the assignment, the content may need edits/updates depending on the page. Luckily, the Assignment, Stakeholder characters, Zoning Debrief, and Credits page have a similar format for editing.

1.	Credits Page
    1.	The credits page contains a lot of lists (ul) of all the people who contributed to this project.
    2.	If content is ever updated/edited, it could mean that it was contributed by another source (i.e. new/additional image from someone, information about a certain stakeholder, etc).
    3.	Each of the credits is categorized in a group of who contributed, and is each in a “container” div element to be updated.
    4.	The sup tags are to show footnotes of certain people’s work and affiliations.
2.	Assignment Page
    1.	For the most part, this page has one giant container that holds “rows” for “columns” on “About the Assignment”,”Glossary”, and “Key Events”.
    2.	In each of those “columns”, the text is most setup from the <p> tag.
    3.	To edit/add text, I find the control+f keyboard shortcut, and find the text needed to be edited or added.
3.	Stakeholders
    1.	Each stakeholder page is also contained in 2 “containers”.
        1.	One for the information and story of the stakeholder.
        2.	One for the YouTube videos related to that stakeholder.
    2.	Similarly to the Assignment Page, each stakeholder page also has “row” and “column” div elements.
    3.	The p tag will most likely be the location for updating/editing text. However, there are also <span> tags that have “popups” of certain characters from other stakeholders.
    4.	The YouTube videos are embedded from the iframe element, which shows the video.
        1.
         ```html
        <div class="container" class="arimo" align="center" style="color:#006d2c;">
          <h3>Example Stakeholder Name</h3>
        </div>
        <div class = "iframe-container" align="center" style="margin-bottom:10px;">
          <iframe width="560" height="315" src="Example YouTube Link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <br>
          ```
        2.	In order to add a video, make sure you have a shared link to be brought into the video. You will need specific login information to add/upload the YouTube videos. Contact Jay or Lisa for those credentials.
    5.	Adding a new YouTube video into a stakeholder page.
        1.	Use the Tambopata Login Instructions on how to log into the Tambopata YouTube account.
        2.	When logged in, find the new video to be added.
        3.	Find the share button on the bottom right of the video.
            1.	Instead of copying the shared link, click on the “Embed” button, where you will copy and paste the iframe.
5.	Zoning Debrief
    1.	Since this is the “last” webpage for the students to visit at the end of the assignment, it is important that this has the password access in function.
    2.	While this page has plenty of <p> tags, it also has a lot of <figure> tags, which hold photos of the “Scrollytelling”.

### Editing the Proposals Page

This webpage has a lot, where a lot is being hosted in.

```html
<script type="text/javascript" src="lib/leaflet/leaflet.js"></script>
<script type="text/javascript" src="lib/jquery-3.4.1.js"></script>
<script type="text/javascript" src="js/mobile.js"></script>
<script type="text/javascript" src="js/desktop.js"></script>
<script src = "lib\bootstrap.min.js"></script>
<script src = "lib\bootstrap.bundle.min.js"></script>
<script src = "lib\leaflet\leaflet-side-by-side.js"></script>
<script type = "text/javascript" src="lib/leaflet/leaflet-providers.js"></script>
<script src="https://unpkg.com/esri-leaflet@2.4.0/dist/esri-leaflet.js"
    integrity="sha512-kq0i5Xvdq0ii3v+eRLDpa++uaYPlTuFaOYrfQ0Zdjmms/laOwIvLMAxh7cj1eTqqGG47ssAcTY4hjkWydGt6Eg=="
    crossorigin=""></script>
<script type="text/javascript", src="js/main.js"></script>
<script type="text/javascript", src="js/Additional_Roads.js"></script>
 ```
The main.js file does 2 things:
- Runs the password function done on every main.js folder on every webpage, while also checks if the user has visted the Proposals page or not for the tutorial video modal to appear.
- Calculates the screen size window to have the Proposal page run in desktop or mobile view.

The data folder has the following:
- 4 proposal geojson files (used in both desktop/mobile js files)
- Roads.geojson (Secondary Roads – used in desktop)
- TNR_Boundary.geojson (TNR Boundary - used in both desktop/mobile js files)
- pointsOfInterest.geojson (Points of Interest – used in both desktop/mobile js files)
- Points of Interest.csv, used for reference
- Tambopata_Proposals.ai – Illustrator file that exports the PDF maps of all 4 proposals
- Tambopata_Porposals.pdf – PDF file that has all 4 proposals

The js/Additional_Roads.js is used for mobile.js only to load the Secondary Roads feature. The script is essentially just a variable that contains the geojson information.

### For updating the Zone Name/Descriptions:

1.	Go into all 4 geojson files and replace the name and descriptions.
    1.	Make a copy of the geojson and edit instead of saving over the current file.
    2.	Zone Name field is “ZONES”
    3.	Zone Description field is “Zone_Description”
2.	In Desktop.js:
    1.	 You will have to go into the createLegend function and change the names in lines ~296-305. jQuery is appending the html tags into the map with all the zone names and description, along with class names as well.
    2. ```javascript
        $(container).append('<div class = "item item1"><div class="block" id="bufferZone"></div><p class="legendtxt">.....</p></div><div class = "zone1 zoneDesc">....</div>');
        $(container).append('<div class = "item item2"><div class="block" id="communityReserve"></div><p class="legendtxt">.....</p></div><div class = "zone2 zoneDesc">....</div>');
        //More legend items in the actual main.js file
        ```
    3.	In the style function (line 476), you will have to change the name of the zoneName in order to appear on the map.
    4. ```javascript
        else if(zoneName == "NEW ZONE NAME"){
			color = "#111111";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
        ```
3.	In mobile.js:
    1. Similar to deskotp.js, but the function is createMobileLegend in lines 377-420.
    2. Find the style function (lines 439) to change the zoneName in order to appear on the map.

### For updating the Zone Colors:

If a zone color needs to be changed, you will have to update the legend color as well as the geojson style.

1.	In desktop.js:
    1.  You will have to go to the style function (line 476), and change the color. The color will most likely have to be HEX code.
    2. ```javascript
        else if(zoneName == "Zone Name"){
			color = "#NEW ZONE COLOR HERE";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
        ```
    3. You will also have to locate the <div> id name in the createLegend function in order to change the HEX in the style.css file.
2.	In mobile.js:
    1.	Locate the createMobileLegend (line 377), and find the correct id name in the <div> tag named “mLegendItem”.
        1. Luckily, the id names are both used in desktop/mobile js files.
    2.	Just like in desktop.js, you will have to go to the style function (line 439), and change the color. The color will most likely have to be HEX code.


NOTE: Since there are a lot of ids/class names combined for both desktop and mobile view, the mobile names usually have an “m” or “M” in the front of it to stand as “mobile”.
