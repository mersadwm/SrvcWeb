create table service_prividers_ref(
sp_id int identity (1,1) primary key,
user_id int,
service_id int ,
more_info Nvarchar(255),

CONSTRAINT fk_userid FOREIGN KEY (user_id)
    REFERENCES users(user_id),

CONSTRAINT fk_serviceid FOREIGN KEY (service_id)
    REFERENCES services(id),
)