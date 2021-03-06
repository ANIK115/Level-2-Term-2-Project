CREATE 
	OR REPLACE PROCEDURE ASSIGN_ORDER ( PID IN INCLUDED_IN.PROVIDER_ID%TYPE, SID IN INCLUDED_IN.SVC_ID%TYPE, OID IN INCLUDED_IN.ORDER_ID%TYPE ) IS CNT NUMBER;
BEGIN
DBMS_OUTPUT.PUT_LINE(PID);
	SELECT
		COUNT( * ) INTO CNT 
	FROM
		INCLUDED_IN 
	WHERE
		SVC_ID = SID 
		AND ORDER_ID = OID 
		AND ORDER_STATUS = 'PENDING';
	IF
		CNT > 0 THEN
			UPDATE INCLUDED_IN 
			SET ORDER_STATUS = 'ACCEPTED', PROVIDER_ID = PID
		WHERE
			SVC_ID = SID 
			AND ORDER_ID = OID;
		
	END IF;
END;