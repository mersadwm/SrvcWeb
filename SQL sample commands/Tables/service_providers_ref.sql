create table service_prividers_ref(
sp_id int identity (1,1) primary key,
user_id int,
service_id varchar(255),
CONSTRAINT fk_userid FOREIGN KEY (user_id)
    REFERENCES users(user_id),

CONSTRAINT fk_serviceid FOREIGN KEY (service_id)
    REFERENCES question(question_key),
)


select * from service_prividers_ref