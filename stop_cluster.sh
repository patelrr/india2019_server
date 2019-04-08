#!/bin/sh
echo "INFO : Stopping SSE Server"
ps -eaf | grep "node ." | grep -v "grep" | awk '{print $2}' | xargs kill -9 
sleep 2

if [ -f ./supervisor.log ]
then
	mv supervisor.log supervisor.log.bk
fi
exit