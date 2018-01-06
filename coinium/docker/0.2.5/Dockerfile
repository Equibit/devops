FROM mono:latest

MAINTAINER Harmeek Jhutty <hjhutty@coderise.io> (@coderiseio)

RUN useradd -r coinium

ENV GOSU_VERSION=1.10

RUN apt-get update -y \
  && apt-get install -y curl gnupg \
  && apt-get install -y git \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN set -ex \
    && for key in \
      B42F6819007F00F88E364FD4036A9C25BF357DD4 \
      FE3348877809386C \
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

RUN cd /opt && git clone https://github.com/CoiniumServ/CoiniumServ.git \
    && cd CoiniumServ \
    && git submodule init \
    && git submodule update

RUN apt-get update \
    && apt-get install -y mono-complete && apt-get install -y procps && apt-get install -y net-tools && apt-get install -y vim  \
    && apt-get --yes --force-yes install wget \
    && cd /opt/CoiniumServ \
    && wget https://dist.nuget.org/win-x86-commandline/latest/nuget.exe \
    && mono nuget.exe restore CoiniumServ.sln \
    && msbuild CoiniumServ.sln /p:Configuration=Release \
    && mono packages/xunit.runner.console.2.3.1/tools/net452/xunit.console.exe src/Tests/bin/Release/CoiniumServ.Tests.dll \
    && chown -R coinium /opt/CoiniumServ

ENV LITECOIN_VERSION=0.14.2
ENV LITECOIN_DATA=/home/coinium/.litecoin

RUN mkdir -p /home/coinium/.litecoin

RUN curl -O https://download.litecoin.org/litecoin-${LITECOIN_VERSION}/linux/litecoin-${LITECOIN_VERSION}-x86_64-linux-gnu.tar.gz \
      && curl https://download.litecoin.org/litecoin-${LITECOIN_VERSION}/linux/litecoin-${LITECOIN_VERSION}-linux-signatures.asc | gpg --verify - \
      && tar --strip=2 -xzf *.tar.gz -C /usr/local/bin \
      && rm *.tar.gz

COPY config/pools/pool.json /opt/CoiniumServ/build/bin/Release/config/pools/

ENV COINIUM_VERSION=0.2.5-beta
ENV COINIUM_FOLDER_VERSION=0.2.5-beta
ENV COINIUM_DATA=/home/coinium/.coinium \
  PATH=/opt/CoiniumServ/bin/Release:/opt/coinium/.litecoin:/usr/local/bin:$PATH

VOLUME ["/home/coinium/"]

COPY docker-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8332 8333 9332 9333 18332 18333 18444

CMD ["litecoind"]
