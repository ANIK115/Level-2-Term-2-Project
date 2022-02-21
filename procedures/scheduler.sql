BEGIN
  DBMS_SCHEDULER.CREATE_JOB (
   job_name           =>  'DELETE_OFFERS',
   job_type           =>  'STORED_PROCEDURE',
   job_action         =>  'DELETE_OFFER',
   repeat_interval    =>  'FREQ=HOURLY;INTERVAL=1',
	 enabled 						=> 	TRUE,
   comments           =>  'Moderator helper job');
END;