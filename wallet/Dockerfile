FROM ubuntu:latest

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

MAINTAINER Harmeek Jhutty <hjhutty@coderise.io>

RUN apt-get update
RUN apt-get install -y software-properties-common git net-tools
#RUN add-apt-repository ppa:jonathonf/firefox-esr
RUN apt-get install -y bash curl

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends firefox dbus-x11 ttf-wqy-microhei \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/* 

ENV NVM_DIR=/usr/local/nvm
ENV NODE_VERSION=8.9.1
ENV NVM_VERSION=0.33.6

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v${NVM_VERSION}/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v && npm -v

