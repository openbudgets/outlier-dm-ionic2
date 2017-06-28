Visualization tool for the Outlier Detection algorithm developed for the OpenBudegets project.

# Start inside Docker container
* Run the backend app (https://github.com/openbudgets/outlier_dm)
* install docker and docker-compose in your machine
* Then:  ```$ docker-compose up```

If there's an error installing dependencies, make sure your /etc/resolv.conf file includes "nameserver 8.8.8.8" so the 
Docker daemon includes that DNS inside the container, then stop the container pressing Ctrl+C and executing docker-compose --build 
