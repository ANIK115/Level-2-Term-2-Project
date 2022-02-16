CREATE OR REPLACE TRIGGER DELETE_CUSTOMER_CART 
AFTER INSERT 
ON ORDERS 
FOR EACH ROW 

DECLARE 

BEGIN 


FOR R IN (SELECT * FROM CART WHERE C_ID = :NEW.C_ID)

LOOP

INSERT INTO INCLUDED_IN(ORDER_ID, SVC_ID, ORDER_STATUS) VALUES (:NEW.ORDER_ID, R.S_ID, 'PENDING');

END LOOP;

DELETE FROM CART WHERE CART.C_ID = :NEW.C_ID;

END;