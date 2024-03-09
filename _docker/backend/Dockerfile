FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        locales \
        jpegoptim optipng pngquant gifsicle \
        curl \
        apt-utils \
        libpq-dev \
        libpng-dev \
        libzip-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libonig-dev \
        libcurl4-openssl-dev \
        zip \
        unzip \
        git \
        freetds-dev \
        freetds-bin && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath curl gd && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd && \
    docker-php-ext-configure pdo_dblib --with-libdir=lib/x86_64-linux-gnu && \
    docker-php-ext-install pdo_dblib && \
    docker-php-source delete && \
    rm -rf /tmp/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --filename=composer \
    --install-dir=/usr/local/bin

WORKDIR /var/www

# Add user for laravel application
RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
