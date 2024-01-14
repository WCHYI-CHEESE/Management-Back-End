create table
    user (
        user_id int primary key AUTO_INCREMENT,
        name varchar(250),
        email varchar(50),
        password varchar(250),
        organisation varchar(250),
        status varchar(20),
        role varchar(20),
        UNIQUE (email)
    );

create table
    project (
        project_id int primary key AUTO_INCREMENT,
        user_id int,
        project_name varchar(250),
        description varchar(250),
        status varchar(250),
        FOREIGN KEY (user_id) references user (user_id)
    );

create table
    api_category (
        api_category_id int primary key AUTO_INCREMENT,
        api_category_name varchar(250)
    );

create table
    api_collection (
        api_collection_id int primary key AUTO_INCREMENT,
        api_category_id int,
        api_collection_name varchar(250),
        description varchar(250),
        object_id varchar(250)
    );

create table
    access_control (
        access_control_id int primary key AUTO_INCREMENT,
        user_id int,
        api_collection_id int,
        status varchar(250),
        FOREIGN KEY (user_id) references user (user_id),
        FOREIGN KEY (api_collection_id) references api_collection (api_collection_id)
    );
