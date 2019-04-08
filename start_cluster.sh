#!/bin/sh
echo "INFO: Setting up the server environment."

. ./.env
sleep 2

if [ -f ./supervisor.log ]
then
	mv ./supervisor.log ./supervisor.log.bk
fi

nohup node .  > supervisor.log &
sleep 2
if [ -f ./supervisor.log ]
then
	chmod 777 ./supervisor.log
fi
exit