#!/bin/bash

rsync -raz -v -k --delete --exclude node_modules --exclude .git ~/Desktop/edlink/edlink-js/ learning:~/edlink-js;