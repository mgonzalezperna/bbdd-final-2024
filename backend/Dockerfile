FROM python:3.11

WORKDIR /usr/src/app

RUN pip install --upgrade pip poetry

COPY ./backend ./backend
COPY ./poetry.lock ./pyproject.toml ./

RUN ["poetry", "config", "virtualenvs.create", "false"]
RUN ["poetry", "install"]