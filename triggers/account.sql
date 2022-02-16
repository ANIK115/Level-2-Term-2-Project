CREATE OR REPLACE TRIGGER ACCOUNT_TRANSACTION 
AFTER INSERT
ON PAYMENT_INFO
FOR EACH ROW

DECLARE 


BEGIN 

INSERT INTO ACCOUNT(DEBIT, CREDIT, CURRENT_AMOUNT, PAYMENT_ID) VALUES(0, :NEW.AMOUNT, :NEW.AMOUNT, :NEW.PAYMENT_ID);

END;