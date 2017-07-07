Visualization tool for the Outlier Detection algorithm developed for the OpenBudegets project.

# User Guide
## Datasets List
In this module the user can see the list of datasets that have been already processed by the tool and which results are 
stored locally. Clicking on an item of that list will render the details page for that dataset.
 
![Datasets List](resources/screenshots/datasets-list.png?raw=true "Datasets List")
![Dataset Status](resources/screenshots/datasets-list-status.png?raw=true "Dataset Status")

Each Dataset can be in two different statuses: Ready (green) and Processing (red), as shown in this picture:


## Dataset Detail
Shows a bubble chart for the selected dataset. Each bubble is a transaction in the dataset as returned by the 
Outlier DM algorithm.

**Dimensions**
* **X**: Year.
* **Y**: Amount of money as it comes from the dataset itself.
* **Size of the bubble**: score obtained by this transaction telling us how "outlier" it is.
* **Color of the bubble**: budget phase or status in which this particular transaction appears in.

Hovering your mouse over a bubble will open a popup dialog with the exact information related to that transaction. 

![Dataset Detail](resources/screenshots/dataset-detail.png?raw=true "Dataset Detail")

## Adding a new Dataset
By clicking on the "New Dataset" button in the left navigation bar users are redirected to this view where they can tell
 the tool to import new datasets from OpenSpending, processing them through DAM using the outlier_dm algorithm and 
 saving the results locally so other users or themselves can come later on an just visualize the results without 
 computing everything again.
  
**Field descriptions**
* **Dataset Name**: name that will be shown in the datasets list page to refer to this dataset once it is added.
* **Cube**: dataset ID inside OpenSpending.
* **FactsURI**: Babbage API endpoint to be used.
* **DamUrl**: DAM endpoint used for executing the algorithm over the dataset.

![New Dataset](resources/screenshots/new-dataset.png?raw=true "New Dataset")

**Searching for a Dataset**
* Clicking the "SEARCH DATASET BY NAME" button will open a search bar in which you can start typing part of the
name of your dataset in the OpenSpending platform, the list will filter out all datasets not matching your search.
* After filtering, clicking on an element from that list will automatically paste the ID of that dataset into the "Cube"
field and close the search component.
* After filling all the fields as you see fit, click the "ADD DATASET" button
 
![New Dataset Search](resources/screenshots/new-dataset-search.png?raw=true "New Dataset Search") 

# Installation

## Start inside Docker container
* Install docker and docker-compose in your machine.
* Run the backend app inside the webapp folder of this repository: (https://github.com/openbudgets/outlier_dm).
* Then:  ```$ docker-compose up```

If there's an error installing dependencies, make sure your /etc/resolv.conf file includes "nameserver 8.8.8.8" so the 
Docker daemon includes that DNS inside the container, then stop the container pressing Ctrl+C and executing 
docker-compose --build 

## Installing locally
```bash
# clone the repo
git clone https://github.com/openbudgets/outlier-dm-ionic2.git

# change directory to repo
cd outlier-dm-ionic2

# Use npm to install the dependencies
npm install

#install ionic2
npm install -g cordova ionic

# start the server
ionic serve --all
```
Navigate to [http://localhost:8100/](http://localhost:8100/) in your browser. 
