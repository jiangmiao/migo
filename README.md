## PostgreSQL Database Migration

### Installation

    npm install -g migo

### Usage

    $ migo.js -h
    migo v0.1.4 - PostgreSQL Database Migration

    Usage:
      migo.js [OPTION] MIGOFILE [VERSION]

    Options:
      -c, --conf=CONFFILE  configure file
      -h, --help

    Files:
      migo.conf default configure file
      migo.id   migration version

### Migo Configure File

    # Database Conn Info
    # The same as node module 'pg'
    user=dbuser
    host=database.server.com
    database=mydb
    password=secretpassword
    port=3211

### Migo File Format
Example: (examples/test.migo)

    #1

        CREATE TABLE books(id serial PRIMARY KEY);

    --

        DROP TABLE books;

    #2 create table users

        CREATE TABLE users(id serial PRIMARY KEY);

    --

        DROP TABLE users;

Header Format:

    ^#(\d+)(.*)$

    $1 = ID
    $2 = DESCRIPTION

    ID must be in increasement and start from 1
    DECSCRIPTION is optional

Up and Down Spliter:

    ^--

SQL Command:

    Indented text block between headers and spliters

#### Examples

migo.conf and test.migo is in directory examples

Prepare

    $ cd examples
    $ createdb migo_test

migo.conf

    $ cat migo.conf
    database=migo_test

test.migo

    $ cat test.migo
    #1

        CREATE TABLE books(id serial PRIMARY KEY);

    --

        DROP TABLE books;

    #2 create table users

        CREATE TABLE users(id serial PRIMARY KEY);

    --

        DROP TABLE users;

Migrate to lastest version

    $ migo.js test.migo
    FROM: 0
    TO:   Infinity
    1 U ----  ----

        CREATE TABLE books(id serial PRIMARY KEY);

    2 U ----  create table users ----

        CREATE TABLE users(id serial PRIMARY KEY);

    COMMIT

Migrate to 0

    $ migo.js test.migo 0
    FROM: 2
    TO:   0
    2 D ----  create table users ----

        DROP TABLE users;

    Are you sure? (yes/y/no/n) y

    1 D ----  ----

        DROP TABLE books;

    Are you sure? (yes/y/no/n) y

    COMMIT

Migrate to version 1

    $ migo.js test.migo 1
    FROM: 0
    TO:   1
    1 U ----  ----

        CREATE TABLE books(id serial PRIMARY KEY);

    COMMIT

LICENSE

    MIT
