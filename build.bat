@ECHO OFF
ECHO [%DATE:~0,10% %TIME%] build-m.yunbisai.com>%~dp0\build.log
CALL npm run build>>%~dp0\build.log
ECHO 'start del...'>>%~dp0\build.log 
RD /q/s   ..\static\css,..\static\js,..\static\fonts >>%~dp0\build.log
ECHO 'stop del...'>>%~dp0\build.log
ECHO 'start XCOPY ...'>>%~dp0\build.log 
XCOPY /y/s  dist ..\ >>%~dp0\build.log
ECHO 'stop XCOPY ...'>>%~dp0\build.log 
pause