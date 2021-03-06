CREATE OR REPLACE TRIGGER DELETE_CUSTOMER_CART 
AFTER INSERT 
ON ORDERS 
FOR EACH ROW 

DECLARE 

BEGIN 


FOR R IN (SELECT * FROM CART WHERE C_ID = :NEW.C_ID)

LOOP

INSERT INTO INCLUDED_IN(ORDER_ID, SVC_ID, ORDER_STATUS, QUANTITY, COST) VALUES (:NEW.ORDER_ID, R.S_ID, 'PENDING', R.QUANTITY, R.PRICE);

END LOOP;

DELETE FROM CART WHERE CART.C_ID = :NEW.C_ID;

END;


CREATE OR REPLACE TRIGGER UPDATE_CART_PRICE 
AFTER DELETE
ON OFFERS
FOR EACH ROW 

DECLARE 

NEW_COST NUMBER;
SID NUMBER;

BEGIN 

SID := :OLD.SERVICE_ID;
SELECT COST INTO NEW_COST FROM SERVICE WHERE SERVICE_ID = SID;
UPDATE CART SET PRICE = NEW_COST  WHERE S_ID = SID;

END;


CREATE OR REPLACE TRIGGER UPDATE_OFFERED_PRICE_IN_CART 
AFTER INSERT 
ON OFFERS 
FOR EACH ROW 

DECLARE 
NEW_COST NUMBER;


BEGIN 

SELECT COST INTO NEW_COST FROM SERVICE WHERE SERVICE_ID = :NEW.SERVICE_ID; 
UPDATE CART SET PRICE = NEW_COST * (100-:NEW.DISCOUNT)/100 WHERE S_ID = :NEW.SERVICE_ID;

END;