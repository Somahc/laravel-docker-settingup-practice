FROM php:8-fpm-alpine

ENV PHPGROUP=laravel
ENV PHPUSER=laravel

ENV TZ Asia/Tokyo

RUN adduser -g ${PHPGROUP} -s /bin/sh -D ${PHPUSER}

RUN sed -i "s#user = www-data = ${PHPUSER}#user = ${PHPUSER}#g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s#group = www-group = ${PHPGROUP}#group = ${PHPGROUP}#g" /usr/local/etc/php-fpm.d/www.conf

RUN mkdir -p /var/www/html/public

RUN apk add --no-cache tzdata 
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN docker-php-ext-install pdo pdo_mysql

CMD ["php-fpm", "-F", "-y", "/usr/local/etc/php-fpm.conf", "-R"]