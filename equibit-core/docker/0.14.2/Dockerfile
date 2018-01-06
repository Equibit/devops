FROM ubuntu:16.04

MAINTAINER Harmeek Jhutty <hjhutty@coderise.io> (@coderiseio)

RUN useradd -r equibit

ENV GOSU_VERSION=1.10

RUN apt-get update -y \
  && apt-get install -y curl gnupg \
  && apt-get install -y autoconf \
  && apt-get install -y libtool \
  && apt-get install -y g++ \
  && apt-get install -y pkg-config \
  && apt-get install -y libboost-all-dev \
  && apt-get install -y libevent-dev \
  && apt-get install -y git \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN set -ex \
    && for key in \
      B42F6819007F00F88E364FD4036A9C25BF357DD4 \
    ; do \
      gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
      gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
      gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" || \
      gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" ; \
    done

RUN curl -o /usr/local/bin/gosu -fSL https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-$(dpkg --print-architecture) \
  	&& curl -o /usr/local/bin/gosu.asc -fSL https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-$(dpkg --print-architecture).asc \
  	&& gpg --verify /usr/local/bin/gosu.asc \
  	&& rm /usr/local/bin/gosu.asc \
  	&& chmod +x /usr/local/bin/gosu

RUN cd /opt && git clone https://github.com/openssl/openssl.git \
    && cd /opt/openssl && ./config \
    && make && make install \
    && cp /usr/local/lib/lib* /usr/lib/ \
    && rm -rf /opt/openssl

ENV EQUIBIT_VERSION=0.14.2
ENV EQUIBIT_FOLDER_VERSION=0.14.2
ENV EQUIBIT_DATA=/home/equibit/.equibit \
  PATH=/opt/equibit-${EQUIBIT_FOLDER_VERSION}/:$PATH

ADD equibit-${EQUIBIT_VERSION}.tar.gz /opt/

VOLUME ["/home/equibit/.equibit"]

COPY docker-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8332 8333 18332 18333 18444

CMD ["equibitd"]
