FROM registry.ng.bluemix.net/equibit/equibit-ubuntu:16.04

MAINTAINER Harmeek Jhutty <hjhutty@coderise.io> (@coderiseio)

ENV EQUIBIT_VERSION=0.14.2
ENV EQUIBIT_FOLDER_VERSION=0.14.2
ENV EQUIBIT_DATA=/home/equibit/.equibit \
    PATH=/opt/equibit-${EQUIBIT_FOLDER_VERSION}/:$PATH

WORKDIR /root/equibit/

RUN git clone -b edc-core-0.14.2 https://Equibit:f41c78627c23717323d6dc2a83fe9193b09b13f7@github.com/Equibit/equibit-core.git source/
RUN ls -ltr /home/equibit/
RUN /root/equibit/source/equibit-core/edc/linux-ubuntu/build.scripts/build.core.sh
RUN ls -ltr /root/equibit/source/equibit-core/src/

RUN mkdir -p /opt/equibit-${EQUIBIT_VERSION}/
RUN mv /root/equibit/source/equibit-core/src/equibitd /opt/equibit-${EQUIBIT_VERSION}/
RUN mv /root/equibit/source/equibit-core/src/bitcoin-cli /opt/equibit-${EQUIBIT_VERSION}/equibit-cli
RUN ls -ltr /opt/equibit-${EQUIBIT_VERSION}/


VOLUME ["/home/equibit/.equibit"]

COPY docker-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8332 8333 18332 18333 18444

CMD ["equibitd"]
