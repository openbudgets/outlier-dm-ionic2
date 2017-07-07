Visualization tool for the Outlier Detection algorithm developed for the OpenBudegets project.

![Datasets List](resources/screenshots/datasets-list.png?raw=true "Datasets List")


# Start inside Docker container
* Run the backend app (https://github.com/openbudgets/outlier_dm)
* install docker and docker-compose in your machine
* Then:  ```$ docker-compose up```

If there's an error installing dependencies, make sure your /etc/resolv.conf file includes "nameserver 8.8.8.8" so the 
Docker daemon includes that DNS inside the container, then stop the container pressing Ctrl+C and executing docker-compose --build 

### Quick start

```bash
# clone the repo
git clone https://github.com/openbudgets/outlier-dm-ionic2.git


# change directory to repo
cd outlier-dm-ionic2

# Use npm or yarn to install the dependencies:
npm install

#install ionic2
npm install -g cordova ionic

#start app
ionic start myApp tabs

#will have some settings, basiclly all choose 'y'

# start the server
ionic serve
```
Navigate to [http://localhost:8100/](http://localhost:8100/) in your browser. 
This is the Frontend.

Backend will need outlier_dm/webapp
